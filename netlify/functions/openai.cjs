// netlify/functions/openai.js
const OpenAI = require('openai').default;

// Konfiguracja OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Bez prefiksu REACT_APP_ lub VITE_
});

// Baza wiedzy HR jako fallback
const HR_KNOWLEDGE = {
    'urlop macierzyński': 'Urlop macierzyński w Polsce wynosi 20 tygodni i przysługuje od 6. tygodnia przed przewidywaną datą porodu.',
    'wypowiedzenie umowy': 'Okres wypowiedzenia zależy od stażu pracy: do 6 miesięcy - 2 tygodnie, od 6 miesięcy do 3 lat - 1 miesiąc, powyżej 3 lat - 3 miesiące.',
    'urlop wypoczynkowy': 'Podstawowy urlop wynosi 20 dni (do 10 lat pracy) lub 26 dni (powyżej 10 lat pracy).',
    'minimalne wynagrodzenie': 'Minimalne wynagrodzenie w 2024 roku wynosi 3 490 zł brutto miesięcznie.',
    'godziny nadliczbowe': 'Limit godzin nadliczbowych to 150 godzin w roku dla jednego pracownika, maksymalnie 4 godziny dziennie.'
};

// Funkcja fallback
const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Sprawdź czy pytanie dotyczy HR
    const hrKeywords = ['urlop', 'umowa', 'pracownik', 'pracodawca', 'wynagrodzenie', 'rekrutacja', 'zwolnienie', 'wypowiedzenie', 'rodo', 'hr', 'praca', 'zespół', 'mobbing', 'ocena', 'bhp', 'bezpieczeństwo'];
    const isHRRelated = hrKeywords.some(keyword => lowerMessage.includes(keyword));

    if (!isHRRelated && !lowerMessage.includes('pomoc') && !lowerMessage.includes('możesz')) {
        return 'Jestem ekspertem HR i odpowiadam tylko na pytania o prawo pracy i zarządzanie zespołem. O co z tego zakresu chciałbyś zapytać?';
    }

    // Sprawdź lokalne odpowiedzi HR
    for (const [keywords, answer] of Object.entries(HR_KNOWLEDGE)) {
        const keywordList = keywords.split(' ');
        if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
            return answer;
        }
    }

    if (lowerMessage.includes('urlop')) {
        return 'W Polsce masz prawo do urlopu: 20 dni (jeśli pracujesz krócej niż 10 lat) lub 26 dni (jeśli dłużej). Urlop macierzyński to 20 tygodni dla mamy.';
    }

    if (lowerMessage.includes('nadgodzin')) {
        return 'Możesz pracować maksymalnie 150 godzin nadliczbowych rocznie i nie więcej niż 4 godziny dziennie. Za nadgodziny dostajesz dodatek: 50% za pierwsze 2h, 100% za kolejne.';
    }

    if (lowerMessage.includes('pomoc') || lowerMessage.includes('możesz')) {
        return 'Jestem AI Asystentem HR. Pomagam z pytaniami o: urlopy, umowy o pracę, wypowiedzenia, wynagrodzenia, rekrutację, RODO i zarządzanie zespołem. Zadaj konkretne pytanie!';
    }

    return 'Jestem ekspertem HR w Polsce. Odpowiadam na pytania o prawo pracy, rekrutację i zarządzanie zespołem. O co konkretnie chciałbyś zapytać?';
};

exports.handler = async (event, context) => {
    // Debug API key (usuń to przed wdrożeniem!)
    console.log('🔑 API Key status:', {
        exists: !!process.env.OPENAI_API_KEY,
        length: process.env.OPENAI_API_KEY?.length,
        starts: process.env.OPENAI_API_KEY?.substring(0, 10),
        type: typeof process.env.OPENAI_API_KEY
    });
    // Obsługa CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Obsługa preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    // Sprawdź metodę HTTP
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Metoda niepozwolona' }),
        };
    }

    try {
        // Parsuj dane z requestu
        const { message, conversationHistory = [] } = JSON.parse(event.body || '{}');

        if (!message || typeof message !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Brak wiadomości w żądaniu' }),
            };
        }

        console.log('📨 Otrzymano wiadomość:', message.substring(0, 100));

        // Sprawdź czy mamy klucz OpenAI API
        if (!process.env.OPENAI_API_KEY) {
            console.log('⚠️ Brak klucza OpenAI - używam fallback');
            const response = getFallbackResponse(message);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    response,
                    source: 'fallback',
                    message: 'Używam lokalnej bazy wiedzy'
                }),
            };
        }

        // Przygotuj wiadomości dla OpenAI
        const messages = [
            {
                role: "system",
                content: `Jesteś ekspertem HR w Polsce. Odpowiadasz na pytania o prawo pracy, rekrutację i zarządzanie zespołem.

ZASADY:
- Używaj polskich przepisów (Kodeks Pracy, RODO)
- Odpowiadaj konkretnie i zwięźle
- Używaj prostego języka
- Jeśli nie wiesz, powiedz to wprost

ZAKRES: urlopy, umowy, rekrutacja, wynagrodzenia, RODO, zarządzanie zespołem.`
            }
        ];

        // Dodaj poprzednie wiadomości (ostatnie 4)
        const recentHistory = conversationHistory.slice(-4);
        recentHistory.forEach(msg => {
            messages.push({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        });

        // Dodaj aktualne pytanie
        messages.push({
            role: "user",
            content: message
        });

        // Wywołanie OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            max_tokens: 500,
            temperature: 0.2,
        });

        const response = completion.choices[0]?.message?.content;

        if (!response) {
            throw new Error('Brak odpowiedzi z OpenAI API');
        }

        console.log('✅ Odpowiedź z OpenAI wygenerowana');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: response.trim(),
                source: 'openai',
                model: 'gpt-4o-mini'
            }),
        };

    } catch (error) {
        console.error('❌ Błąd funkcji OpenAI:', error);

        // W przypadku błędu API, użyj fallback
        if (error.code === 'insufficient_quota' || error.code === 'invalid_api_key') {
            console.log('🔄 Przełączanie na fallback z powodu błędu API');

            try {
                const { message } = JSON.parse(event.body || '{}');
                const response = getFallbackResponse(message);

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        response,
                        source: 'fallback',
                        message: 'Błąd API - używam lokalnej bazy wiedzy'
                    }),
                };
            } catch (fallbackError) {
                console.error('❌ Błąd fallback:', fallbackError);
            }
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Błąd serwera',
                message: 'Spróbuj ponownie za chwilę'
            }),
        };
    }
};
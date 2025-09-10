// utils/aiService.js - Wersja z Netlify Functions
console.log('🚀 Używam Netlify Functions dla OpenAI');

// Baza wiedzy HR jako fallback
const HR_KNOWLEDGE = {
    'urlop macierzyński': 'Urlop macierzyński w Polsce wynosi 20 tygodni i przysługuje od 6. tygodnia przed przewidywaną datą porodu.',
    'wypowiedzenie umowy': 'Okres wypowiedzenia zależy od stażu pracy: do 6 miesięcy - 2 tygodnie, od 6 miesięcy do 3 lat - 1 miesiąc, powyżej 3 lat - 3 miesiące.',
    'urlop wypoczynkowy': 'Podstawowy urlop wynosi 20 dni (do 10 lat pracy) lub 26 dni (powyżej 10 lat pracy).',
    'minimalne wynagrodzenie': 'Minimalne wynagrodzenie w 2024 roku wynosi 3 490 zł brutto miesięcznie.',
    'godziny nadliczbowe': 'Limit godzin nadliczbowych to 150 godzin w roku dla jednego pracownika, maksymalnie 4 godziny dziennie.'
};

// Główna funkcja AI - używa Netlify Functions
export const getAIResponse = async (message, conversationHistory = []) => {
    try {
        console.log('📨 Wysyłam do Netlify Function:', message.substring(0, 50));

        // Wywołanie Netlify Function
        const response = await fetch('/.netlify/functions/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message.trim(),
                conversationHistory: conversationHistory
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        console.log('✅ Odpowiedź otrzymana z:', data.source || 'server');

        return data.response;

    } catch (error) {
        console.error('❌ Błąd wywołania Netlify Function:', error);

        // Fallback do lokalnej bazy wiedzy
        console.log('🔄 Używam lokalnej bazy wiedzy jako fallback');
        return getFallbackResponse(message);
    }
};

// Funkcja fallback przy błędach
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

// Funkcja do testowania połączenia z funkcją Netlify
export const testOpenAIConnection = async () => {
    try {
        const response = await fetch('/.netlify/functions/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Test połączenia - odpowiedz krótko OK',
                conversationHistory: []
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            success: true,
            message: 'Połączenie z Netlify Function działa poprawnie',
            source: data.source || 'netlify-function'
        };

    } catch (error) {
        return {
            success: false,
            error: `Błąd połączenia: ${error.message}`
        };
    }
};

// Funkcje do obsługi PDF (zachowane dla kompatybilności)
export const loadPDFKnowledge = async () => {
    return {
        success: true,
        message: 'Załadowano wbudowaną bazę wiedzy HR',
        source: 'builtin'
    };
};

export const getPDFStatus = () => {
    return {
        isLoaded: true,
        hasContent: true,
        contentLength: Object.keys(HR_KNOWLEDGE).length
    };
};
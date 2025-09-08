// utils/aiService.js
import OpenAI from 'openai';

// Sprawdź klucz API
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

console.log('🔑 API Key status:', {
    vite_env: !!apiKey,
    length: apiKey?.length,
    starts: apiKey?.substring(0, 7)
});

// Konfiguracja OpenAI
const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key',
    dangerouslyAllowBrowser: true // Tylko dla dev - w produkcji użyj proxy
});

// Stan przechowujący załadowaną wiedzę z PDF
let pdfKnowledge = '';
let isPdfLoaded = false;

// Baza wiedzy HR
const HR_KNOWLEDGE = {
    'urlop macierzyński': 'Urlop macierzyński w Polsce wynosi 20 tygodni i przysługuje od 6. tygodnia przed przewidywaną datą porodu.',
    'wypowiedzenie umowy': 'Okres wypowiedzenia zależy od stażu pracy: do 6 miesięcy - 2 tygodnie, od 6 miesięcy do 3 lat - 1 miesiąc, powyżej 3 lat - 3 miesiące.',
    'urlop wypoczynkowy': 'Podstawowy urlop wynosi 20 dni (do 10 lat pracy) lub 26 dni (powyżej 10 lat pracy).',
    'minimalne wynagrodzenie': 'Minimalne wynagrodzenie w 2024 roku wynosi 3 490 zł brutto miesięcznie.',
    'godziny nadliczbowe': 'Limit godzin nadliczbowych to 150 godzin w roku dla jednego pracownika, maksymalnie 4 godziny dziennie.'
};

// Główna funkcja AI - UPROSZCZONA
export const getAIResponse = async (message, conversationHistory = []) => {
    try {
        // Sprawdź czy mamy klucz API
        if (!apiKey || apiKey === 'dummy-key') {
            console.warn('Brak klucza OpenAI API - używam lokalnej bazy wiedzy');
            return getFallbackResponse(message);
        }

        // Przygotuj wiadomości dla OpenAI - PROSTY SYSTEM PROMPT
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
            temperature: 0.2, // Niska temperatura dla spójności
        });

        const response = completion.choices[0]?.message?.content;

        if (!response) {
            throw new Error('Brak odpowiedzi z OpenAI API');
        }

        return response.trim();

    } catch (error) {
        console.error('Błąd OpenAI API:', error);
        return getFallbackResponse(message);
    }
};

// Funkcja fallback przy błędach API
const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Sprawdź czy pytanie dotyczy HR - lista słów kluczowych
    const hrKeywords = ['urlop', 'umowa', 'pracownik', 'pracodawca', 'wynagrodzenie', 'rekrutacja', 'zwolnienie', 'wypowiedzenie', 'rodo', 'hr', 'praca', 'zespół', 'mobbing', 'ocena', 'bhp', 'bezpieczeństwo'];
    const isHRRelated = hrKeywords.some(keyword => lowerMessage.includes(keyword));

    // Jeśli nie dotyczy HR - przekieruj
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

    // Sprawdź podstawowe słowa kluczowe
    if (lowerMessage.includes('urlop')) {
        return 'W Polsce masz prawo do urlopu: 20 dni (jeśli pracujesz krócej niż 10 lat) lub 26 dni (jeśli dłużej). Urlop macierzyński to 20 tygodni dla mamy.';
    }

    if (lowerMessage.includes('nadgodzin')) {
        return 'Możesz pracować maksymalnie 150 godzin nadliczbowych rocznie i nie więcej niż 4 godziny dziennie. Za nadgodziny dostajesz dodatek: 50% za pierwsze 2h, 100% za kolejne.';
    }

    if (lowerMessage.includes('pomoc') || lowerMessage.includes('możesz')) {
        return 'Jestem AI Asystentem HR. Pomagam z pytaniami o: urlopy, umowy o pracę, wypowiedzenia, wynagrodzenia, rekrutację, RODO i zarządzanie zespołem. Zadaj konkretne pytanie!';
    }

    // Ogólna odpowiedź HR
    return 'Jestem ekspertem HR w Polsce. Odpowiadam na pytania o prawo pracy, rekrutację i zarządzanie zespołem. O co konkretnie chciałbyś zapytać?';
};

// Funkcja do ładowania wiedzy z PDF
export const loadPDFKnowledge = async () => {
    try {
        if (isPdfLoaded) {
            return { success: true, message: 'Wiedza już załadowana' };
        }

        // Używamy wbudowanej wiedzy jako fallback
        pdfKnowledge = Object.entries(HR_KNOWLEDGE)
            .map(([topic, content]) => `${topic.toUpperCase()}:\n${content}\n`)
            .join('\n');

        isPdfLoaded = true;

        return {
            success: true,
            message: 'Załadowano wbudowaną bazę wiedzy HR',
            source: 'builtin'
        };

    } catch (error) {
        console.error('Błąd ładowania wiedzy:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Funkcja do testowania połączenia z OpenAI
export const testOpenAIConnection = async () => {
    try {
        if (!apiKey || apiKey === 'dummy-key') {
            return {
                success: false,
                error: 'Brak klucza API w zmiennych środowiskowych'
            };
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Test połączenia - odpowiedz krótko 'OK'" }],
            max_tokens: 10
        });

        return {
            success: true,
            message: 'Połączenie z OpenAI działa poprawnie',
            model: 'gpt-4o-mini'
        };
    } catch (error) {
        return {
            success: false,
            error: `Błąd połączenia: ${error.message}`
        };
    }
};

// Status ładowania PDF
export const getPDFStatus = () => {
    return {
        isLoaded: isPdfLoaded,
        hasContent: !!pdfKnowledge,
        contentLength: pdfKnowledge.length
    };
};
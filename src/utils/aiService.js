// utils/aiService.js - NOWA WERSJA z Railway Backend
console.log('🚀 Używam Railway Backend API');

// URL do Railway backendu
const BACKEND_URL = 'https://ai-hr-backend-production-3c1d.up.railway.app';

// Baza wiedzy HR jako fallback (zachowana na wszelki wypadek)
const HR_KNOWLEDGE = {
    'urlop macierzyński': 'Urlop macierzyński w Polsce wynosi 20 tygodni i przysługuje od 6. tygodnia przed przewidywaną datą porodu.',
    'wypowiedzenie umowy': 'Okres wypowiedzenia zależy od stażu pracy: do 6 miesięcy - 2 tygodnie, od 6 miesięcy do 3 lat - 1 miesiąc, powyżej 3 lat - 3 miesiące.',
    'urlop wypoczynkowy': 'Podstawowy urlop wynosi 20 dni (do 10 lat pracy) lub 26 dni (powyżej 10 lat pracy).',
    'minimalne wynagrodzenie': 'Minimalne wynagrodzenie w 2024 roku wynosi 3 490 zł brutto miesięcznie.',
    'godziny nadliczbowe': 'Limit godzin nadliczbowych to 150 godzin w roku dla jednego pracownika, maksymalnie 4 godziny dziennie.'
};

// Główna funkcja AI - NOWA: używa Railway Backend
export const getAIResponse = async (message, conversationHistory = []) => {
    try {
        console.log('📨 Wysyłam do Railway Backend:', message.substring(0, 50));

        // Generuj unikatowy sessionId jeśli nie ma
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Wywołanie Railway Backend API
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message.trim(),
                sessionId: sessionId
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        console.log('✅ Odpowiedź otrzymana z Railway:', data.source || 'backend');

        return data.response;

    } catch (error) {
        console.error('❌ Błąd wywołania Railway Backend:', error);

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

// Funkcja do testowania połączenia z Railway Backend
export const testBackendConnection = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            success: true,
            message: 'Połączenie z Railway Backend działa poprawnie',
            backend: 'railway',
            version: data.version || 'unknown'
        };

    } catch (error) {
        return {
            success: false,
            error: `Błąd połączenia: ${error.message}`
        };
    }
};

// Zachowaj kompatybilność z istniejącymi funkcjami
export const loadPDFKnowledge = async () => {
    return {
        success: true,
        message: 'Backend używa pełnej bazy wiedzy HR z Railway',
        source: 'railway-backend'
    };
};

export const getPDFStatus = () => {
    return {
        isLoaded: true,
        hasContent: true,
        contentLength: Object.keys(HR_KNOWLEDGE).length,
        backend: 'railway'
    };
};
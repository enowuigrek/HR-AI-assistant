// utils/aiService.js - Railway Backend Integration
console.log('🚀 Using Railway Backend for AI HR Assistant');

// Railway Backend Configuration
const BACKEND_CONFIG = {
    BASE_URL: process.env.NODE_ENV === 'production'
        ? 'https://ai-hr-backend-production-3c1d.up.railway.app'
        : 'https://ai-hr-backend-production-3c1d.up.railway.app', // Same for dev testing
    ENDPOINTS: {
        CHAT: '/api/chat',
        SESSIONS: '/api/sessions',
        CREATE_SESSION: '/api/chat/session',
        SESSION_INFO: '/api/chat/session',
        HISTORY: '/api/chat/history',
        UPDATE_SESSION: '/api/chat/session',
        DELETE_SESSION: '/api/chat/session'
    },
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 2
};

// Enhanced HTTP client with retry logic
async function makeAPIRequest(endpoint, options = {}) {
    const url = `${BACKEND_CONFIG.BASE_URL}${endpoint}`;

    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        timeout: BACKEND_CONFIG.TIMEOUT,
        ...options
    };

    // Add request ID for tracking
    defaultOptions.headers['X-Client-Request-ID'] = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log(`📡 API Request: ${defaultOptions.method} ${url}`);

    for (let attempt = 1; attempt <= BACKEND_CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), defaultOptions.timeout);

            const response = await fetch(url, {
                ...defaultOptions,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Log response details
            console.log(`📊 Response: ${response.status} ${response.statusText} (attempt ${attempt})`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log(`✅ API Success: ${endpoint}`);
            return data;

        } catch (error) {
            console.error(`❌ API Error (attempt ${attempt}):`, error.message);

            if (attempt === BACKEND_CONFIG.RETRY_ATTEMPTS) {
                throw error;
            }

            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

// Main AI Chat Function
export const getAIResponse = async (message, conversationHistory = [], sessionId = null) => {
    try {
        console.log('💬 Sending message to Railway backend:', message.substring(0, 50));

        const response = await makeAPIRequest(BACKEND_CONFIG.ENDPOINTS.CHAT, {
            method: 'POST',
            body: JSON.stringify({
                message: message.trim(),
                sessionId: sessionId,
                conversationHistory: conversationHistory // For compatibility, though backend handles this
            })
        });

        if (!response.success) {
            throw new Error(response.error || 'Unknown error from backend');
        }

        console.log('✅ AI Response received from Railway backend');

        return {
            response: response.response,
            sessionId: response.sessionId,
            conversationId: response.conversationId,
            source: 'railway-backend',
            responseTime: response.responseTime,
            timestamp: response.timestamp
        };

    } catch (error) {
        console.error('❌ AI Service Error:', error);

        // Enhanced fallback with better error messaging
        return {
            response: getFallbackResponse(message, error),
            sessionId: sessionId || `fallback_${Date.now()}`,
            source: 'fallback',
            error: true,
            errorMessage: error.message
        };
    }
};

// Session Management Functions
export const createSession = async (sessionName = null) => {
    try {
        console.log('🆕 Creating new session:', sessionName);

        const response = await makeAPIRequest(BACKEND_CONFIG.ENDPOINTS.CREATE_SESSION, {
            method: 'POST',
            body: JSON.stringify({
                sessionName: sessionName
            })
        });

        if (!response.success) {
            throw new Error(response.error || 'Failed to create session');
        }

        console.log('✅ Session created:', response.sessionId);
        return response;

    } catch (error) {
        console.error('❌ Session creation error:', error);

        // Return fallback session
        return {
            success: false,
            sessionId: `fallback_${Date.now()}`,
            sessionName: sessionName || 'Lokalna sesja',
            error: error.message
        };
    }
};

export const getSessions = async (limit = 20, offset = 0) => {
    try {
        console.log('📋 Fetching sessions...');

        const response = await makeAPIRequest(
            `${BACKEND_CONFIG.ENDPOINTS.SESSIONS}?limit=${limit}&offset=${offset}`
        );

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch sessions');
        }

        console.log(`✅ Sessions loaded: ${response.sessions.length} sessions`);
        return response;

    } catch (error) {
        console.error('❌ Sessions fetch error:', error);
        return {
            success: false,
            sessions: [],
            total: 0,
            error: error.message
        };
    }
};

export const getSessionHistory = async (sessionId, limit = 20, offset = 0) => {
    try {
        console.log('📚 Fetching session history:', sessionId);

        const response = await makeAPIRequest(
            `${BACKEND_CONFIG.ENDPOINTS.HISTORY}/${sessionId}?limit=${limit}&offset=${offset}`
        );

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch history');
        }

        console.log(`✅ History loaded: ${response.messages.length} messages`);
        return response;

    } catch (error) {
        console.error('❌ History fetch error:', error);
        return {
            success: false,
            messages: [],
            total: 0,
            error: error.message
        };
    }
};

export const updateSessionName = async (sessionId, sessionName) => {
    try {
        console.log('✏️ Updating session name:', sessionId, sessionName);

        const response = await makeAPIRequest(
            `${BACKEND_CONFIG.ENDPOINTS.UPDATE_SESSION}/${sessionId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    sessionName: sessionName
                })
            }
        );

        if (!response.success) {
            throw new Error(response.error || 'Failed to update session');
        }

        console.log('✅ Session name updated');
        return response;

    } catch (error) {
        console.error('❌ Session update error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const deleteSession = async (sessionId) => {
    try {
        console.log('🗑️ Deleting session:', sessionId);

        const response = await makeAPIRequest(
            `${BACKEND_CONFIG.ENDPOINTS.DELETE_SESSION}/${sessionId}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.success) {
            throw new Error(response.error || 'Failed to delete session');
        }

        console.log('✅ Session deleted');
        return response;

    } catch (error) {
        console.error('❌ Session deletion error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Enhanced fallback responses with error context
function getFallbackResponse(message, error = null) {
    const lowerMessage = message.toLowerCase();

    // Error-specific responses
    if (error && error.message.includes('network')) {
        return 'Przepraszam, mam problem z połączeniem internetowym. Spróbuj ponownie za chwilę. W międzyczasie mogę odpowiedzieć z lokalnej bazy wiedzy HR.';
    }

    if (error && error.message.includes('429')) {
        return 'Chwilowo mam za dużo zapytań. Poczekaj chwilę i spróbuj ponownie. Limit zapytań to 30 na minutę.';
    }

    // HR Knowledge Base Responses
    const hrKeywords = ['urlop', 'umowa', 'pracownik', 'pracodawca', 'wynagrodzenie', 'rekrutacja', 'zwolnienie', 'wypowiedzenie', 'rodo', 'hr', 'praca', 'zespół', 'mobbing', 'ocena', 'bhp', 'bezpieczeństwo'];
    const isHRRelated = hrKeywords.some(keyword => lowerMessage.includes(keyword));

    if (!isHRRelated && !lowerMessage.includes('pomoc') && !lowerMessage.includes('możesz')) {
        return 'Jestem ekspertem HR i odpowiadam tylko na pytania o prawo pracy i zarządzanie zespołem. O co z tego zakresu chciałbyś zapytać?';
    }

    // Specific HR responses
    if (lowerMessage.includes('urlop')) {
        return 'W Polsce masz prawo do urlopu: 20 dni (jeśli pracujesz krócej niż 10 lat) lub 26 dni (jeśli dłużej). Urlop macierzyński to 20 tygodni dla mamy. W skomplikowanych sprawach skonsultuj się z prawnikiem.';
    }

    if (lowerMessage.includes('wypowiedzenie') || lowerMessage.includes('zwolnienie')) {
        return 'Okresy wypowiedzenia zależą od stażu pracy: do 6 miesięcy - 2 tygodnie, od 6 miesięcy do 3 lat - 1 miesiąc, powyżej 3 lat - 3 miesiące. W skomplikowanych sprawach skonsultuj się z prawnikiem.';
    }

    if (lowerMessage.includes('nadgodzin')) {
        return 'Możesz pracować maksymalnie 150 godzin nadliczbowych rocznie i nie więcej niż 4 godziny dziennie. Za nadgodziny dostajesz dodatek: 50% za pierwsze 2h, 100% za kolejne.';
    }

    if (lowerMessage.includes('minimalne wynagrodzenie') || lowerMessage.includes('płaca minimalna')) {
        return 'Minimalne wynagrodzenie w 2024 roku wynosi 3 490 zł brutto miesięcznie. Kwota jest waloryzowana corocznie.';
    }

    if (lowerMessage.includes('rodo') || lowerMessage.includes('dane osobowe')) {
        return 'RODO w HR: Możesz przechowywać CV kandydatów maksymalnie 12 miesięcy po rekrutacji (chyba że kandydat wyrazi zgodę na dłuższe przechowywanie w bazie talentów). Dane pracowników przetwarzasz na podstawie umowy o pracę.';
    }

    if (lowerMessage.includes('mobbing') || lowerMessage.includes('molest')) {
        return 'Mobbing to poważna sprawa. Powinieneś: 1) Zgłosić incydent do HR lub przełożonego, 2) Udokumentować zdarzenia (data, miejsce, świadkowie), 3) Rozważyć zgłoszenie do PIP jeśli firma nie zareaguje odpowiednio. Masz prawo do odszkodowania.';
    }

    if (lowerMessage.includes('rekrutacja') || lowerMessage.includes('rozmowa kwalifikacyjna')) {
        return 'W rekrutacji zabronione są pytania o: ciążę, plany macierzyńskie, stan cywilny, życie rodzinne, orientację seksualną, poglądy polityczne/religijne. Pytać można o doświadczenie, umiejętności, dostępność i warunki pracy.';
    }

    if (lowerMessage.includes('pomoc') || lowerMessage.includes('możesz')) {
        return 'Jestem AI Asystentem HR w Polsce. Pomagam z pytaniami o: urlopy, umowy o pracę, wypowiedzenia, wynagrodzenia, rekrutację, RODO, zarządzanie zespołem, mobbing i BHP. Zadaj konkretne pytanie!';
    }

    return 'Jestem ekspertem HR w Polsce. Odpowiadam na pytania o prawo pracy, rekrutację i zarządzanie zespołem. O co konkretnie chciałbyś zapytać? (Jeśli widzisz ten komunikat, backend może być chwilowo niedostępny - podstawowa baza wiedzy działa lokalnie)';
}

// Health check function for monitoring
export const checkBackendHealth = async () => {
    try {
        const response = await makeAPIRequest('/health');
        return {
            healthy: true,
            status: response.status,
            timestamp: response.timestamp
        };
    } catch (error) {
        return {
            healthy: false,
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
};

// Connection test function
export const testConnection = async () => {
    try {
        console.log('🔍 Testing Railway backend connection...');

        const response = await makeAPIRequest('/');

        return {
            success: true,
            message: 'Railway backend connection successful',
            version: response.version,
            features: response.features,
            performance: response.performance
        };

    } catch (error) {
        console.error('❌ Connection test failed:', error);

        return {
            success: false,
            error: `Connection failed: ${error.message}`,
            fallbackMode: true
        };
    }
};

// Legacy functions for compatibility (now use Railway backend)
export const loadPDFKnowledge = async () => {
    console.log('📚 PDF Knowledge loading redirected to Railway backend');
    return {
        success: true,
        message: 'Baza wiedzy HR załadowana na Railway backend',
        source: 'railway-backend'
    };
};

export const getPDFStatus = () => {
    return {
        isLoaded: true,
        hasContent: true,
        contentLength: 'Railway Backend HR Knowledge Base',
        source: 'railway-backend'
    };
};

// Export configuration for debugging
export const getBackendConfig = () => {
    return {
        ...BACKEND_CONFIG,
        currentMode: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    };
};
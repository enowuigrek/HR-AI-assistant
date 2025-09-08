// utils/aiService.js

// Tymczasowa baza wiedzy HR (później zastąpi PDF)
const HR_KNOWLEDGE = {
    'urlop macierzyński': 'Urlop macierzyński w Polsce wynosi 20 tygodni i przysługuje od 6. tygodnia przed przewidywaną datą porodu. Można go wykorzystać do 21. tygodnia życia dziecka. Po urlopie można korzystać z urlopu rodzicielskiego (32 tygodnie).',

    'wypowiedzenie umowy': 'Okres wypowiedzenia zależy od stażu pracy: do 6 miesięcy - 2 tygodnie, od 6 miesięcy do 3 lat - 1 miesiąc, powyżej 3 lat - 3 miesiące. Wypowiedzenie musi być złożone na piśmie z podaniem przyczyny.',

    'opis stanowiska': 'Dobry opis stanowiska zawiera: tytuł stanowiska, cel stanowiska, główne obowiązki (5-7 punktów), wymagania (wykształcenie, doświadczenie, umiejętności), benefity, informacje o firmie, proces rekrutacji.',

    'mobbing': 'Mobbing to uporczywe nękanie pracownika przez pracodawcę lub współpracowników. Objawy: izolacja, krytyka, przeciążenie pracą, poniżanie. Pracownik może zgłosić to do działu HR, inspektora pracy lub sądu.',

    'rodo rekrutacja': 'Zgodnie z RODO pracodawca może przetwarzać dane osobowe kandydatów tylko w celu prowadzenia rekrutacji. CV można przechowywać maksymalnie 12 miesięcy. Kandydat ma prawo do wycofania zgody.',

    'ocena pracowników': 'Ocena okresowa powinna być przeprowadzana regularnie (co rok lub co 2 lata). Obejmuje: ocenę realizacji celów, kompetencji, rozwoju, planowanie przyszłych zadań i szkoleń.',

    'czas pracy': 'Standardowy czas pracy to 8 godzin dziennie i 40 godzin tygodniowo. Praca w nadgodzinach wymaga zgody pracownika i dodatku: 50% za pierwsze 2 godziny, 100% za kolejne.',

    'urlop wypoczynkowy': 'Podstawowy urlop wynosi 20 dni (do 10 lat pracy) lub 26 dni (powyżej 10 lat pracy). Urlop należy wykorzystać do końca września roku następnego.',

    'rekrutacja': 'Proces rekrutacji powinien być sprawiedliwy i transparentny. Zabronione są pytania o ciążę, plany rodzinne, orientację seksualną. Kandydat ma prawo do informacji o procesie i feedback.',

    'umowa o pracę': 'Umowa o pracę musi zawierać: dane stron, rodzaj umowy, miejsce pracy, opis obowiązków, wynagrodzenie, czas pracy. Musi być sporządzona na piśmie przed dopuszczeniem do pracy.'
};

// Funkcja znajdująca odpowiedni fragment wiedzy
const findRelevantKnowledge = (question) => {
    const lowerQuestion = question.toLowerCase();

    // Szukaj dopasowań kluczowych słów
    for (const [keywords, answer] of Object.entries(HR_KNOWLEDGE)) {
        const keywordList = keywords.split(' ');
        if (keywordList.some(keyword => lowerQuestion.includes(keyword))) {
            return answer;
        }
    }

    return null;
};

// Główna funkcja AI (gotowa na podpięcie prawdziwego AI)
export const getAIResponse = async (message, conversationHistory = []) => {
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Znajdź odpowiednią wiedzę z bazy/PDF
    const relevantKnowledge = findRelevantKnowledge(message);

    if (relevantKnowledge) {
        return relevantKnowledge;
    }

    // Fallback - ogólne odpowiedzi HR
    const generalResponses = [
        'To ciekawe pytanie dotyczące HR. Czy możesz sprecyzować, o jaki konkretny aspekt zarządzania zespołem Ci chodzi?',
        'W kwestiach HR zawsze warto skonsultować się z aktualnymi przepisami Kodeksu Pracy lub działem prawnym firmy.',
        'HR to szeroki temat. Możesz zapytać o: urlopy, rekrutację, oceny pracowników, czas pracy, wypowiedzenia.',
        'Przepisy prawa pracy regularnie się zmieniają. Upewnij się, że korzystasz z najnowszych wytycznych Ministerstwa Rodziny i Polityki Społecznej.'
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
};

// Funkcja do ładowania wiedzy z PDF (do implementacji)
export const loadPDFKnowledge = async (pdfFile) => {
    // TODO: Implementacja PDF parsing
    // 1. pdf-parse lub pdf2pic
    // 2. Podział na chunki
    // 3. Indexowanie do przeszukiwania

    console.log('PDF knowledge loading - do implementacji', pdfFile);
    return true;
};

// Funkcja do konfiguracji prawdziwego AI API
export const configureAI = async (apiKey, provider = 'openai') => {
    // TODO: Konfiguracja OpenAI/Claude/inne
    // Zastąpi mockowane odpowiedzi prawdziwym AI

    console.log('AI configuration - do implementacji', { provider, hasKey: !!apiKey });
    return true;
};

// Przykład integracji z OpenAI (odkomentować gdy będzie potrzebne)
/*
const callOpenAI = async (message, context) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Jesteś ekspertem HR w Polsce. Odpowiadaj na pytania o zarządzanie zespołem, prawo pracy, rekrutację, zawsze bazując na polskich przepisach. Kontekst z dokumentów: ${context}`
        },
        {role: "user", content: message}
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
};
*/
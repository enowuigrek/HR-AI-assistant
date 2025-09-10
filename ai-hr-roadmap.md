# AI HR Assistant - Plan Migracji na Railway Backend

**Projekt:** Migracja z Netlify Functions na profesjonalny backend  
**Cel:** Bezpieczne przechowywanie klucza OpenAI + przygotowanie pod komercjalizację  
**Czas:** ~6-8 godzin (rozłożone na kilka dni)  
**Data rozpoczęcia:** 09 Stycznia 2025

---

## 🎯 ZAŁOŻENIA PROJEKTU

### Obecna sytuacja
- ✅ Frontend: React + Vite + Tailwind na Netlify
- ✅ AI: OpenAI GPT-4o-mini przez Netlify Functions
- ❌ Problem: Klucz API widoczny w Netlify env vars

### Docelowa architektura
- 🎯 Frontend: React (Netlify) - **bez zmian**
- 🎯 Backend: Express.js + PostgreSQL (Railway)
- 🎯 AI: OpenAI przez bezpieczny backend
- 🎯 Baza: PostgreSQL dla sesji i analytics

---

## 📋 PLAN REALIZACJI

### **FAZA 1: BACKEND FOUNDATION** ⏱️ 2-3h

#### Krok 1.1: Przygotowanie środowiska (30min)
- [ ] Założenie konta Railway.app
- [ ] Połączenie Railway z GitHubem
- [ ] Utworzenie nowego repo: `ai-hr-backend`
- [ ] Test deploymentu "Hello World"

#### Krok 1.2: Setup Express.js (45min)
- [ ] Inicjalizacja projektu Node.js
- [ ] Instalacja dependencies (express, cors, dotenv, etc.)
- [ ] Podstawowa struktura folderów
- [ ] Pierwszy endpoint `/health`
- [ ] Deploy na Railway

#### Krok 1.3: PostgreSQL Setup (45min)
- [ ] Dodanie PostgreSQL do Railway
- [ ] Konfiguracja connection stringa
- [ ] Test połączenia z bazą
- [ ] Utworzenie pierwszej tabeli (conversations)

#### Krok 1.4: Środowisko i bezpieczeństwo (30min)
- [ ] Konfiguracja zmiennych środowiskowych
- [ ] Dodanie klucza OpenAI do Railway (bezpiecznie)
- [ ] Setup CORS dla domeny frontendu
- [ ] Basic error handling

---

### **FAZA 2: API ENDPOINTS** ⏱️ 1-2h

#### Krok 2.1: Chat endpoint (45min)
- [ ] POST `/api/chat/message` - główny endpoint
- [ ] Integracja z OpenAI
- [ ] Obsługa historii konwersacji
- [ ] Response formatting

#### Krok 2.2: Session management (30min)
- [ ] POST `/api/chat/session` - nowa sesja
- [ ] GET `/api/chat/history/:sessionId` - historia
- [ ] DELETE `/api/chat/session/:id` - czyszczenie

#### Krok 2.3: Testing & validation (15min)
- [ ] Test wszystkich endpointów przez Postman/Thunder
- [ ] Walidacja input/output
- [ ] Error scenarios

---

### **FAZA 3: SECURITY & PERFORMANCE** ⏱️ 1h

#### Krok 3.1: Security middleware (30min)
- [ ] Rate limiting (express-rate-limit)
- [ ] Input sanitization
- [ ] Request validation
- [ ] Security headers

#### Krok 3.2: Logging & monitoring (30min)
- [ ] Request logging
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Railway logs setup

---

### **FAZA 4: FRONTEND MIGRATION** ⏱️ 30min

#### Krok 4.1: Update aiService.js (15min)
- [ ] Zmiana URL z Netlify Functions na Railway
- [ ] Dodanie session management
- [ ] Update error handling

#### Krok 4.2: Testing & deployment (15min)
- [ ] Test na localhost z nowym backendem
- [ ] Deploy frontendu na Netlify
- [ ] End-to-end testing

---

### **FAZA 5: PRODUCTION FEATURES** ⏱️ 1-2h

#### Krok 5.1: Database models (30min)
- [ ] Tabela conversations
- [ ] Tabela sessions
- [ ] Tabela analytics (opcjonalne)

#### Krok 5.2: Analytics podstawowe (30min)
- [ ] Licznik wiadomości
- [ ] Popularne pytania
- [ ] Response time tracking

#### Krok 5.3: Multi-tenant preparation (60min)
- [ ] Tabela clients/tenants
- [ ] API key per client
- [ ] Custom branding support

---

## 🛠️ TECH STACK

### Backend Stack
```
Runtime: Node.js 18+
Framework: Express.js
Database: PostgreSQL
Hosting: Railway.app
Environment: Production-ready
```

### Dependencies
```json
{
  "express": "^4.18.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0",
  "pg": "^8.8.0",
  "openai": "^4.0.0",
  "express-rate-limit": "^6.0.0",
  "helmet": "^6.0.0",
  "morgan": "^1.10.0"
}
```

---

## 📁 STRUKTURA PROJEKTU

### ai-hr-backend/
```
├── server.js                 # Główny plik serwera
├── package.json              # Dependencies
├── .env.example              # Przykład zmiennych
├── routes/
│   ├── chat.js              # Chat endpoints
│   └── health.js            # Health check
├── middleware/
│   ├── security.js          # CORS, rate limiting
│   ├── validation.js        # Input validation
│   └── logging.js           # Request logging
├── models/
│   ├── Conversation.js      # Model konwersacji
│   └── Session.js           # Model sesji
├── utils/
│   ├── database.js          # DB connection
│   ├── openai.js            # OpenAI integration
│   └── responses.js         # Response helpers
└── sql/
    └── init.sql             # Database schema
```

---

## 🔒 BEZPIECZEŃSTWO

### Railway Environment Variables
```
OPENAI_API_KEY=sk-xxx
DATABASE_URL=postgresql://xxx
NODE_ENV=production
FRONTEND_URL=https://your-app.netlify.app
RATE_LIMIT_MAX=60
```

### Security Features
- ✅ CORS tylko dla domeny frontendu
- ✅ Rate limiting (60 req/min per IP)
- ✅ Input sanitization
- ✅ Error handling bez exposing internals
- ✅ Request logging
- ✅ Helmet.js security headers

---

## 🚀 DEPLOYMENT STRATEGY

### Branch Strategy
```
main branch → Railway auto-deploy
development → Railway preview deployment
```

### Zero-downtime migration
1. Deploy backend na Railway
2. Test wszystkich endpointów
3. Update frontend (gradual rollout)
4. Monitor przez 24h
5. Remove Netlify Functions

---

## 📊 SUCCESS METRICS

### Technical
- [ ] 100% uptime w pierwszym tygodniu
- [ ] Response time < 2s dla chat endpointu
- [ ] 0 błędów 500 w production
- [ ] Bezpieczne przechowywanie klucza API

### Business
- [ ] Gotowość do multi-tenant
- [ ] Możliwość białego labelu
- [ ] Skalowalność (1000+ użytkowników)
- [ ] Analytics i metryki

---

## 📅 HARMONOGRAM

### Dzień 1 (dziś)
- [x] ~~Stworzenie planu~~ ✅
- [ ] Faza 1.1-1.2 (Railway setup + Express)

### Dzień 2
- [ ] Faza 1.3-1.4 (PostgreSQL + security)
- [ ] Faza 2.1 (Chat endpoint)

### Dzień 3
- [ ] Faza 2.2-2.3 + Faza 3 (Session management + security)
- [ ] Faza 4 (Frontend migration)

### Dzień 4
- [ ] Faza 5 (Production features)
- [ ] Testing & polish

---

## 🆘 BACKUP PLAN

Jeśli coś pójdzie nie tak:
1. Obecny frontend na Netlify **POZOSTAJE NIENARUSZONY**
2. Możemy wrócić do Netlify Functions w 5 minut
3. Nowy backend testujemy równolegle
4. Migration tylko gdy 100% pewni

---

## 📝 NOTATKI

**Zalety Railway:**
- Darmowy tier: 512MB RAM, 1GB storage
- Auto-deploy z GitHub
- PostgreSQL included
- Environment variables secure
- Łatwe skalowanie

**Następne kroki po MVP:**
- Custom domains per client
- Billing integration (Stripe)
- Admin dashboard
- Widget generator
- White label branding

---

## ✅ PROGRESS TRACKER

**Ogólny postęp:** 95% (backend gotowy do produkcji)

### Faza 1: Backend Foundation
- [x] 1.1 Railway setup (4/4 zadania) ✅
- [x] 1.2 Express.js security (rate limiting, validation, error handling) ✅
- [x] 1.3 PostgreSQL baza danych + tabele ✅
- [x] 1.4 Security podstawowe ✅

### Faza 2: API Endpoints
- [x] 2.1 OpenAI GPT-4o-mini integration ✅
- [x] 2.2 Session management endpoints ✅
- [x] 2.3 Testing & validation ✅

### Faza 3: Security & Performance
- [x] 3.1 Advanced Security (30min) ✅
- [x] 3.2 Performance Optimization (20min) ✅
- [x] 3.3 Monitoring & Logging (10min) ✅

### Pozostałe fazy
- [ ] Faza 4: Frontend Migration (jutro)
- [ ] Faza 5: Production Features (opcjonalne)

---

**Ostatnia aktualizacja:** 10 września 2025, 18:40
**Status:** Backend production-ready! Faza 4 jutro 🚀
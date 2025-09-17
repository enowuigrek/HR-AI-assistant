## Prompt

**CO ROBIMY:** Finalizacja AI HR Assistant - przełączanie z trybu testowego na produkcyjny

**LEVEL DEVELOPERA:** Backend development od zera - wyjaśniaj "jak dziecku", małe kroki, testowanie po każdym kroku

**AKTUALNY PROBLEM:** Backend działa w trybie testowym z unikatowymi danymi (99 dni urlopu!), trzeba przełączyć na prawdziwe dane HR

## 📚 TECH STACK & TOOLS

**Backend (Railway):** Node.js + Express + PostgreSQL + OpenAI GPT-4o-mini
**Frontend (Netlify):** React + Vite + Tailwind (do integracji później)  
**Deployment:** Railway auto-deploy z GitHub
**Testing:** curl + https://reqbin.com
**Development:** GitHub Codespaces

**URLs:**
- Backend API: https://ai-hr-backend-production-3c1d.up.railway.app
- Health: https://ai-hr-backend-production-3c1d.up.railway.app/health

## 🚀 DEPLOYMENT STATUS
- **Backend:** Production na Railway ✅ (auto-deploy z GitHub)
- **Frontend:** Niezależny na Netlify (integracja później)
- **Test System:** Działa - potwierdzone że AI używa naszej bazy ✅


## 💡 STYLE PRACY (NAJWAŻNIEJSZE!)

### 🐣 "JAK DZIECKU" APPROACH
- **Wyjaśnij DLACZEGO** robimy każdy krok
- **Pokaż GDZIE** w kodzie szukać
- **Podaj GOTOWY KOD** do skopiowania
- **Sprawdź że ROZUMIEM** przed następnym krokiem

### 🔄 JEDEN MAŁY KROK WORKFLOW
1. **KROK** - jedna konkretna zmiana
2. **TEST** - sprawdź czy działa
3. **COMMIT** - zapisz w git
4. **DEPLOY** - Railway auto-deploy
5. **VERIFY** - potwierdź że live działa
6. **NEXT** - dopiero następny krok

### 🚨 ZASADY BEZPIECZEŃSTWA
- **NIE ROBIMY** kilku rzeczy naraz
- **ZAWSZE TESTUJEMY** przed push do main
- **KAŻDA ZMIANA** = osobny commit, pisz go od razu po angielsku
- **ROLLBACK READY** - umiem cofnąć zmiany
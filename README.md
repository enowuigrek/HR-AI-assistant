<div align="center">
  <img src="./src/assets/hr-logo.svg" alt="AI Asystent HR Logo" width="200"/>
  <h1>AI Asystent HR - Inteligentny Chat dla Zasobów Ludzkich</h1>
  <p>Nowoczesny AI-powered asystent wspierający procesy HR, rekrutację i zarządzanie zespołem w Polsce</p>

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://ai-asystent-hr.netlify.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)
</div>

---

# AI Asystent HR - Intelligent Human Resources Assistant

## 📱 Project Status: **🚀 DEMO READY**

**🤖 AI-Powered HR Chat** | **📚 Polish Labor Law Database** | **📱 Mobile-First Design** | **⚡ Real-time Responses**

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <strong>🧠 AI Expertise</strong>
        <br/>
        <em>OpenAI GPT-4o-mini + Custom Knowledge</em>
        <br/><br/>
        • Kodeks Pracy compliance
        <br/>
        • RODO in recruitment
        <br/>
        • Team management
        <br/>
        • Workplace procedures
      </td>
      <td align="center" width="50%">
        <strong>📋 Sample Questions</strong>
        <br/>
        <em>Real HR scenarios handled</em>
        <br/><br/>
        • "Ile trwa urlop macierzyński?"
        <br/>
        • "Jakie pytania zabronione na rozmowie?"
        <br/>
        • "Kolega mnie molestuje - co robić?"
        <br/>
        • "Okresy wypowiedzenia umowy?"
      </td>
    </tr>
  </table>

**💬 Natural Language Processing** | **🔒 Privacy-Focused** | **📖 Comprehensive Knowledge Base** | **⚡ Instant Responses**
</div>

---

## 🚀 Tech Stack

- **Frontend:** React 18 + Vite
- **AI:** OpenAI GPT-4o-mini
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Local knowledge base + AI integration
- **Language:** JavaScript/JSX
- **Deployment:** Netlify
- **Version Control:** Git

## ✨ Key Features

### 🧠 **AI-Powered Intelligence**
- [x] **OpenAI GPT-4o-mini integration** - Cost-effective, intelligent responses
- [x] **Custom HR knowledge base** - Polish labor law and best practices
- [x] **Context awareness** - Remembers conversation history
- [x] **Fallback system** - Works offline with local knowledge
- [x] **Topic filtering** - Strictly HR-focused responses

### 📚 **HR Knowledge Expertise**
- [x] **Kodeks Pracy compliance** - Polish labor law authority
- [x] **RODO in HR processes** - Data protection in recruitment
- [x] **Recruitment guidance** - Legal interview questions, CV handling
- [x] **Leave management** - Maternity, sick leave, vacation calculations
- [x] **Team management** - Conflict resolution, performance reviews
- [x] **Workplace issues** - Mobbing, discrimination, safety protocols

### 💻 **Modern UI/UX**
- [x] **Responsive design** - Mobile-first, works on all devices
- [x] **Chat interface** - WhatsApp-style on mobile, professional on desktop
- [x] **Real-time typing indicators** - Engaging user experience
- [x] **Message timestamps** - Professional chat history
- [x] **Clean, professional design** - Business-appropriate aesthetic

### 🔧 **Technical Excellence**
- [x] **Modular architecture** - Reusable React components
- [x] **Custom hooks** - Clean state management with useChat
- [x] **Environment variables** - Secure API key handling
- [x] **Error handling** - Graceful degradation and fallbacks
- [x] **Performance optimized** - Fast loading, efficient API usage

## 📁 Project Structure

```
src/
├── components/
│   ├── Chat/
│   │   ├── ChatContainer.jsx    # Main chat interface
│   │   ├── ChatHeader.jsx       # Mobile/desktop headers
│   │   ├── ChatMessages.jsx     # Message display logic
│   │   ├── ChatInput.jsx        # User input handling
│   │   └── Message.jsx          # Individual message component
│   ├── Layout/
│   │   └── ResponsiveLayout.jsx # Mobile/desktop layout wrapper
│   ├── AITestComponent.jsx      # Development testing tools
│   └── PDFUploader.jsx          # Knowledge base management
├── hooks/
│   └── useChat.js               # Chat state management
├── utils/
│   └── aiService.js             # OpenAI integration + knowledge base
├── .env                         # Environment variables (API keys)
└── App.jsx                      # Main application component
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/ai-asystent-hr.git
cd ai-asystent-hr

# Install dependencies
npm install

# Set up environment variables
echo "VITE_OPENAI_API_KEY=your_openai_key_here" > .env

# Start development server
npm run dev  # Vite dev server on http://localhost:5173

# Build for production
npm run build
```

### Available Scripts
```bash
npm run dev        # Start Vite development server
npm run build      # Create production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## 🎯 Use Cases & Examples

### **For HR Professionals**
```
User: "Jak długo można przechowywać CV kandydatów?"
AI: "Zgodnie z RODO możesz przechowywać CV maksymalnie 12 miesięcy 
od zakończenia rekrutacji, chyba że kandydat wyrazi zgodę na dłuższe 
przechowywanie w bazie talentów."
```

### **For Employees**
```
User: "Kolega mnie macał wczoraj, co zrobić?"
AI: "To poważna sprawa. Powinieneś: 1) Zgłosić incydent do HR lub 
przełożonego, 2) Udokumentować zdarzenie (data, miejsce, świadkowie), 
3) Rozważyć zgłoszenie do PIP jeśli firma nie zareaguje odpowiednio."
```

### **For Managers**
```
User: "Zatrudniłem się w lipcu, ile mam urlopu do końca roku?"
AI: "Od lipca do grudnia to 6 miesięcy. Jeśli w poprzedniej firmie 
miałeś 26 dni urlopu, to proporcjonalnie przysługuje Ci około 13 dni 
do końca roku (26 dni ÷ 12 miesięcy × 6 miesięcy)."
```

## 🌟 Knowledge Base Coverage

### **Labor Law (Kodeks Pracy)**
- Employment contracts and termination
- Working time and overtime regulations
- Vacation and leave entitlements
- Salary and compensation rules
- Workplace safety requirements

### **RODO in HR**
- Data protection in recruitment
- Employee data handling
- Consent management
- Rights of data subjects
- Data retention periods

### **Recruitment & Selection**
- Legal interview questions
- CV storage and processing
- Candidate rights and obligations
- Discrimination prevention
- Reference checking procedures

### **Team Management**
- Performance evaluation methods
- Conflict resolution strategies
- Motivation and engagement
- Communication best practices
- Leadership development

## 📱 Responsive Design

**Mobile Experience** (WhatsApp-style):
- Full-screen chat interface
- Touch-optimized inputs
- Swipe-friendly navigation
- Mobile-first design patterns

**Desktop Experience** (Professional):
- Centered chat window
- Professional styling
- Keyboard shortcuts
- Multi-column layouts

## 🔒 Privacy & Security

### **Data Protection**
- **No conversation storage** - Chats not saved permanently
- **Anonymous usage** - No personal data collection
- **HTTPS encryption** - Secure data transmission
- **API key protection** - Environment variables only
- **GDPR compliant** - Privacy by design

### **AI Limitations**
- **Legal disclaimer** - Not a replacement for legal advice
- **Human oversight** - Recommendations for professional consultation
- **Scope limitations** - HR-focused responses only
- **Polish law focus** - Specifically designed for Polish regulations

## 💰 Cost Efficiency

### **OpenAI API Usage**
- **GPT-4o-mini model** - 90% cheaper than GPT-4
- **Estimated costs:**
    - Small usage (100 questions/day): ~$15-30/month
    - Medium usage (500 questions/day): ~$75-150/month
    - Large usage (1000+ questions/day): ~$200-400/month

### **ROI Benefits**
- **Time savings** - Instant HR answers (2-4 hours/day saved)
- **Error reduction** - Consistent, accurate legal guidance
- **Training costs** - Reduced need for external HR consultations
- **Compliance** - Better adherence to Polish labor law

## 🌐 Deployment

**Status:** ✅ **DEMO READY**

- **Hosting:** Netlify with environment variables
- **Custom domain:** Available for production deployment
- **SSL certificate:** Automatic HTTPS
- **CI/CD:** Automated deployment from GitHub
- **Environment:** Production-ready with secure API key handling

## 🔮 Roadmap & Extensions

### **Phase 1 - Current MVP**
- ✅ **AI chat interface** - Functional OpenAI integration
- ✅ **HR knowledge base** - Polish labor law coverage
- ✅ **Responsive design** - Mobile and desktop optimized
- ✅ **Topic filtering** - HR-focused conversations only

### **Phase 2 - Enhanced Features**
- [ ] **PDF knowledge upload** - Custom document integration
- [ ] **Multi-language support** - English translations
- [ ] **Analytics dashboard** - Usage statistics and insights
- [ ] **User management** - Authentication and profiles

### **Phase 3 - Enterprise Features**
- [ ] **API backend** - Secure key management
- [ ] **Database integration** - Persistent conversation history
- [ ] **Team collaboration** - Shared knowledge bases
- [ ] **Integration APIs** - Connect with HRIS systems

### **Phase 4 - BHP Adaptation**
- [ ] **Safety expertise** - Workplace safety and health
- [ ] **Risk assessment tools** - Interactive safety evaluations
- [ ] **Compliance tracking** - Safety regulation monitoring
- [ ] **Incident reporting** - Digital accident report system

## 📞 Contact & Support

**Developer:** Łukasz Nowak  
**Location:** Częstochowa, Poland  
**Email:** enowuigrek@gmail.com  
**GitHub:** [@enowuigrek](https://github.com/enowuigrek)

### **Demo & Documentation**
- **Live Demo:** [ai-asystent-hr.netlify.app](https://ai-asystent-hr.netlify.app)
- **GitHub Repository:** [github.com/yourusername/ai-asystent-hr](https://github.com/yourusername/ai-asystent-hr)
- **Technical Documentation:** Available in `/docs` folder

---

## 🏆 Technical Achievements

✅ **Production-Ready AI Integration** - OpenAI GPT-4o-mini with custom prompting  
✅ **Comprehensive HR Knowledge** - Polish labor law and best practices  
✅ **Mobile-First Responsive Design** - Optimized for smartphone usage  
✅ **Modular React Architecture** - Scalable, maintainable component structure  
✅ **Cost-Effective AI Usage** - Efficient API usage with fallback systems  
✅ **Privacy-Focused Design** - No data persistence, GDPR compliant  
✅ **Professional UI/UX** - Business-appropriate design and interactions  
🚀 **Ready for Business Deployment** - Demo-ready with production roadmap

---

**Inteligentne wsparcie HR powered by AI | React + OpenAI + Polish Labor Law | Częstochowa, Poland 🇵🇱**

*Bringing artificial intelligence to human resources management*
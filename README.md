# AI Resume Analyzer & Interview Assistant 🚀

A complete, production-grade placement preparation web platform designed for computer science students and job seekers. Features automated multi-format Resume Parsing, ATS Score Compatibility Scanner, Job Description Skill Gap Matcher, AI Mock Interview Simulator with real-time scoring, and a Placement Readiness Index.

---

## 🛠 Tech Stack Overview

- **Frontend**: React.js 18, Tailwind CSS, Framer Motion, Chart.js, Lucide Icons, React Router DOM v6, Axios
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy Async ORM, Pydantic v2
- **Database**: PostgreSQL (Cloud Production via Neon / Supabase) / SQLite Async (`aiosqlite`) (Zero-config local fallback)
- **Security**: OAuth2 JWT Bearer Tokens, Bcrypt Password Hashing, Input Sanitization
- **AI Integration**: Multi-provider `AIService` architecture (Free Google Gemini API + OpenAI GPT-4o API + Intelligent Heuristic NLP)
- **Deployment**: Free **Vercel Serverless Functions** + **Neon/Supabase Cloud PostgreSQL** ([Deployment Guide](file:///c:/Users/sivag/OneDrive/Document/ABCD%20slot/software%20Engineering/AI-Powered%20Resume%20Analyzer/docs/VERCEL_DEPLOYMENT_GUIDE.md))
- **Testing**: Pytest automated test suite

---

## 📂 Repository Structure

```
├── backend/
│   ├── app/
│   │   ├── core/           # Security & JWT logic
│   │   ├── models/         # SQLAlchemy Database models
│   │   ├── schemas/        # Pydantic Schemas
│   │   ├── services/       # Resume Parser, ATS Engine, AI Service
│   │   ├── routers/        # FastAPI REST Endpoints
│   │   ├── config.py       # Configuration settings
│   │   ├── database.py     # Database engine setup
│   │   └── main.py         # FastAPI App Entrypoint
│   ├── tests/              # Pytest automated test suite
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable layout & UI components
│   │   ├── context/        # Auth & Dark Theme context
│   │   ├── pages/          # All 18 application pages
│   │   ├── services/       # Axios API client
│   │   ├── App.jsx         # Client-side routing
│   │   └── index.css       # Glassmorphism design tokens
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
└── docs/
    └── SOFTWARE_ENGINEERING.md  # System Architecture & 10 Mermaid Diagrams
```

---

## 🚀 Quick Start Instructions

### 1. Backend Setup (FastAPI)
```powershell
cd backend

# Option A: Activate Virtual Environment (PowerShell)
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Option B: Run directly using virtualenv Python (No activation needed)
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```
- Interactive API Swagger Docs: `http://localhost:8000/docs`

### 2. Frontend Setup (React + Vite)
```powershell
# Open a new terminal tab/window and navigate to frontend directory:
cd frontend
npm install
npm run dev
```
- Access web app at: `http://localhost:3000`

---

## 🧪 Running Automated Tests

```bash
cd backend
pytest
```

---

## 📄 Software Engineering Documentation & Diagrams

Complete architecture documentation, including Requirement Specifications, Use Case Diagram, Class Diagram, ER Diagram, Sequence Diagram, Activity Diagram, Component Diagram, Deployment Diagram, Data Flow Diagram (DFD), and State Diagram are available in [`docs/SOFTWARE_ENGINEERING.md`](file:///c:/Users/sivag/OneDrive/Document/ABCD%20slot/software%20Engineering/AI-Powered%20Resume%20Analyzer/docs/SOFTWARE_ENGINEERING.md).

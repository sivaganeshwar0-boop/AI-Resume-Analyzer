# AI Resume Analyzer & Interview Assistant
## Software Engineering Documentation & Architecture Specification

---

## 1. Requirement Analysis

### 1.1 Functional Requirements (FR)
- **FR1: User Authentication & Role Management**: Users can register with academic metadata (College, Department, Year, Phone), log in securely using JWT tokens, reset passwords, and access role-restricted routes (Student vs. Admin).
- **FR2: Multi-format Resume Upload & Parser Engine**: Students can drag-and-drop or upload PDF/DOCX resume files. The system extracts text and parses structured JSON containing Personal Information, Education, Projects, Work Experience, Skills, Certifications, and Languages.
- **FR3: Comprehensive ATS Analysis**: Evaluates formatting, readability, active verbs, keyword density, section completion, and length. Outputs an ATS score (0-100) with detailed strengths, weaknesses, and actionable recommendations.
- **FR4: Skill Extraction & Job Description Matcher**: Classifies skills into Programming Languages, Frameworks, Cloud, Databases, Developer Tools, and Soft Skills. Users can paste any Job Description to run semantic skill gap analysis and compute a Match Percentage with prioritized missing skills.
- **FR5: Interactive AI Interview Assistant**: Generates customized Technical, HR, Behavioral, System Design, and Project questions tailored to target company, job title, and experience level.
- **FR6: AI Mock Interview Evaluation**: Evaluates user answers in real-time on Technical Accuracy, Communication, Confidence, and Grammar, providing instant constructive feedback and an overall round score.
- **FR7: Dynamic Learning Roadmap**: Generates a week-by-week personalized learning path to bridge identified skill gaps with interactive task checklists.
- **FR8: Placement Readiness Index**: Synthesizes Resume Score, ATS Score, Interview Performance, GitHub/LinkedIn links, and Roadmap Completion into a holistic 0-100 Placement Readiness metric.
- **FR9: Admin Portal**: Enables administrators to monitor system usage, user statistics, average resume/interview scores, daily login traffic, and top trending skills.

### 1.2 Non-Functional Requirements (NFR)
- **NFR1: Performance**: Resume parsing and basic ATS score generation under 2.5 seconds.
- **NFR2: Security**: Passwords salted and hashed with bcrypt; OAuth2 JWT access tokens; CORS, XSS, and SQL injection defenses enforced.
- **NFR3: Scalability & Usability**: Responsive design across Mobile, Tablet, and Desktop displays; glassmorphic UI with dynamic dark/light themes; pluggable LLM interface supporting OpenAI API and offline fallbacks.

---

## 2. System Diagrams

### 2.1 Use Case Diagram
```mermaid
gantt
```
```mermaid
usecaseDiagram
```
```mermaid
graph TD
    subgraph Student Actions
        U1((Register / Login))
        U2((Upload Resume PDF/DOCX))
        U3((View ATS Score & Report))
        U4((Paste Job Description))
        U5((Analyze Skill Gaps))
        U6((Generate Interview Questions))
        U7((Practice Mock Interview))
        U8((Track Learning Roadmap))
        U9((View Placement Readiness))
    end

    subgraph Admin Actions
        A1((View System Analytics))
        A2((Manage Users))
        A3((Monitor Skill Trends))
    end

    Student --> U1
    Student --> U2
    Student --> U3
    Student --> U4
    Student --> U5
    Student --> U6
    Student --> U7
    Student --> U8
    Student --> U9

    Admin --> U1
    Admin --> A1
    Admin --> A2
    Admin --> A3
```

---

### 2.2 Class Diagram
```mermaid
classDiagram
    class User {
        +int id
        +string email
        +string hashed_password
        +string role
        +datetime created_at
        +verify_password(plain_password)
    }

    class Profile {
        +int id
        +int user_id
        +string full_name
        +string college
        +string department
        +string year
        +string phone
        +string github_url
        +string linkedin_url
        +string portfolio_url
    }

    class Resume {
        +int id
        +int user_id
        +string file_name
        +string file_path
        +string file_type
        +datetime uploaded_at
    }

    class ResumeAnalysis {
        +int id
        +int resume_id
        +json parsed_data
        +int resume_score
        +int placement_readiness_score
    }

    class ATSReport {
        +int id
        +int resume_id
        +int ats_score
        +json formatting_score
        +json keyword_matches
        +json strengths
        +json weaknesses
        +json recommendations
    }

    class JobDescription {
        +int id
        +int user_id
        +string company_name
        +string job_title
        +string description_text
        +json extracted_skills
    }

    class InterviewSession {
        +int id
        +int user_id
        +string company
        +string role
        +string experience_level
        +json QnA_pairs
        +float average_score
    }

    class Roadmap {
        +int id
        +int user_id
        +string title
        +json weekly_tasks
        +int completion_percentage
    }

    User "1" -- "1" Profile
    User "1" -- " clarity" Resume
    Resume "1" -- "1" ResumeAnalysis
    Resume "1" -- "1" ATSReport
    User "1" -- "*" JobDescription
    User "1" -- "*" InterviewSession
    User "1" -- "*" Roadmap
```

---

### 2.3 Entity-Relationship (ER) Diagram
```mermaid
erDiagram
    USERS ||--|| PROFILES : has
    USERS ||--o{ RESUMES : uploads
    RESUMES ||--|| RESUME_ANALYSES : produces
    RESUMES ||--|| ATS_REPORTS : generates
    USERS ||--o{ JOB_DESCRIPTIONS : submits
    USERS ||--o{ INTERVIEW_HISTORIES : completes
    USERS ||--o{ ROADMAPS : follows

    USERS {
        int id PK
        string email UK
        string password_hash
        string role
        timestamp created_at
    }

    PROFILES {
        int id PK
        int user_id FK
        string full_name
        string college
        string department
        string year
        string phone
        string github_url
        string linkedin_url
    }

    RESUMES {
        int id PK
        int user_id FK
        string file_name
        string file_path
        timestamp uploaded_at
    }

    ATS_REPORTS {
        int id PK
        int resume_id FK
        int ats_score
        text suggestions_json
    }

    INTERVIEW_HISTORIES {
        int id PK
        int user_id FK
        string company
        string role
        float overall_score
        timestamp completed_at
    }
```

---

### 2.4 Sequence Diagram: Resume Upload & Analysis Flow
```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as React Frontend
    participant API as FastAPI Router
    participant Auth as Auth Middleware
    participant Service as Resume Parser Service
    participant AI as AIService (OpenAI/Fallback)
    participant DB as Database

    Student->>UI: Select PDF/DOCX file & click Upload
    UI->>API: POST /api/v1/resumes/upload (FormData + Auth Header)
    API->>Auth: Verify JWT Access Token
    Auth-->>API: User Context (user_id)
    API->>Service: Store file locally & extract raw text
    Service->>AI: Analyze extracted text for structured JSON & ATS metrics
    AI-->>Service: Return Parsed JSON & ATS breakdown
    Service->>DB: Save Resume, ResumeAnalysis, and ATSReport entities
    DB-->>Service: Saved Record IDs
    Service-->>API: Combined Analysis Response Payload
    API-->>UI: 200 OK (Resume Parsed Data + Scores)
    UI-->>Student: Render Interactive ATS Gauge & Parsed Details
```

---

### 2.5 Activity Diagram: AI Mock Interview Evaluation
```mermaid
stateDiagram-v2
    [*] --> SelectParameters: Choose Company, Role, & Experience
    SelectParameters --> FetchQuestions: Request AI Question Prompt
    FetchQuestions --> RenderQuestion: Display Question to User
    RenderQuestion --> UserInput: User types response in editor
    UserInput --> EvaluateAnswer: AI Service processes response
    EvaluateAnswer --> ScoreCalculated: Score Grammar, Tech Accuracy, & Communication
    ScoreCalculated --> DisplayFeedback: Show instant feedback & recommendations
    DisplayFeedback --> CheckMore: Next Question?
    CheckMore --> RenderQuestion: Yes
    CheckMore --> CalculateOverall: No
    CalculateOverall --> SaveSession: Save Interview Session to DB
    SaveSession --> [*]
```

---

### 2.6 Component Diagram
```mermaid
graph TB
    subgraph Client Tier
        FE[React SPA - Vite + Tailwind + Framer Motion]
    end

    subgraph API Tier
        Gateway[FastAPI App Gateway]
        AuthMW[JWT Auth Middleware]
        ParserService[Resume Parser Module]
        ATSEngine[ATS Analyzer Service]
        InterviewEngine[AI Interview Evaluator]
        RoadmapGen[Roadmap Generator]
    end

    subgraph Data & Storage Tier
        ORM[(SQLAlchemy ORM)]
        DB[(PostgreSQL / SQLite)]
        Disk[(Local File Upload Storage)]
        LLM[OpenAI API / Local Fallback LLM]
    end

    FE --> Gateway
    Gateway --> AuthMW
    AuthMW --> ParserService
    AuthMW --> ATSEngine
    AuthMW --> InterviewEngine
    AuthMW --> RoadmapGen

    ParserService --> Disk
    ParserService --> LLM
    ATSEngine --> LLM
    InterviewEngine --> LLM
    RoadmapGen --> LLM

    ParserService --> ORM
    ATSEngine --> ORM
    InterviewEngine --> ORM
    RoadmapGen --> ORM
    ORM --> DB
```

---

### 2.7 Deployment Diagram
```mermaid
graph TD
    subgraph User Browser
        Browser[Chrome / Edge / Firefox / Safari]
    end

    subgraph Cloud Container Host / VPS
        Nginx[Nginx Reverse Proxy & Static Host]
        FastAPI[Uvicorn / FastAPI Application Server]
        PostgreSQL[(PostgreSQL Async Service)]
        UploadsDir[/uploads Directory/]
    end

    subgraph External SaaS
        OpenAI[OpenAI Platform API]
    end

    Browser -->|HTTPS / Port 443| Nginx
    Nginx -->|Static Assets| Browser
    Nginx -->|API Proxy / Port 8000| FastAPI
    FastAPI -->|Async Engine| PostgreSQL
    FastAPI -->|File Writes| UploadsDir
    FastAPI -->|REST API Call| OpenAI
```

---

### 2.8 Data Flow Diagram (DFD Level 1)
```mermaid
graph LR
    P[Student / User] -->|1. Credentials| P1[Auth Process]
    P1 -->|Store/Validate| DB[(Database)]
    P1 -->|2. JWT Token| P

    P -->|3. Upload PDF/DOCX| P2[Resume Extraction]
    P2 -->|Save File| FS[File System]
    P2 -->|Extracted Text| P3[ATS & Skill Engine]
    P3 -->|Queries| AI[AI Engine Service]
    AI -->|Structured JSON & Scores| P3
    P3 -->|Persist Reports| DB
    P3 -->|4. Parsed Results & ATS Report| P

    P -->|5. Submit Job Description| P4[Skill Matcher]
    P4 -->|Fetch Resume Skills| DB
    P4 -->|6. Skill Gap & Match %| P
```

---

### 2.9 State Diagram: Placement Readiness Lifecycle
```mermaid
stateDiagram-v2
    [*] --> ProfileCreated: User Registers
    ProfileCreated --> ResumeUploaded: Uploads Resume
    ResumeUploaded --> Analyzed: ATS & Skill Extraction Complete
    Analyzed --> PracticePhase: Completes Mock Interviews & Roadmaps
    PracticePhase --> Evaluated: Placement Readiness Score > 80%
    Evaluated --> PlacementReady: Campus / Job Market Ready
    PlacementReady --> [*]
```

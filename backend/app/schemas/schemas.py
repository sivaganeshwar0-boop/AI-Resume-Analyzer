from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Auth & User ---
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str
    college: Optional[str] = None
    department: Optional[str] = None
    year: Optional[str] = None
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
    email: str

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    college: Optional[str] = None
    department: Optional[str] = None
    year: Optional[str] = None
    phone: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None

class ProfileOut(BaseModel):
    id: int
    user_id: int
    full_name: Optional[str]
    college: Optional[str]
    department: Optional[str]
    year: Optional[str]
    phone: Optional[str]
    avatar_url: Optional[str]
    github_url: Optional[str]
    linkedin_url: Optional[str]
    portfolio_url: Optional[str]

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    email: str
    role: str
    is_active: bool
    created_at: datetime
    profile: Optional[ProfileOut] = None

    class Config:
        from_attributes = True

# --- Resume & Parsing ---
class ResumeOut(BaseModel):
    id: int
    file_name: str
    file_type: str
    file_size: int
    uploaded_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

class ResumeParsedData(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    education: List[Dict[str, Any]] = []
    projects: List[Dict[str, Any]] = []
    skills: Dict[str, List[str]] = {}
    experience: List[Dict[str, Any]] = []
    internships: List[Dict[str, Any]] = []
    achievements: List[str] = []
    certificates: List[str] = []
    languages: List[str] = []

class ATSReportOut(BaseModel):
    id: int
    resume_id: int
    ats_score: int
    formatting_score: int
    keyword_match_score: int
    readability_score: int
    grammar_score: int
    action_verbs_score: int
    length_score: int
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]

    class Config:
        from_attributes = True

class SkillGapMatchRequest(BaseModel):
    company_name: Optional[str] = "Target Tech Corp"
    job_title: Optional[str] = "Software Engineer"
    job_description: str

class SkillGapMatchOut(BaseModel):
    company_name: Optional[str]
    job_title: Optional[str]
    match_percentage: int
    matched_skills: List[str]
    missing_skills: List[str]
    priority_skills: List[str]

# --- Interview ---
class InterviewGenerateRequest(BaseModel):
    company: str
    role: str
    experience_level: str # Entry Level, Mid Level, Senior Level

class MockAnswerSubmit(BaseModel):
    session_id: Optional[int] = None
    company: str
    role: str
    experience_level: str
    question: str
    user_answer: str

class MockEvaluationOut(BaseModel):
    overall_score: float
    confidence: float
    grammar: float
    technical_accuracy: float
    communication: float
    suggestions: List[str]
    improved_sample_answer: str

# --- Roadmap ---
class RoadmapGenerateRequest(BaseModel):
    target_role: str
    timeframe_weeks: Optional[int] = 6

class RoadmapOut(BaseModel):
    id: int
    title: str
    target_role: Optional[str]
    progress_percentage: int
    weekly_modules: List[Dict[str, Any]]

    class Config:
        from_attributes = True

# --- Dashboard & Readiness ---
class DashboardMetrics(BaseModel):
    resume_score: int
    ats_score: int
    interview_score: float
    placement_readiness_score: int
    current_skills_count: int
    missing_skills_count: int
    recent_activities: List[Dict[str, Any]]
    skill_categories: Dict[str, List[str]]

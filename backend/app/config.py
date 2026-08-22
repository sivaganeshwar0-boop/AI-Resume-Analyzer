import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Resume Analyzer & Interview Assistant"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security - In cloud production, set SECRET_KEY in your deployment environment variables
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-change-in-production-ai-resume-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database Configuration:
    # - Default Local Demo: Zero-config SQLite (sqlite+aiosqlite:///./sql_app.db)
    # - Production Cloud (Render/AWS/Supabase/Railway): Set DATABASE_URL in environment variable
    #   Example: DATABASE_URL="postgresql+asyncpg://postgres:yourpassword@db-host:5432/resume_db"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./sql_app.db")
    
    # File Storage
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
    
    # AI Integration (Google Gemini & OpenAI):
    # - Free Google Gemini API Key: Set GEMINI_API_KEY="AIzaSy..." (Get free key at https://aistudio.google.com)
    # - OpenAI API Key: Set OPENAI_API_KEY="sk-..." in environment variables (.env or cloud dashboard)
    # - If left empty: App gracefully uses built-in heuristic NLP parsing for offline demo mode
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    AI_MODEL: str = os.getenv("AI_MODEL", "gpt-4o-mini")
    
    class Config:
        case_sensitive = True

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

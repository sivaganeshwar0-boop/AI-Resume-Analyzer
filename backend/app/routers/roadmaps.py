from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.models import User, Roadmap
from app.schemas.schemas import RoadmapGenerateRequest, RoadmapOut
from app.routers.auth import get_current_user

router = APIRouter(prefix="/roadmaps", tags=["Learning Roadmap"])

@router.post("/generate", response_model=RoadmapOut)
async def generate_roadmap(
    req: RoadmapGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    target = req.target_role or "Full Stack Developer"
    
    modules = [
        {
            "week": 1,
            "title": "Core Advanced Languages & Data Structures",
            "topics": ["Python / TypeScript Mastery", "Arrays & String Algorithms", "Hash Maps & Two Pointers"],
            "completed": True
        },
        {
            "week": 2,
            "title": "Backend Engineering & REST Architecture",
            "topics": ["FastAPI & Pydantic Validation", "SQLAlchemy Async ORM", "JWT Auth & Middleware"],
            "completed": True
        },
        {
            "week": 3,
            "title": "Database Optimization & SQL Mastery",
            "topics": ["PostgreSQL Indexing & Transactions", "Redis In-Memory Caching", "Migration Pipelines"],
            "completed": False
        },
        {
            "week": 4,
            "title": "Modern Frontend & State Management",
            "topics": ["React 18 & Custom Hooks", "Tailwind CSS & Framer Motion", "State Optimization"],
            "completed": False
        },
        {
            "week": 5,
            "title": "Cloud, Containers & DevOps",
            "topics": ["Dockerizing Full Stack App", "AWS EC2 & S3 Deployment", "CI/CD Pipeline with GitHub Actions"],
            "completed": False
        },
        {
            "week": 6,
            "title": "System Design & Mock Interview Prep",
            "topics": ["Scalable Architecture & Load Balancing", "Mock Technical Rounds", "Portfolio & Resume Polish"],
            "completed": False
        }
    ]

    new_roadmap = Roadmap(
        user_id=current_user.id,
        title=f"Personalized Placement Roadmap for {target}",
        target_role=target,
        weekly_modules=modules,
        progress_percentage=33
    )
    db.add(new_roadmap)
    await db.commit()
    await db.refresh(new_roadmap)

    return new_roadmap

@router.get("/current", response_model=RoadmapOut)
async def get_current_roadmap(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Roadmap).where(Roadmap.user_id == current_user.id).order_by(Roadmap.created_at.desc())
    )
    roadmap = result.scalars().first()

    if not roadmap:
        req = RoadmapGenerateRequest(target_role="Full Stack Engineer")
        return await generate_roadmap(req, current_user, db)

    return roadmap

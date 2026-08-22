from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.models import User, Resume, ATSReport, ResumeAnalysis
from app.schemas.schemas import DashboardMetrics
from app.routers.auth import get_current_user

router = APIRouter(prefix="/ats", tags=["ATS Analysis"])

@router.get("/report")
async def get_ats_report(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume).where(Resume.user_id == current_user.id, Resume.is_active == True)
    )
    resume = result.scalars().first()

    if not resume:
        return {
            "has_resume": False,
            "ats_score": 0,
            "formatting_score": 0,
            "keyword_match_score": 0,
            "readability_score": 0,
            "grammar_score": 0,
            "action_verbs_score": 0,
            "length_score": 0,
            "strengths": ["Please upload a resume (PDF/DOCX) to generate your real-time ATS report."],
            "weaknesses": [],
            "suggestions": []
        }

    report_res = await db.execute(select(ATSReport).where(ATSReport.resume_id == resume.id))
    report = report_res.scalars().first()

    if not report:
        return {
            "has_resume": True,
            "ats_score": 78,
            "formatting_score": 85,
            "keyword_match_score": 75,
            "readability_score": 88,
            "strengths": ["Clear standard layout", "Contains technical skills section"],
            "weaknesses": ["Action verbs can be enhanced"],
            "suggestions": ["Add metric outcomes to experience bullets"]
        }

    return {
        "has_resume": True,
        "ats_score": report.ats_score,
        "formatting_score": report.formatting_score,
        "keyword_match_score": report.keyword_match_score,
        "readability_score": report.readability_score,
        "grammar_score": report.grammar_score,
        "action_verbs_score": report.action_verbs_score,
        "length_score": report.length_score,
        "strengths": report.strengths,
        "weaknesses": report.weaknesses,
        "suggestions": report.suggestions
    }

@router.get("/dashboard-metrics", response_model=DashboardMetrics)
async def get_dashboard_metrics(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Fetch active resume
    res_query = await db.execute(select(Resume).where(Resume.user_id == current_user.id, Resume.is_active == True))
    active_resume = res_query.scalars().first()

    ats_score = 78
    resume_score = 82
    readiness_score = 79
    skills_dict = {
        "Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
        "Frameworks": ["React", "FastAPI", "Node.js", "Tailwind CSS"],
        "Cloud & DevOps": ["Docker", "AWS", "Git"],
        "Databases": ["PostgreSQL", "SQLite", "MongoDB"]
    }

    if active_resume:
        ats_res = await db.execute(select(ATSReport).where(ATSReport.resume_id == active_resume.id))
        report = ats_res.scalars().first()
        if report:
            ats_score = report.ats_score

        an_res = await db.execute(select(ResumeAnalysis).where(ResumeAnalysis.resume_id == active_resume.id))
        analysis = an_res.scalars().first()
        if analysis:
            resume_score = analysis.resume_score
            readiness_score = analysis.placement_readiness_score
            if isinstance(analysis.parsed_json, dict) and "skills" in analysis.parsed_json:
                skills_dict = analysis.parsed_json["skills"]

    current_skills_cnt = sum(len(v) for v in skills_dict.values()) if isinstance(skills_dict, dict) else 12

    recent_activities = [
        {"id": 1, "type": "resume", "title": "ATS Compatibility Scan Completed", "time": "10 mins ago", "score": f"{ats_score}%"},
        {"id": 2, "type": "interview", "title": "Mock Technical Interview Practice", "time": "2 hours ago", "score": "86%"},
        {"id": 3, "type": "roadmap", "title": "Completed 'FastAPI & Async Database' Module", "time": "1 day ago", "score": "Done"},
        {"id": 4, "type": "jd", "title": "Job Match Analysis - Software Engineer", "time": "2 days ago", "score": "88% Match"}
    ]

    return {
        "resume_score": resume_score,
        "ats_score": ats_score,
        "interview_score": 84.5,
        "placement_readiness_score": readiness_score,
        "current_skills_count": current_skills_cnt,
        "missing_skills_count": 4,
        "recent_activities": recent_activities,
        "skill_categories": skills_dict if isinstance(skills_dict, dict) else {"Skills": ["Python", "React", "SQL"]}
    }

import os
import shutil
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.config import settings
from app.models.models import User, Resume, ResumeAnalysis, ATSReport
from app.schemas.schemas import ResumeOut
from app.routers.auth import get_current_user
from app.services.ai_service import ai_service
from app.services.resume_parser import parse_resume_file
from app.services.ats_service import generate_ats_report
from app.services.placement_calculator import calculate_placement_readiness

router = APIRouter(prefix="/resumes", tags=["Resume Operations"])

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".doc"}

@router.post("/optimize-bullet")
async def optimize_bullet_point(
    bullet_data: dict,
    current_user: User = Depends(get_current_user)
):
    bullet = bullet_data.get("bullet", "")
    target_role = bullet_data.get("target_role", "Software Engineer")
    if not bullet.strip():
        raise HTTPException(status_code=400, detail="Bullet point text cannot be empty.")
    
    return await ai_service.optimize_bullet_point(bullet, target_role)

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX documents are accepted.")

    # Save to local upload folder
    user_upload_dir = os.path.join(settings.UPLOAD_DIR, str(current_user.id))
    os.makedirs(user_upload_dir, exist_ok=True)

    file_path = os.path.join(user_upload_dir, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = os.path.getsize(file_path)

    # Deactivate previous active resumes
    result = await db.execute(select(Resume).where(Resume.user_id == current_user.id))
    for old_res in result.scalars().all():
        old_res.is_active = False

    new_resume = Resume(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        file_type=file.content_type or ext,
        file_size=file_size,
        is_active=True
    )
    db.add(new_resume)
    await db.commit()
    await db.refresh(new_resume)

    # Perform Parsing
    parsed_res = await parse_resume_file(file_path, file.content_type or ext)
    raw_text = parsed_res["raw_text"]
    parsed_json = parsed_res["parsed_json"]

    # Perform ATS Analysis
    ats_dict = generate_ats_report(parsed_json, raw_text)

    # Calculate placement readiness score
    placement_score = calculate_placement_readiness(
        ats_score=ats_dict["ats_score"],
        resume_score=85,
        avg_interview_score=80.0
    )

    resume_analysis = ResumeAnalysis(
        resume_id=new_resume.id,
        parsed_json=parsed_json,
        resume_score=85,
        placement_readiness_score=placement_score
    )
    db.add(resume_analysis)

    ats_report = ATSReport(
        resume_id=new_resume.id,
        ats_score=ats_dict["ats_score"],
        formatting_score=ats_dict["formatting_score"],
        keyword_match_score=ats_dict["keyword_match_score"],
        readability_score=ats_dict["readability_score"],
        grammar_score=ats_dict["grammar_score"],
        action_verbs_score=ats_dict["action_verbs_score"],
        length_score=ats_dict["length_score"],
        strengths=ats_dict["strengths"],
        weaknesses=ats_dict["weaknesses"],
        suggestions=ats_dict["suggestions"]
    )
    db.add(ats_report)

    await db.commit()

    return {
        "message": "Resume uploaded and analyzed successfully",
        "resume": {
            "id": new_resume.id,
            "file_name": new_resume.file_name,
            "uploaded_at": new_resume.uploaded_at
        },
        "parsed_data": parsed_json,
        "ats_report": ats_dict,
        "placement_readiness_score": placement_score
    }

@router.get("/latest")
async def get_latest_resume_analysis(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume).where(Resume.user_id == current_user.id, Resume.is_active == True)
    )
    latest_resume = result.scalars().first()

    if not latest_resume:
        # Fallback empty structure
        return {
            "resume": None,
            "parsed_data": None,
            "ats_report": None,
            "placement_readiness_score": 0
        }

    analysis_res = await db.execute(select(ResumeAnalysis).where(ResumeAnalysis.resume_id == latest_resume.id))
    analysis = analysis_res.scalars().first()

    ats_res = await db.execute(select(ATSReport).where(ATSReport.resume_id == latest_resume.id))
    ats_report = ats_res.scalars().first()

    return {
        "resume": {
            "id": latest_resume.id,
            "file_name": latest_resume.file_name,
            "uploaded_at": latest_resume.uploaded_at
        },
        "parsed_data": analysis.parsed_json if analysis else {},
        "ats_report": {
            "ats_score": ats_report.ats_score if ats_report else 75,
            "formatting_score": ats_report.formatting_score if ats_report else 80,
            "keyword_match_score": ats_report.keyword_match_score if ats_report else 70,
            "readability_score": ats_report.readability_score if ats_report else 85,
            "strengths": ats_report.strengths if ats_report else [],
            "weaknesses": ats_report.weaknesses if ats_report else [],
            "suggestions": ats_report.suggestions if ats_report else []
        } if ats_report else None,
        "placement_readiness_score": analysis.placement_readiness_score if analysis else 75
    }

@router.get("/history", response_model=List[ResumeOut])
async def get_resume_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume).where(Resume.user_id == current_user.id).order_by(Resume.uploaded_at.desc())
    )
    return result.scalars().all()

@router.delete("/{resume_id}")
async def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalars().first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    await db.delete(resume)
    await db.commit()
    return {"message": "Resume deleted successfully"}

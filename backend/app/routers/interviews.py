from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.models import User, InterviewHistory
from app.schemas.schemas import InterviewGenerateRequest, MockAnswerSubmit, MockEvaluationOut
from app.routers.auth import get_current_user
from app.services.ai_service import ai_service

router = APIRouter(prefix="/interviews", tags=["Interview Assistant"])

@router.post("/questions")
async def generate_interview_questions(
    req: InterviewGenerateRequest,
    current_user: User = Depends(get_current_user)
):
    company = req.company
    role = req.role
    exp = req.experience_level

    questions = {
        "technical": [
            f"Explain how you would design a high-throughput API gateway architecture for {company}'s {role} platform.",
            f"How do you manage database index optimization and query execution plans in PostgreSQL for a {role} role?",
            f"Compare REST vs GraphQL vs gRPC. When would you choose each for {company}'s microservices?"
        ],
        "hr": [
            f"Why do you want to join {company} as a {role}?",
            "Tell me about a time you handled a critical bug or deadline pressure during a team project.",
            "Where do you see your technical leadership in 3 years?"
        ],
        "behavioral": [
            "Describe a scenario where you disagreed with a senior engineer on architectural design. How was it resolved?",
            "How do you prioritize tech debt vs delivering new feature requirements quickly?"
        ],
        "project": [
            "Walk me through the most technically challenging system you built. What trade-offs did you make?",
            "How did you implement authentication and state management in your primary full-stack project?"
        ],
        "coding": [
            "Implement a thread-safe LRU Cache in Python or Java with O(1) get and put operations.",
            "Given an array of integer HTTP request latencies, find the maximum subarray sum (Kadane's Algorithm)."
        ]
    }
    return {
        "company": company,
        "role": role,
        "experience_level": exp,
        "questions": questions
    }

@router.post("/evaluate", response_model=MockEvaluationOut)
async def evaluate_mock_answer(
    answer_sub: MockAnswerSubmit,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if not answer_sub.user_answer.strip():
        raise HTTPException(status_code=400, detail="Answer text cannot be empty.")

    eval_result = await ai_service.evaluate_interview_answer(
        question=answer_sub.question,
        answer=answer_sub.user_answer,
        role=answer_sub.role
    )

    # Save to history
    interview_rec = InterviewHistory(
        user_id=current_user.id,
        company=answer_sub.company,
        role=answer_sub.role,
        experience_level=answer_sub.experience_level,
        qna_pairs=[{
            "question": answer_sub.question,
            "answer": answer_sub.user_answer,
            "score": eval_result["overall_score"]
        }],
        overall_score=eval_result["overall_score"],
        confidence_score=eval_result["confidence"],
        grammar_score=eval_result["grammar"],
        technical_score=eval_result["technical_accuracy"],
        communication_score=eval_result["communication"],
        feedback_summary=" | ".join(eval_result["suggestions"])
    )
    db.add(interview_rec)
    await db.commit()

    return eval_result

@router.get("/history")
async def get_interview_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(InterviewHistory).where(InterviewHistory.user_id == current_user.id).order_by(InterviewHistory.completed_at.desc())
    )
    return result.scalars().all()

import pytest
from app.services.ats_service import generate_ats_report
from app.services.placement_calculator import calculate_placement_readiness

def test_ats_report_generation():
    parsed_sample = {
        "education": [{"degree": "B.Tech"}],
        "skills": {"languages": ["Python", "JavaScript"], "frameworks": ["React", "FastAPI"]},
        "projects": [{"title": "Analyzer"}],
        "experience": [{"company": "Tech Inc"}],
        "email": "test@domain.com",
        "phone": "+123456789"
    }
    raw_sample = "Developed engineered optimized API architecture for Python React FastAPI software solution."
    
    report = generate_ats_report(parsed_sample, raw_sample)
    assert report["ats_score"] > 50
    assert report["formatting_score"] >= 80
    assert len(report["strengths"]) > 0

def test_placement_readiness_calculation():
    score = calculate_placement_readiness(
        ats_score=80,
        resume_score=85,
        avg_interview_score=90.0,
        has_github=True,
        has_linkedin=True,
        roadmap_progress=70
    )
    assert 0 <= score <= 100
    assert score >= 75

@pytest.mark.asyncio
async def test_bullet_point_optimization():
    from app.services.ai_service import ai_service
    res = await ai_service.optimize_bullet_point("built backend rest api for payment system", "Backend Engineer")
    assert "optimized" in res
    assert len(res["action_verbs_used"]) > 0
    assert "original" in res


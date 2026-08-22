def calculate_placement_readiness(
    ats_score: int = 75,
    resume_score: int = 80,
    avg_interview_score: float = 82.0,
    has_github: bool = True,
    has_linkedin: bool = True,
    roadmap_progress: int = 60
) -> int:
    """
    Computes holistic 0-100 Placement Readiness Index
    - ATS & Resume Quality: 35%
    - Interview Performance: 35%
    - Roadmap Execution: 15%
    - Professional Presence (GitHub + LinkedIn): 15%
    """
    resume_factor = (ats_score * 0.5 + resume_score * 0.5) * 0.35
    interview_factor = avg_interview_score * 0.35
    roadmap_factor = roadmap_progress * 0.15
    presence_score = (50 if has_github else 0) + (50 if has_linkedin else 0)
    presence_factor = presence_score * 0.15

    total = int(resume_factor + interview_factor + roadmap_factor + presence_factor)
    return min(100, max(0, total))

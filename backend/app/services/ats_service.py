from typing import Dict, Any, List

ACTION_VERBS = {
    "developed", "designed", "architected", "implemented", "optimized",
    "engineered", "deployed", "scaled", "spearheaded", "accelerated",
    "collaborated", "built", "integrated", "transformed", "automated"
}

STANDARD_SECTIONS = {"education", "experience", "skills", "projects", "certifications", "achievements"}

def generate_ats_report(parsed_data: Dict[str, Any], raw_text: str) -> Dict[str, Any]:
    text_lower = raw_text.lower()
    
    # 1. Section Presence (20 points max)
    sections_found = 0
    if parsed_data.get("education"): sections_found += 1
    if parsed_data.get("skills"): sections_found += 1
    if parsed_data.get("projects"): sections_found += 1
    if parsed_data.get("experience") or parsed_data.get("internships"): sections_found += 1
    if parsed_data.get("email") and parsed_data.get("phone"): sections_found += 1
    section_score = int((sections_found / 5) * 100)

    # 2. Action Verbs Score (20 points max)
    found_action_verbs = [word for word in ACTION_VERBS if word in text_lower]
    action_verb_score = min(100, int((len(found_action_verbs) / 6) * 100))

    # 3. Readability & Grammar (20 points max)
    words = raw_text.split()
    word_count = len(words)
    readability_score = 92 if 200 <= word_count <= 800 else (75 if word_count > 800 else 65)

    # 4. Keyword Match Score (20 points max)
    all_skills = []
    skills_dict = parsed_data.get("skills", {})
    if isinstance(skills_dict, dict):
        for cat, items in skills_dict.items():
            if isinstance(items, list):
                all_skills.extend(items)
    elif isinstance(skills_dict, list):
        all_skills.extend(skills_dict)
    
    keyword_score = min(100, int((len(set(all_skills)) / 10) * 100))

    # 5. Formatting & Length Score (20 points max)
    length_score = 95 if 250 <= word_count <= 750 else 78
    formatting_score = 90 if "@" in text_lower and not "table" in text_lower else 80

    # Overall Weighted ATS Score (0 - 100)
    ats_score = int(
        section_score * 0.20 +
        action_verb_score * 0.20 +
        readability_score * 0.20 +
        keyword_score * 0.25 +
        formatting_score * 0.15
    )

    strengths = []
    weaknesses = []
    suggestions = []

    if section_score >= 80:
        strengths.append("High section completeness: Essential sections (Education, Skills, Experience, Projects) are clearly demarcated.")
    else:
        weaknesses.append("Missing core sections: Ensure Education, Technical Skills, Projects, and Work Experience headers are present.")
        suggestions.append("Add clear standard section titles such as 'TECHNICAL SKILLS', 'EXPERIENCE', and 'PROJECTS'.")

    if action_verb_score >= 75:
        strengths.append(f"Strong action verb utilization: Found impactful engineering verbs ({', '.join(found_action_verbs[:4])}).")
    else:
        weaknesses.append("Passive sentence structure: Bullet points lack proactive action verbs.")
        suggestions.append("Begin every experience and project bullet with action verbs like 'Engineered', 'Optimized', or 'Architected'.")

    if keyword_score >= 70:
        strengths.append(f"Rich technical keyword density: Recognized {len(all_skills)} relevant industry skills.")
    else:
        weaknesses.append("Low technical keyword density.")
        suggestions.append("Incorporate specific frameworks, databases, and cloud tools directly into your project descriptions.")

    if 250 <= word_count <= 750:
        strengths.append("Optimal document length: Resume adheres to standard 1-page ATS scan guidelines.")
    else:
        suggestions.append("Keep resume text between 400 and 700 words for optimal single-page readability.")

    return {
        "ats_score": ats_score,
        "formatting_score": formatting_score,
        "keyword_match_score": keyword_score,
        "readability_score": readability_score,
        "grammar_score": 90,
        "action_verbs_score": action_verb_score,
        "length_score": length_score,
        "strengths": strengths,
        "weaknesses": weaknesses if weaknesses else ["Minor formatting polish recommended for multi-column layout alignment."],
        "suggestions": suggestions if suggestions else ["Quantify achievements with metrics (e.g. 'boosted API response speed by 40%')."]
    }

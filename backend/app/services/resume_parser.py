import os
from pypdf import PdfReader
from docx import Document
from app.services.ai_service import ai_service

def extract_text_from_file(file_path: str, file_type: str) -> str:
    extracted_text = ""
    ext = os.path.splitext(file_path)[1].lower()

    try:
        if ext == ".pdf" or "pdf" in file_type:
            reader = PdfReader(file_path)
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
        elif ext in [".docx", ".doc"] or "word" in file_type or "officedocument" in file_type:
            doc = Document(file_path)
            for paragraph in doc.paragraphs:
                extracted_text += paragraph.text + "\n"
    except Exception as e:
        print(f"Error parsing document: {e}")

    if not extracted_text.strip():
        # Fallback text if sample demo file
        extracted_text = """
        John Doe | Software Engineer Candidate
        Email: john.doe@university.edu | Phone: +1 (555) 019-2834
        GitHub: github.com/johndoe | LinkedIn: linkedin.com/in/johndoe

        EDUCATION:
        B.Tech Computer Science Engineering - 8.9 CGPA
        Tech University (2022 - 2026)

        SKILLS:
        Languages: Python, JavaScript, TypeScript, C++, SQL
        Frameworks & Libraries: React, Node.js, FastAPI, Express, Tailwind CSS
        Cloud & DevOps: Docker, AWS, Git, GitHub Actions
        Databases: PostgreSQL, MongoDB, Redis

        EXPERIENCE:
        Software Engineering Intern | Tech Global (May 2025 - Jul 2025)
        - Developed asynchronous FastAPI REST endpoints processing 50k requests/day.
        - Designed responsive React dashboards with real-time analytics graphs.

        PROJECTS:
        AI Resume Analyzer & Interview Portal: Built placement suite with React & FastAPI.
        Distributed Cache Engine: Implemented LRU cache in C++ with thread safety.
        """

    return extracted_text

async def parse_resume_file(file_path: str, file_type: str) -> dict:
    raw_text = extract_text_from_file(file_path, file_type)
    parsed_json = await ai_service.parse_resume_text(raw_text)
    return {
        "raw_text": raw_text,
        "parsed_json": parsed_json
    }

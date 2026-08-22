# 🚀 Free Vercel & Free PostgreSQL Deployment Guide

This guide will walk you step-by-step through deploying the **AI-Powered Resume Analyzer & Placement Assistant** to **Vercel** completely **FOR FREE**.

---

## 📋 Prerequisites & Architecture Overview

- **Frontend**: React (Vite, Tailwind CSS, Framer Motion) compiled into static assets served on Vercel CDN.
- **Backend API**: Python FastAPI application running via **Vercel Serverless Functions**.
- **Database**: Free Cloud PostgreSQL database via **Neon.tech** or **Supabase.com** (Vercel serverless requires a cloud DB).
- **AI Engine**: Free **Google Gemini API** (via Google AI Studio) or **OpenAI API**, with built-in heuristic NLP fallback.

---

## Step 1: Create a Free PostgreSQL Database (2 Minutes)

Choose either **Neon** (Recommended) or **Supabase**:

### Option A: Neon.tech (Recommended)
1. Go to [https://neon.tech](https://neon.tech) and sign up for a **Free Account**.
2. Click **Create Project**, name it `ai-resume-analyzer`, and click **Create**.
3. Under **Connection Details**, select **Pooled connection** and copy your `DATABASE_URL`:
   ```env
   postgres://username:password@ep-cool-db.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Option B: Supabase.com
1. Go to [https://supabase.com](https://supabase.com) and create a **Free Account**.
2. Click **New Project**, choose a database password, and create the project.
3. Go to **Project Settings** -> **Database** -> **Connection String** (URI) and copy the URL.

---

## Step 2: Get a Free Google Gemini API Key (1 Minute)

1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. Copy your key (`AIzaSy...`).

---

## Step 3: Deploy to Vercel for Free

### Method A: Deploy via GitHub (Recommended)
1. Push this project repository to **GitHub**.
2. Log in to [https://vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to **Other** (or let Vercel auto-detect using `vercel.json`).
5. Expand **Environment Variables** and add the following:

| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` | Your Neon or Supabase PostgreSQL URI |
| `SECRET_KEY` | `super-secret-key-2026-xyz` | Secret key for JWT session tokens |
| `GEMINI_API_KEY` | `AIzaSy...` | Your Free Google Gemini API Key |
| `GEMINI_MODEL` | `gemini-1.5-flash` | Gemini model name |

6. Click **Deploy**. Vercel will build the frontend and serverless backend.

### Method B: Deploy via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command from the project root:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to link the project and deploy.
4. Set environment variables using CLI or from your Vercel Project Settings Dashboard.

---

## Step 4: Verify Deployment

Once deployed, Vercel will provide a live URL (e.g. `https://ai-resume-analyzer.vercel.app`).

1. Open your live app link in your browser.
2. Register a new user account (e.g. `user@test.com`).
3. Upload a PDF/DOCX resume to test parsing, ATS analysis, and AI recommendations.
4. Try out **Mock Technical Interviews** and **Skill Gap Analysis**.

---

## 🛠️ Local Development (Zero-Config SQLite)

To run locally without setting up cloud PostgreSQL:

1. **Backend**:
   ```bash
   cd backend
   .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

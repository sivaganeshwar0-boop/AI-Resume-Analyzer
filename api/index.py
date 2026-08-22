import sys
import os

# Add backend directory to python path for module imports
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(__file__)), "backend"))

from app.main import app

# Expose app for Vercel Serverless Functions
handler = app

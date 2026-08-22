import sys
import os

# Add root and backend directory to sys.path
root_dir = os.path.dirname(os.path.dirname(__file__))
backend_dir = os.path.join(root_dir, "backend")

if os.path.exists(backend_dir) and backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Fallback for Vercel lambda directory structure
local_backend = os.path.join(os.path.dirname(__file__), "backend")
if os.path.exists(local_backend) and local_backend not in sys.path:
    sys.path.insert(0, local_backend)

from app.main import app

handler = app

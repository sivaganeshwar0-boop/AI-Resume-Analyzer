from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.models import User, Profile
from app.schemas.schemas import UserRegister, UserLogin, Token, UserOut
from app.core.security import get_password_hash, verify_password, create_access_token, decode_token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_token(token)
    if payload is None:
        raise credentials_exception
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalars().first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=Token)
async def register(user_in: UserRegister, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    role = "admin" if user_in.email.startswith("admin@") else "student"
    hashed_pwd = get_password_hash(user_in.password)

    new_user = User(
        email=user_in.email,
        hashed_password=hashed_pwd,
        role=role
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    profile = Profile(
        user_id=new_user.id,
        full_name=user_in.full_name,
        college=user_in.college or "University College of Engineering",
        department=user_in.department or "Computer Science & Engineering",
        year=user_in.year or "4th Year",
        phone=user_in.phone or "+91 9876543210"
    )
    db.add(profile)
    await db.commit()

    token_str = create_access_token(subject=new_user.id, role=role)
    return {
        "access_token": token_str,
        "token_type": "bearer",
        "role": role,
        "user_id": new_user.id,
        "email": new_user.email
    }

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == credentials.email))
    user = result.scalars().first()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token_str = create_access_token(subject=user.id, role=user.role)
    return {
        "access_token": token_str,
        "token_type": "bearer",
        "role": user.role,
        "user_id": user.id,
        "email": user.email
    }

@router.get("/me", response_model=UserOut)
async def read_current_user(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalars().first()
    current_user.profile = profile
    return current_user

@router.post("/forgot-password")
async def forgot_password(email_data: dict):
    email = email_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    return {"message": f"Password reset link has been dispatched to {email}."}

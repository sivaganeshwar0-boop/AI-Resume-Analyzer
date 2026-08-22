from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.models.models import User, Profile, Project, Certificate
from app.schemas.schemas import ProfileOut, ProfileUpdate
from app.routers.auth import get_current_user

router = APIRouter(prefix="/profile", tags=["User Profile"])

@router.get("", response_model=ProfileOut)
async def get_user_profile(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalars().first()
    if not profile:
        profile = Profile(
            user_id=current_user.id,
            full_name=current_user.email.split("@")[0].title(),
            college="University College of Engineering",
            department="Computer Science & Engineering",
            year="4th Year",
            phone="+91 9876543210"
        )
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
    return profile

@router.put("", response_model=ProfileOut)
async def update_user_profile(
    profile_in: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalars().first()
    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)

    for field, val in profile_in.model_dump(exclude_unset=True).items():
        setattr(profile, field, val)

    await db.commit()
    await db.refresh(profile)
    return profile

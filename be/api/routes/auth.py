from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
import jwt
import uuid
from pydantic import BaseModel, EmailStr
from core.security import verify_password, create_access_token, create_refresh_token
from db.database import get_db
from db.models import User, TokenBlocklist
from core.config import settings
from api.dependencies import get_current_user

router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
def login(login_data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    access_token = create_access_token(
        subject=user.id, role=user.role.value, hospital_id=user.hospital_id
    )
    jti = str(uuid.uuid4())
    refresh_token = create_refresh_token(subject=user.id, jti=jti)

    # Set httponly secure samesite cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True, 
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    )
    
    from services.audit import append_audit_event
    append_audit_event(
        db,
        actor_id=user.id,
        entity_type="USER",
        entity_id=str(user.id),
        action="LOGIN",
        payload={"email": user.email}
    )
    db.commit()
    
    return {"message": "Successfully logged in", "role": user.role.value}

@router.post("/refresh")
def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token")

    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        jti = payload.get("jti")
        token_type = payload.get("type")
        if token_type != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    # Check if refresh token is in blocklist
    is_revoked = db.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).first()
    if is_revoked:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token has been revoked")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive")

    # Revoke old refresh token (rotate)
    db.add(TokenBlocklist(jti=jti))
    db.commit()

    # Issue new tokens
    access_token = create_access_token(
        subject=user.id, role=user.role.value, hospital_id=user.hospital_id
    )
    new_jti = str(uuid.uuid4())
    new_refresh_token = create_refresh_token(subject=user.id, jti=new_jti)

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    )
    
    return {"message": "Tokens refreshed successfully"}

@router.post("/logout")
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token:
        try:
            payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            jti = payload.get("jti")
            if jti:
                # Add to blocklist
                is_revoked = db.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).first()
                if not is_revoked:
                    db.add(TokenBlocklist(jti=jti))
                    db.commit()
        except jwt.PyJWTError:
            pass # ignore invalid tokens during logout
            
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Successfully logged out"}

@router.get("/me")
def get_me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role.value,
        "hospital_id": user.hospital_id
    }

import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "CyberShield AI"
    # PostgreSQL connection string from docker-compose
    DATABASE_URL: str = os.getenv("POSTGRES_URL", "postgresql://user:password@localhost:5432/cybershield")
    
    # JWT Config
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-for-development-only")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()

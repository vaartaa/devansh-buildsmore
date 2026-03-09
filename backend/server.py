from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, model_validator
from typing import List, Optional
import uuid
import asyncio
import smtplib
from email.message import EmailMessage
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactLeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(default=None, min_length=7, max_length=20)
    interest_area: Optional[str] = Field(default=None, max_length=120)
    project_type: Optional[str] = Field(default=None, max_length=120)
    budget_range: Optional[str] = Field(default=None, max_length=120)
    plot_area: Optional[str] = Field(default=None, max_length=120)
    preferred_start_date: Optional[str] = Field(default=None, max_length=60)
    city_location: Optional[str] = Field(default=None, max_length=120)
    message: Optional[str] = Field(default=None, max_length=2000)

    @model_validator(mode="after")
    def validate_contact_method(self):
        if not self.email and not self.phone:
            raise ValueError("Please provide at least one contact method: email or phone")
        return self


class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    interest_area: Optional[str] = None
    project_type: Optional[str] = None
    budget_range: Optional[str] = None
    plot_area: Optional[str] = None
    preferred_start_date: Optional[str] = None
    city_location: Optional[str] = None
    message: Optional[str] = None
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactLeadResponse(BaseModel):
    id: str
    message: str
    submitted_at: datetime


def _get_smtp_credentials():
    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_APP_PASSWORD")

    if not smtp_email or not smtp_password:
        raise RuntimeError(
            "SMTP_EMAIL and SMTP_APP_PASSWORD are required in backend/.env for Gmail delivery"
        )

    return smtp_email, smtp_password


def send_contact_email(payload: ContactLeadCreate):
    smtp_email, smtp_password = _get_smtp_credentials()

    email_body = (
        "New website enquiry received for Devansh Buildsmore\n\n"
        f"Name: {payload.name}\n"
        f"Phone: {payload.phone or 'Not provided'}\n"
        f"Email: {payload.email or 'Not provided'}\n"
        f"Interest Area: {payload.interest_area or 'Not provided'}\n"
        f"Project Type: {payload.project_type or 'Not provided'}\n"
        f"Budget Range: {payload.budget_range or 'Not provided'}\n"
        f"Plot/Area: {payload.plot_area or 'Not provided'}\n"
        f"Preferred Start Date: {payload.preferred_start_date or 'Not provided'}\n"
        f"City/Location: {payload.city_location or 'Not provided'}\n\n"
        f"Message:\n{payload.message or 'No message added'}"
    )

    msg = EmailMessage()
    msg["Subject"] = f"New Enquiry - Devansh Buildsmore ({payload.project_type or 'General'})"
    msg["From"] = smtp_email
    msg["To"] = "vvishal.infosys@gmail.com"
    msg.set_content(email_body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(smtp_email, smtp_password)
        server.send_message(msg)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/contact", response_model=ContactLeadResponse)
async def submit_contact_lead(input: ContactLeadCreate):
    contact_payload = ContactLead(**input.model_dump())

    try:
        await asyncio.to_thread(send_contact_email, input)
    except RuntimeError as config_error:
        logger.error("SMTP configuration error: %s", config_error)
        raise HTTPException(status_code=500, detail=str(config_error))
    except Exception:
        logger.exception("Failed to send contact email")
        raise HTTPException(
            status_code=502,
            detail="Unable to send enquiry email right now. Please try again shortly.",
        )

    contact_doc = contact_payload.model_dump()
    contact_doc["submitted_at"] = contact_doc["submitted_at"].isoformat()
    await db.contact_leads.insert_one(contact_doc)

    return ContactLeadResponse(
        id=contact_payload.id,
        message="Your enquiry has been sent successfully. Our team will contact you soon.",
        submitted_at=contact_payload.submitted_at,
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
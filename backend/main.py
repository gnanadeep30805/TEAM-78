from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth.otp import router as otp_router
from agents.agent_router import router as agent_router
from appointments.router import router as appointment_router

app = FastAPI(
    title="Doctorly AI",
    description=(
        "Doctorly AI is an AI-powered clinical decision support system "
        "designed for preliminary medical reasoning, education, and "
        "teleconsultation workflows. "
        "It does NOT provide medical diagnosis or treatment."
    ),
    version="1.1.0",   # 🔼 UPDATED VERSION
    docs_url="/docs",
    redoc_url="/redoc"
)

# -------------------- CORS CONFIG --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Hackathon-safe (restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- API ROUTERS --------------------
app.include_router(otp_router, prefix="/auth", tags=["Authentication"])
app.include_router(agent_router, prefix="/agent", tags=["Doctorly AI"])
app.include_router(appointment_router, prefix="/appointment", tags=["Appointments"])

# -------------------- ROOT ENDPOINT --------------------
@app.get("/")
def root():
    return {
        "app": "Doctorly AI",
        "status": "Backend Running",
        "version": "1.1.0",
        "usage": "Educational & Clinical Decision Support",
        "warning": "Not a medical diagnosis system"
    }

# -------------------- GLOBAL DISCLAIMER --------------------
DISCLAIMER = (
    "Doctorly AI is an educational clinical decision support system. "
    "It does NOT provide diagnosis, prescriptions, or treatment. "
    "Always consult a qualified medical professional."
)

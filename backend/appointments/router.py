from fastapi import APIRouter
import uuid

router = APIRouter()

# ---------------- DOCTORS DATA ----------------
doctors = [
    {
        "id": "doc1",
        "name": "Dr. Ramesh Kumar",
        "specialist": "Cardiologist",
        "status": "active"
    },
    {
        "id": "doc2",
        "name": "Dr. Sita Devi",
        "specialist": "Dermatologist",
        "status": "busy"
    },
    {
        "id": "doc3",
        "name": "Dr. Arjun Rao",
        "specialist": "Neurologist",
        "status": "active"
    },
    {
        "id": "doc4",
        "name": "Dr. Meena Sharma",
        "specialist": "Gynecologist",
        "status": "offline"
    },
    {
        "id": "doc5",
        "name": "Dr. Anil Verma",
        "specialist": "Orthopedic",
        "status": "active"
    },
    {
        "id": "doc6",
        "name": "Dr. Priya Singh",
        "specialist": "General Physician",
        "status": "busy"
    }
]

# ---------------- ROUTES ----------------
@router.get("/doctors")
def get_doctors():
    return doctors

@router.post("/request")
def request_appointment(doctor_id: str):
    room_id = str(uuid.uuid4())
    return {
        "request_id": str(uuid.uuid4()),
        "room_id": room_id
    }

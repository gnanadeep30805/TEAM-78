from fastapi import APIRouter
import uuid

router = APIRouter()

# In-memory stores (hackathon safe)
doctors = {}
appointments = {}

# -------------------- DOCTOR GO ONLINE --------------------
@router.post("/go-online")
def go_online(
    doctor_id: str,
    name: str,
    specialist: str
):
    doctors[doctor_id] = {
        "id": doctor_id,
        "name": name,
        "specialist": specialist,
        "available": True
    }
    return {"status": "online"}

# -------------------- DOCTOR GO OFFLINE --------------------
@router.post("/go-offline")
def go_offline(doctor_id: str):
    if doctor_id in doctors:
        doctors[doctor_id]["available"] = False
    return {"status": "offline"}

# -------------------- LIST AVAILABLE DOCTORS --------------------
@router.get("/doctors")
def get_available_doctors():
    return {
        "doctors": [
            doc
            for doc in doctors.values()
            if doc["available"]
        ]
    }

# -------------------- REQUEST APPOINTMENT --------------------
@router.post("/request")
def request_appointment(doctor_id: str):
    if doctor_id not in doctors or not doctors[doctor_id]["available"]:
        return {"error": "Doctor not available"}

    request_id = str(uuid.uuid4())

    appointments[request_id] = {
        "doctor_id": doctor_id,
        "status": "pending"
    }

    return {
        "request_id": request_id,
        "status": "pending"
    }

# -------------------- DOCTOR ACCEPT APPOINTMENT --------------------
@router.post("/accept")
def accept_appointment(request_id: str):
    if request_id not in appointments:
        return {"error": "Invalid request"}

    appointments[request_id]["status"] = "accepted"
    room_id = str(uuid.uuid4())

    appointments[request_id]["room_id"] = room_id

    return {
        "status": "accepted",
        "room_id": room_id
    }

# -------------------- CHECK APPOINTMENT STATUS --------------------
@router.get("/status")
def appointment_status(request_id: str):
    if request_id not in appointments:
        return {"status": "invalid"}

    return appointments[request_id]

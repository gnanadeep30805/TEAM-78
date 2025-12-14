from fastapi import APIRouter
import random

router = APIRouter()

# In-memory OTP store (demo purpose)
otp_store = {}

@router.post("/send-otp")
def send_otp(user_id: str):
    otp = random.randint(100000, 999999)
    otp_store[user_id] = otp

    # DEMO ONLY: print OTP in backend terminal
    print(f"[OTP] {user_id} -> {otp}")

    return {"status": "otp_sent"}

@router.post("/verify-otp")
def verify_otp(user_id: str, otp: int):
    if otp_store.get(user_id) == otp:
        return {"status": "success"}
    return {"status": "failed"}

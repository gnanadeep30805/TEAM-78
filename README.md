# Doctorly AI – Smart Tele-Consultation Platform

Doctorly AI is a full-stack web application that combines  
AI-powered clinical assistance, secure OTP authentication, and  
real-time video consultation between patients, doctors, and students.

Disclaimer: Doctorly AI is a clinical decision support and educational system.  
It does NOT provide medical diagnosis or prescriptions.

---

## Features

### Authentication
- OTP-based login (Mobile / Email)
- Supported roles:
  - Patient
  - Doctor
  - Student
- Session persistence using local storage

---

### AI Clinical Assistant
- Symptom analysis using rule-based and AI-assisted logic
- Doctor support suggestions
- Medical learning assistance
- Structured and safe responses
- Always advises consulting a qualified medical professional

---

### Doctor Discovery and Availability
- List of available doctors
- Doctor status:
  - Online
  - Busy
  - Offline
- Medical specialty information displayed

---

### Appointment Workflow
1. Patient or student selects a doctor
2. Appointment request is sent
3. Doctor accepts the request
4. Secure video consultation session begins

---

### Video Consultation
- Live camera and microphone access
- Mute and unmute functionality
- End session safely
- AI doctor avatar for demonstration
- Automatic camera shutdown after session
- Redirects back to dashboard after call ends

---

## Technology Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- WebRTC (getUserMedia)
- Inline CSS styling

### Backend
- FastAPI (Python)
- Uvicorn ASGI server
- CORS middleware
- In-memory data storage for OTP and appointments
- Rule-based AI logic for hackathon use

---

## Project Structure


import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function DoctorList({ userId, role }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(`${API}/doctor/available`).then(res => {
      setDoctors(res.data);
    });
  }, []);

  const requestAppointment = async (doctorId) => {
    const res = await axios.post(`${API}/appointment/request`, {
      patient_id: userId,
      doctor_id: doctorId,
      role
    });

    alert(`Request sent. ID: ${res.data.request_id}`);
  };

  return (
    <div>
      <h3>Available Doctors</h3>
      {doctors.map(d => (
        <div key={d.doctor_id}>
          👨‍⚕️ {d.doctor_id} – {d.specialty}
          <button onClick={() => requestAppointment(d.doctor_id)}>
            Request Call
          </button>
        </div>
      ))}
    </div>
  );
}

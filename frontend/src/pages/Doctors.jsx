import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/appointment/doctors`)
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const startVideoConsultation = async (doctorId) => {
    try {
      const res = await axios.post(
        `${API}/appointment/request?doctor_id=${doctorId}`
      );
      navigate(`/call/${res.data.room_id}`);
    } catch  {
      alert("Failed to start video consultation");
    }
  };

  return (
    <div style={styles.container}>
      {/* BACK BUTTON */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
          ← Back
        </button>
        <h2>Available Doctors</h2>
      </div>

      {doctors.map((doc) => (
        <div key={doc.id} style={styles.card}>
          <h3>{doc.name}</h3>
          <p><b>Specialist:</b> {doc.specialist}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  doc.status === "active"
                    ? "lightgreen"
                    : doc.status === "busy"
                    ? "orange"
                    : "red"
              }}
            >
              {doc.status.toUpperCase()}
            </span>
          </p>

          {doc.status === "active" ? (
            <button
              style={styles.videoBtn}
              onClick={() => startVideoConsultation(doc.id)}
            >
              📹 Video Consultation
            </button>
          ) : (
            <button disabled style={styles.disabledBtn}>
              {doc.status === "busy" ? "Doctor Busy" : "Doctor Offline"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    padding: 20,
    background: "#0f172a",
    minHeight: "100vh",
    color: "white"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px"
  },
  backBtn: {
    background: "#020617",
    color: "white",
    border: "1px solid #334155",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "6px"
  },
  card: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "12px"
  },
  videoBtn: {
    marginTop: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  disabledBtn: {
    marginTop: "10px",
    background: "#334155",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "not-allowed"
  }
};

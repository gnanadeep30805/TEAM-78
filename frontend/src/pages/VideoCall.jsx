import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);

  const { roomId } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // Patient / Doctor / Student
  const [muted, setMuted] = useState(false);

  /* ---------------- MEDIA SETUP ---------------- */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch(() => alert("Camera / Microphone permission denied"));

    // ✅ FULL CLEANUP (CAMERA OFF GUARANTEED)
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (localVideoRef.current) {
  localVideoRef.current.srcObject = null;
}
    };
  }, []);

  /* ---------------- MUTE TOGGLE ---------------- */
  const toggleMute = () => {
    if (!streamRef.current) return;

    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setMuted((prev) => !prev);
  };

  /* ---------------- END SESSION ---------------- */
  const endSession = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    navigate("/dashboard"); // back to dashboard
  };

  return (
    <div style={styles.container}>
      <h2>Doctorly – Video Consultation</h2>

      <p style={styles.meta}><b>Role:</b> {role}</p>
      <p style={styles.meta}><b>Room ID:</b> {roomId}</p>

      <div style={styles.videoGrid}>
        {/* YOUR VIDEO */}
        <div>
          <p style={styles.label}>You</p>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={styles.video}
          />
        </div>

        {/* AI DOCTOR / PATIENT AVATAR */}
        <div style={styles.avatarBox}>
          <p style={styles.label}>
            {role === "Doctor" ? "Patient" : "AI Doctor"}
          </p>

          <img
            src={
              role === "Doctor"
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=patient&top=shortHair"
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=ai-doctor&accessories=round&clothing=medical"
            }
            alt="AI Doctor"
            style={styles.avatar}
          />

          <p style={styles.avatarText}>
            {role === "Doctor"
              ? "Patient Connected"
              : "AI Doctor Online"}
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <button onClick={toggleMute} style={styles.controlBtn}>
          {muted ? "🔇 Unmute" : "🎤 Mute"}
        </button>

        <button
          onClick={endSession}
          style={{ ...styles.controlBtn, background: "#dc2626" }}
        >
          ❌ End Session
        </button>
      </div>

      <p style={styles.note}>
        🔒 Secure AI-assisted teleconsultation (Hackathon Demo)
      </p>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    padding: 20,
    background: "#0f172a",
    color: "white",
    minHeight: "100vh"
  },
  videoGrid: {
    display: "flex",
    gap: "25px",
    marginTop: "20px",
    flexWrap: "wrap"
  },
  video: {
    width: "320px",
    borderRadius: "10px",
    border: "2px solid #334155",
    background: "black"
  },
  avatarBox: {
    width: "320px",
    borderRadius: "10px",
    border: "2px dashed #334155",
    padding: "20px",
    textAlign: "center",
    background: "#020617"
  },
  avatar: {
    width: "150px",
    height: "150px",
    marginTop: "10px",
    borderRadius: "10px"
  },
  avatarText: {
    marginTop: "10px",
    opacity: 0.7
  },
  label: {
    textAlign: "center",
    marginBottom: "5px",
    opacity: 0.8
  },
  meta: {
    opacity: 0.7
  },
  controls: {
    marginTop: "25px",
    display: "flex",
    gap: "15px"
  },
  controlBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "14px"
  },
  note: {
    marginTop: "15px",
    fontSize: "13px",
    opacity: 0.6
  }
};

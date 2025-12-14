import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("Patient");
  const [id, setId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!id.trim()) {
      setError("Enter Mobile / Email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${API}/auth/send-otp?user_id=${id.trim()}`);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      setError("Enter OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API}/auth/verify-otp?user_id=${id.trim()}&otp=${otp.trim()}`
      );

      if (res.data.status === "success") {
        localStorage.setItem("role", role); // persist login
        onLogin(role);                     // go to dashboard
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Doctorly AI</h1>
      <p>Secure OTP Login</p>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Patient</option>
        <option>Doctor</option>
        <option>Student</option>
      </select>

      <input
        placeholder={role === "Patient" ? "Mobile Number" : "Email"}
        value={id}
        onChange={(e) => setId(e.target.value)}
        disabled={step === 2}
      />

      {step === 2 && (
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}

      {step === 1 ? (
        <button onClick={sendOtp} disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <button onClick={verifyOtp} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    background: "#0f172a",
    color: "white",
  },
};

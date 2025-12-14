import axios from "axios";
import { useEffect } from "react";

const API = "http://127.0.0.1:8000";

export default function AppointmentStatus({ requestId }) {
  useEffect(() => {
    if (!requestId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${API}/appointment/status?request_id=${requestId}`
        );

        if (res.data.status === "accepted") {
          clearInterval(interval);
          window.location.href = `/call/${res.data.room_id}`;
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [requestId]); // ✅ dependency added

  return <p>⏳ Waiting for doctor to accept…</p>;
}

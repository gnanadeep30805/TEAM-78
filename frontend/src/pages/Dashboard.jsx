import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";

export default function Dashboard({ role, onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <div style={header}>
        <h3>Logged in as: {role}</h3>

        <div>
          <button onClick={() => navigate("/doctors")} style={btn}>
            Doctors
          </button>

          <button onClick={onLogout} style={logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <ChatWindow />
    </div>
  );
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px"
};

const btn = {
  marginRight: "10px",
  padding: "6px 12px"
};

const logoutBtn = {
  padding: "6px 12px",
  background: "#dc2626",
  color: "white",
  border: "none",
  cursor: "pointer"
};

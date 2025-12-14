import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Waiting from "./pages/Waiting";
import VideoCall from "./pages/VideoCall";

export default function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    localStorage.setItem("role", userRole);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/"
          element={
            role ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            role ? (
              <Dashboard role={role} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* DOCTORS */}
        <Route
          path="/doctors"
          element={role ? <Doctors /> : <Navigate to="/" />}
        />

        {/* WAITING */}
        <Route
          path="/waiting/:requestId"
          element={role ? <Waiting /> : <Navigate to="/" />}
        />

        {/* VIDEO CALL */}
        <Route
          path="/call/:roomId"
          element={role ? <VideoCall /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

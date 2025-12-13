const roleSelect = document.getElementById("role");
const passwordField = document.getElementById("password");
const otpField = document.getElementById("otp");

roleSelect.addEventListener("change", () => {
  if (roleSelect.value === "patient") {
    passwordField.style.display = "block";
    otpField.style.display = "none";
  } else {
    passwordField.style.display = "none";
    otpField.style.display = "block";
  }
});

async function handleLogin() {
  const role = roleSelect.value;
  const email = document.getElementById("email").value;
  const password = passwordField.value;
  const otp = otpField.value;

  if (!role || !email) {
    alert("Please fill all required fields");
    return;
  }

  if (role === "patient") {
    const res = await fetch("http://localhost:5000/api/auth/patient/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboards/patient-dashboard.html";
    } else {
      alert(data.error);
    }

  } else {
    if (!otp) {
      await fetch("http://localhost:5000/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      alert("OTP sent to your email");
    } else {
      const res = await fetch("http://localhost:5000/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = `dashboards/${role}-dashboard.html`;
      } else {
        alert("Invalid OTP");
      }
    }
  }
}

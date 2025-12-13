async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  const res = await fetch("http://localhost:5000/api/auth/patient/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (data.success) {
    alert("Signup successful. Please login.");
    window.location.href = "login.html";
  } else {
    alert(data.error);
  }
}

if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function send() {
  alert("AI response generated (AI backend next)");
}

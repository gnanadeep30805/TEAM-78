if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function approve() {
  alert("Appointment approved (backend integration next)");
}

if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function book() {
  alert("Appointment booked (backend integration next)");
}

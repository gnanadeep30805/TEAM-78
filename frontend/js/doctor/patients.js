if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function view() {
  alert("Patient details loaded (backend integration next)");
}

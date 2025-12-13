if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function openReport() {
  alert("Opening report (PDF viewer next)");
}

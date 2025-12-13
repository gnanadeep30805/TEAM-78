if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function upload() {
  alert("Report uploaded (DB + file storage next)");
}

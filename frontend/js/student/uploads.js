if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function upload() {
  alert("File uploaded (backend integration next)");
}

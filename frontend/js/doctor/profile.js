if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function save() {
  alert("Profile updated (backend integration next)");
}

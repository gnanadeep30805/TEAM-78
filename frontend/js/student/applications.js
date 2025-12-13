if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function apply() {
  alert("Application submitted (DB integration next)");
}

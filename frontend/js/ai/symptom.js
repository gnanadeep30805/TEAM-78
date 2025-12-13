if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function check() {
  document.getElementById("result").style.display = "block";
  alert("AI diagnosis generated (ML backend next)");
}

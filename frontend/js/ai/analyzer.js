if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function analyze() {
  document.getElementById("summary").style.display = "block";
  alert("AI report summary generated");
}

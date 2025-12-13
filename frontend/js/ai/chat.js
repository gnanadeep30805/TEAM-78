if (!localStorage.getItem("token")) {
  window.location.href = "../login.html";
}

function send() {
  const box = document.getElementById("chatBox");
  const msg = document.getElementById("msg").value;

  if (!msg) return;

  box.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
  box.innerHTML += `<p><strong>AI:</strong> Response generated</p>`;
  document.getElementById("msg").value = "";
}

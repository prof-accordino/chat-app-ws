const socket = new WebSocket("ws://localhost:3000");

function sendMessage(e) {
  e.preventDefault();
  const inputEl = document.querySelector(".input");
  if (inputEl.value) {
    socket.send(inputEl.value);
    inputEl.value = "";
  }
  inputEl.focus();
}

document.querySelector(".form").addEventListener("submit", sendMessage);

socket.addEventListener("message", ({ data }) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector(".list").appendChild(li);
});

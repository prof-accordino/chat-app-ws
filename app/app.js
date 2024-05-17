const socket = io("ws://localhost:3500");

function sendMessage(e) {
  e.preventDefault();
  const inputEl = document.querySelector(".input");
  if (inputEl.value) {
    socket.emit("message", inputEl.value);
    inputEl.value = "";
  }
  inputEl.focus();
}

document.querySelector(".form").addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector(".list").appendChild(li);
});

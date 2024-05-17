const socket = io("ws://localhost:3500");

const activityEl = document.querySelector(".activity");
const msgInputEl = document.querySelector(".msg-input");

function sendMessage(e) {
  e.preventDefault();
  if (msgInputEl.value) {
    socket.emit("message", msgInputEl.value);
    msgInputEl.value = "";
  }
  msgInputEl.focus();
}

document.querySelector(".form").addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  activityEl.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector(".list").appendChild(li);
});

msgInputEl.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer;
socket.on("activity", (name) => {
  activityEl.textContent = `${name} is typing...`;
  clearTimeout = setTimeout(() => {
    activityEl.textContent = "";
  }, 3000);
});

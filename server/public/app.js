const socket = io("https://chat-app-2x9h.onrender.com:10000");

// ********************
// CHAT SYSTEM
const nameInputEl = document.querySelector("#name");
const roomInputEl = document.querySelector("#room");
const msgInputEl = document.querySelector("#message");
const chatDisplayEl = document.querySelector(".chat-display");
const usersListEl = document.querySelector(".users-list");
const roomListEl = document.querySelector(".room-list");
const activityEl = document.querySelector(".activity");

function sendMessage(e) {
  e.preventDefault();
  if (nameInputEl.value && roomInputEl.value && msgInputEl.value) {
    socket.emit("message", {
      name: nameInputEl.value,
      text: msgInputEl.value,
    });
    msgInputEl.value = "";
  }
  msgInputEl.focus();
}

function enterRoom(e) {
  e.preventDefault();
  if (nameInputEl.value && roomInputEl.value) {
    socket.emit("enterRoom", {
      name: nameInputEl.value,
      room: roomInputEl.value,
    });
  }
}

document.querySelector(".msg-form").addEventListener("submit", sendMessage);

document.querySelector(".join-form").addEventListener("submit", enterRoom);

msgInputEl.addEventListener("keypress", () => {
  socket.emit("activity", nameInputEl.value);
});

socket.on("message", (data) => {
  activityEl.textContent = "";
  const { name, text, time } = data;
  const li = document.createElement("li");
  li.className = "post";
  if (name !== nameInputEl.value && name !== "Admin")
    li.className = "post post--left";
  if (name === nameInputEl.value && name !== "Admin")
    li.className = "post post--right";
  if (name !== "Admin") {
    li.innerHTML = `<div class="post__header ${
      name === nameInputEl.value ? "post__header--user" : "post__header--reply"
    }">
    <span class="post__header--name">${name}</span>
    <span class="post__header--time">${time}</span>
    </div>
    <div class="post__text">${text}</div>
    `;
  } else {
    li.innerHTML = `<div class="post__text post__text--admin">${text}</div>`;
  }
  chatDisplayEl.appendChild(li);

  chatDisplayEl.scrollTop = chatDisplayEl.scrollHeight;
});

let activityTimer;
socket.on("activity", (name) => {
  activityEl.textContent = `${name} is typing...`;
  // Clear after 3 seconds
  clearTimeout = setTimeout(() => {
    activityEl.textContent = "";
  }, 3000);
});

socket.on("userList", ({ users }) => {
  showUsers(users);
});

socket.on("roomList", ({ rooms }) => {
  showRooms(rooms);
});

function showUsers(users) {
  usersListEl.textContent = "";
  if (users) {
    document.querySelector("#list-title-user").innerHTML = `
    Users in ${roomInputEl.value}:
    `;
    users.forEach((user) => {
      usersListEl.innerHTML += `<li class="users-list--users">
      <span>${user.name.charAt(0).toUpperCase()}</span>${user.name}</li>`;
    });
  }
}

function showRooms(rooms) {
  roomListEl.textContent = "";
  if (rooms) {
    rooms.forEach((room) => {
      roomListEl.innerHTML += `<li><button onclick="setRoomName(this)">${room}</button></li>`;
    });
  }
}

// ********************
// HELP FUNCTIONS

// Automatically write the room name
function setRoomName(el) {
  roomInputEl.value = el.textContent;
}

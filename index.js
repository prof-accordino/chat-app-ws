import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const ADMIN = "Administrator-of-the-chat";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port: ${PORT}`);
});

const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

// ********************
// HELP FUNCTIONS
// ********************

// Get a random color for the user
function getRandomColor() {
  const colors = [
    "rgba(255, 87, 51, 0.5)", // Vivace Red
    "rgba(51, 255, 87, 0.5)", // Vivace Green
    "rgba(51, 87, 255, 0.5)", // Vivace Blue
    "rgba(255, 107, 181, 0.5)", // Vivace Pink
    "rgba(31, 143, 242, 0.5)", // Vivace Aqua
    "rgba(255, 51, 240, 0.5)", // Vivace Magenta
    "rgba(255, 140, 51, 0.5)", // Vivace Orange
    "rgba(140, 51, 255, 0.5)", // Vivace Purple
    "rgba(255, 215, 0, 0.5)", // Vivace Gold
    "rgba(0, 255, 0, 0.5)", // Vivace Lime
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const io = new Server(expressServer, {
  cors: {
    origin: true, // Permette richieste da qualsiasi origine
    methods: ["GET", "POST"], // Puoi specificare i metodi HTTP consentiti
    allowedHeaders: ["Authorization"], // Puoi specificare gli headers consentiti
  },
});

io.on("connection", (socket) => {
  // Upon connection - only to user
  console.log(`User ${socket.id} connected with IP address ${socket.handshake.address}`);
  socket.emit("message", buildMsg(ADMIN, "Welcome to Chat App"));

  io.emit("roomList", {
    rooms: getAllActiveRooms(),
  });

  socket.on("enterRoom", ({ name, room }) => {
    //leave previous room
    const prevRoom = getUser(socket.id)?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit(
        "message",
        buildMsg(ADMIN, `${name} has left the room`)
      );
    }

    const user = activateUser(socket.id, name, room);

    // Cannot update previous room users list until after the state update in activate user
    if (prevRoom) {
      io.to(prevRoom).emit("userList", {
        users: getUsersInRoom(prevRoom),
      });
    }

    // Join room
    socket.join(user.room);

    // To user who joined
    socket.emit(
      "message",
      buildMsg(ADMIN, `You have joined the ${user.room} chat room`)
    );

    // To everyone else
    socket.broadcast
      .to(user.room)
      .emit("message", buildMsg(ADMIN, `${user.name} has joined the room`));

    // Update user list for room
    io.to(user.room).emit("userList", {
      users: getUsersInRoom(user.room),
    });

    // Update rooms list for everyone
    io.emit("roomList", {
      rooms: getAllActiveRooms(),
    });
  });

  // When user disconnect - to all others
  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    userLeavesApp(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        buildMsg(ADMIN, `${user.name} has left the room`)
      );

      io.to(user.room).emit("userList", {
        user: getUsersInRoom(user.room),
      });

      io.emit("roomList", {
        rooms: getAllActiveRooms(),
      });
    }

    console.log(`User ${socket.id} disconnected`);
  });

  // Listening for a message event
  socket.on("message", ({ name, text }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit("message", buildMsg(name, text));
    }
  });

  // Listen for a activity
  socket.on("activity", (name) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit("activity", name);
    }
  });
});

function buildMsg(name, text) {
  const user = getUserByName(name);
  const timeZone = "Europe/Rome";
  return {
    name,
    text,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone,
    }).format(new Date()),
    color: user ? user.color || null : null,
  };
}

//Users functions
function activateUser(id, name, room) {
  const color = getRandomColor();
  const user = { id, name, room, color };
  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    user,
  ]);
  return user;
}

function userLeavesApp(id) {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
}

function getUser(id) {
  return UsersState.users.find((user) => user.id === id);
}

function getUserByName(name) {
  return UsersState.users.find((user) => user.name === name);
}

function getUsersInRoom(room) {
  return UsersState.users.filter((user) => user.room === room);
}

function getAllActiveRooms() {
  return Array.from(new Set(UsersState.users.map((user) => user.room)));
}

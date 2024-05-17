import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const io = new Server(expressServer, {
  // CORS: ( Cross-Origin Resource Sharing ), It's a security feature implemented by web browsers that restricts web applications hosted on one domain from making requests to another domain.
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["htpp//localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Upon connection - only to a user
  socket.emit("message", "Welcome to the Chat App");

  // Upon connection - to all others
  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} connected`
  );

  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });

  // When user disconnect - to all others
  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} disconnected`
  );

  // Listen for a activity
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});

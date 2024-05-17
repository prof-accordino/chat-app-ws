import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
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
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});

httpServer.listen(3500, () => console.log("listening on port 3500"));

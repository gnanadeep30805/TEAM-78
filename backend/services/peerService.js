import { Server } from "socket.io";

export const setupPeerService = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", socket.id);
    });

    socket.on("offer", (data) => {
      socket.to(data.room).emit("offer", { sdp: data.sdp, sender: data.sender });
    });

    socket.on("answer", (data) => {
      socket.to(data.room).emit("answer", { sdp: data.sdp, sender: data.sender });
    });

    socket.on("ice-candidate", (data) => {
      socket.to(data.room).emit("ice-candidate", { candidate: data.candidate, sender: data.sender });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

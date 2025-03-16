const socketIo = require("socket.io");

let io;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    socket.on('join', (userEmail) => {
      socket.join(userEmail);
      console.log(`User ${socket.id} joined room ${userEmail}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

module.exports = { initSocket, getIo };

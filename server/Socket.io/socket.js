import dotenv from 'dotenv';
dotenv.config();
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

// Map to store userId -> [socketId, socketId, ...]
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  // Add this socket to user's list
  if (userSocketMap[userId]) {
    userSocketMap[userId].push(socket.id);
  } else {
    userSocketMap[userId] = [socket.id];
  }

  // console.log("Online users:", Object.keys(userSocketMap));

  // Emit updated online users to all clients
  io.emit("onlineUser", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    if (userSocketMap[userId]) {
      // Remove disconnected socket
      userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);

      // If no sockets left for user, remove user from map
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }

    // console.log("Online users after disconnect:", Object.keys(userSocketMap));
    io.emit("onlineUser", Object.keys(userSocketMap));
  });
});

const getSocketId =(userId)=>{
  return userSocketMap[userId]
}

export { io, app, server,getSocketId };

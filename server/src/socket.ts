/* eslint-disable @typescript-eslint/no-explicit-any */

import { Server as SocketIoServer } from "socket.io";

export function setupSocket(server: any) {
  const io = new SocketIoServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Socket.IO logic
  io.on("connection", (socket) => {
    //
    socket.on("setup", (userData) => {
      socket.join(userData?.userId);
      socket.emit("connected");
    });
    //
    socket.on("join chat", (room) => {
      socket.join(room);
    });

    // socket typing
    socket.on("typing", (room: any) => {
      socket.in(room).emit("typing");
    });
    socket.on("stop typing", (room: any) => {
      socket.in(room).emit("stop typing");
    });

    // for new message received
    socket.on("new message", (newMessageReceived) => {
      const participants = newMessageReceived?.data?.conversation?.perticipants;

      if (!participants?.length) return console.log("Chat.users not defined");
      else {
        participants?.forEach((user: any) => {
          if (user?.userId === newMessageReceived?.data?.senderId) return;
          socket.in(user?.userId).emit("message received", newMessageReceived);
        });
      }
      //
    });
  });
}

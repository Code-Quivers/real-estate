/* eslint-disable @typescript-eslint/no-explicit-any */
// socket.ts

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
    console.log(`Socket ${socket.id} connected`);

    //
    socket.on("setup", (userData) => {
      socket.join(userData?.userId);
      console.log(userData);
      socket.emit("connected");
    });
    //
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room:", +room);
    });
  });
}

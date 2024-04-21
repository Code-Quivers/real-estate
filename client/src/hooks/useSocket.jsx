import { getUserInfo } from "@/hooks/services/auth.service";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const myDetails = getUserInfo();

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Create a new socket instance
    const newSocket = io(ENDPOINT);

    // Emit the "setup" event with myDetails
    newSocket.emit("setup", myDetails);

    // Listen for "connected" event from the server
    newSocket.on("connected", () => setSocketConnected(true));

    // Set the socket state
    setSocket(newSocket);

    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [ENDPOINT, myDetails]);

  return socket;
};

export default useSocket;

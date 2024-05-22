import { getMsgEndPoint } from "@/configs/envConfig";
import { getUserInfo } from "@/hooks/services/auth.service";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ENDPOINT = getMsgEndPoint();

const myDetails = getUserInfo();

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  // eslint-disable-next-line no-unused-vars
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

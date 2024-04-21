"use client";

import { useEffect, useState } from "react";

export const InternetDisconnectedMessage = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleConnectionChange = () => {
      const isOnlineCheck = navigator.onLine;
      setIsOnline(isOnlineCheck);
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  return !isOnline && <div>Your Internet Line is not connected.</div>;
};

"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProp {
  children?: React.ReactNode;
}

interface SocketContextProp {
  sendMessage: (mssg: string) => any;
}

const SocketContext = React.createContext<SocketContextProp | null>(null);
export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("State is undefiend");
  }

  return state;
};
export const SocketProvider: React.FC<SocketProviderProp> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const sendMessage: SocketContextProp["sendMessage"] = useCallback(
    (mssg) => {
      console.log("NM", mssg);
      if (socket) {
        console.log(socket.id)
        socket.emit("event:message", { message: mssg });
      }
    },
    [socket]
  );

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);

    // to disconnect when component re-renders
    return () => {
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

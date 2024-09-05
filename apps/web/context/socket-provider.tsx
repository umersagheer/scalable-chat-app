"use client";

import React, { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
type SocketProviderProps = {
  children?: React.ReactNode;
};

interface ISocketProvider {
  sendMessage: (message: string) => any;
  messages: string[];
}

const SocketContext = React.createContext<ISocketProvider | null>(null);

export const useSocket = () => {
  const socket = React.useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const sendMessage: ISocketProvider["sendMessage"] = useCallback(
    (message) => {
      console.log("Send Message", message);
      if (socket) {
        socket?.emit("event:message", { message });
      }
    },
    [socket]
  );

  const onMessageReceived = useCallback((msg: string) => {
    console.log("Received message from server", msg);
    const { message } = JSON.parse(msg) as { message: string };
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);

    _socket.on("event:message", onMessageReceived);

    return () => {
      _socket.disconnect();
      _socket.off("event:message", onMessageReceived);
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};

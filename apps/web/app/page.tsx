"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/context/socket-provider";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div className="h-screen px-1 pt-10 overflow-hidden">
      <h1 className="text-3xl font-bold">Takies</h1>

      <div className="flex flex-col justify-end h-[85vh] ">
        <div className="relative flex flex-col flex-1 gap-2 px-2 py-4 my-2 overflow-auto border-2 rounded-md">
          {messages.map((message, index) => (
            <p
              className={`text-md ${index % 2 === 0 ? "self-start bg-zinc-800" : "self-end bg-green-800"}  rounded-lg px-2 py-1 max-w-72`}
              key={index}
            >
              {message}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-3 ">
          <Input
            placeholder="Type Your Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(message);
                setMessage("");
                e.preventDefault();
              }
            }}
          />
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={() => {
              sendMessage(message);
              setMessage("");
            }}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

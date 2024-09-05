import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  port: 6379,
  host: "localhost",
  username: "default",
  password: "default",
});

const sub = new Redis({
  port: 6379,
  host: "localhost",
  username: "default",
  password: "default",
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log("socket server initialized");
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
      },
    });

    sub.subscribe("MESSAGES");
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    console.log("socket listener initialized");
    const io = this._io;

    io.on("connection", (socket) => {
      console.log("new user connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message: ", message);
        // Publish message to Redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        this._io.emit("event:message", message);
      }
    });
  }
}

export default SocketService;

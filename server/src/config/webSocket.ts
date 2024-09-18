import { Server } from "socket.io";
import { serverHttp } from "./server";

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

export { io };

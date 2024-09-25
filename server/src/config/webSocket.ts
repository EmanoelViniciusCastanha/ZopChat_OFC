import { Server } from "socket.io";
import { serverHttp } from "./server";


const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  
  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

export { io };

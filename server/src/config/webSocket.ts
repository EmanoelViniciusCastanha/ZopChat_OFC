// websocket.ts
import { Server } from "socket.io";
import { serverHttp } from "./server";
import jwt from "jsonwebtoken";

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // Pega o token enviado na conexão do cliente
  const token = socket.handshake.auth.token;

  // Verifica o token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT as string);
    console.log("Usuário autenticado:", decoded);

    // Aqui você pode armazenar o usuário autenticado em algum lugar no socket
    socket.data.user = decoded; // Pode ser útil para acessá-lo em eventos futuros

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  } catch (error) {
    console.log("Autenticação falhou:", error);
    socket.disconnect(); // Desconecta o usuário se a autenticação falhar
  }
});

export { io };

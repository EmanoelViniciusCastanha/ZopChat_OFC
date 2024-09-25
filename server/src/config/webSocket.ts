import { Server } from "socket.io";
import { serverHttp } from "./server";

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // Supondo que o cliente ainda envie algum tipo de identificação no handshake
  const userId = socket.handshake.auth.userId;  // Pode ser um ID de usuário diretamente

  if (userId) {
    console.log("Usuário conectado:", userId);

    // Aqui você pode armazenar o ID do usuário em algum lugar no socket
    socket.data.user = { id: userId }; // Armazena o ID do usuário no socket

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  } else {
    console.log("Autenticação falhou: ID de usuário não fornecido");
    socket.disconnect(); // Desconecta o usuário se o ID não for fornecido
  }
});

export { io };

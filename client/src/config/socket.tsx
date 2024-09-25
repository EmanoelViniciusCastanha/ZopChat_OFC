import { io } from "socket.io-client";

// Função para pegar o token do localStorage (ou qualquer outro armazenamento)// Supondo que o token esteja armazenado localmente

export const socket = io("http://localhost:3002", {
  autoConnect: true,
});

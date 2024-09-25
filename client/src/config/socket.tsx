import { io } from "socket.io-client";

// Função para pegar o token do localStorage (ou qualquer outro armazenamento)
const token = localStorage.getItem('access_token'); // Supondo que o token esteja armazenado localmente

export const socket = io("localhost:3002", {
  autoConnect: true,
  auth: {
    token: token, // Envia o token JWT ao servidor
  },
});

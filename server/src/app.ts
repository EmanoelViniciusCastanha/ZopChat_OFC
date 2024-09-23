import dotenv from 'dotenv';
import { serverHttp } from "./config/server";
import "./websocket/socket";

dotenv.config(); // Carregar variáveis do .env

const PORT = process.env.PORTA || 3002; // Valor padrão, caso PORTA não esteja definido
serverHttp.listen(PORT, () => {
  console.log(`Servidor rodando http://localhost:${PORT}`);
  
});

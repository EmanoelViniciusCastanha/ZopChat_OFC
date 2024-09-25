import express from "express";
import { PrivateMessagesController } from "../controllers/PrivateMessages/PrivateMessagesController";
const mensagemPrivadaRoutes = express.Router();

mensagemPrivadaRoutes.post(
  "/mensagem/privada",
  PrivateMessagesController.createMessages
);

mensagemPrivadaRoutes.get(
  "/mensagens/privada/emissor/:idEmissor/receptor/:idReceptor",
  PrivateMessagesController.findUserMessage
);

export { mensagemPrivadaRoutes };

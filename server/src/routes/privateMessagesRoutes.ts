import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { PrivateMessagesController } from "../controllers/PrivateMessages/PrivateMessagesController";
const mensagemPrivadaRoutes = express.Router();

mensagemPrivadaRoutes.post(
  "/mensagem/privada",
  AuthController.verify_JWT,
  PrivateMessagesController.createMessages
);

mensagemPrivadaRoutes.get(
  "/mensagens/privada/emissor/:idEmissor/receptor/:idReceptor",
  AuthController.verify_JWT,
  PrivateMessagesController.findUserMessage
);

export { mensagemPrivadaRoutes };

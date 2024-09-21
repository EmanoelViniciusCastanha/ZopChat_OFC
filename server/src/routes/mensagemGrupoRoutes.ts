import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { groupMessagesController } from "../controllers/GroupMessages/groupMessagesController";

const mensagemGrupoRoutes = express.Router();
mensagemGrupoRoutes.get(
  "/mensagens/grupo/:idGrupo",
  AuthController.verify_JWT,
  groupMessagesController.findMensagemUser
);

mensagemGrupoRoutes.post(
  "/mensagem/grupo",
  AuthController.verify_JWT,
  groupMessagesController.createMensagem
);
export { mensagemGrupoRoutes };

import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { groupMessagesController } from "../controllers/GroupMessages/groupMessagesController";

const mensagemGrupoRoutes = express.Router();
mensagemGrupoRoutes.get(
  "/mensagens/grupo/:idGrupo",
  groupMessagesController.findUserMessage
);

mensagemGrupoRoutes.post(
  "/mensagem/grupo",
    groupMessagesController.createMessages
);
export { mensagemGrupoRoutes };

import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { ConversaController } from "../controllers/conversa/conversaController";

const conversaRoutes = express.Router();

conversaRoutes.post(
  "/conversa/grupo",
  AuthController.verificaJWt,
  ConversaController.findConversaUserGrupo
);

conversaRoutes.post(
  "/conversa/privada",
  AuthController.verificaJWt,
  ConversaController.findConversaUserPrivada
);

export { conversaRoutes };

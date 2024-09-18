import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { MensagemPrivadaController } from "../controllers/mensagemPrivada/mensagemPrivadaController";
const mensagemPrivadaRoutes = express.Router();

mensagemPrivadaRoutes.post(
  "/mensagem/privada",
  AuthController.verificaJWt,
  MensagemPrivadaController.createMensagem
);

mensagemPrivadaRoutes.get(
  "/mensagens/privada/emissor/:idEmissor/receptor/:idReceptor",
  AuthController.verificaJWt,
  MensagemPrivadaController.findMensagemUser
);

export { mensagemPrivadaRoutes };

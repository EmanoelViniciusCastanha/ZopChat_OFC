import express from "express";
import { PessoaController } from "../controllers/pessoa/pessoaController";
import { AuthController } from "../controllers/auth/authController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PessoaController.createPessoa);
pessoaRoutes.get(
  "/pessoa",
  AuthController.verificaJWt,
  PessoaController.findAllPessoa
);
pessoaRoutes.get(
  "/pessoa/:id",
  AuthController.verificaJWt,
  PessoaController.findPessoaForId
);
pessoaRoutes.patch(
  "/pessoa/:idPessoa/envia/grupo/:idGrupo",
  AuthController.verificaJWt,
  PessoaController.sendPessoaToGrupo
);
pessoaRoutes.delete(
  "/pessoa/:id",
  AuthController.verificaJWt,
  PessoaController.destroyPessoa
);

export { pessoaRoutes };

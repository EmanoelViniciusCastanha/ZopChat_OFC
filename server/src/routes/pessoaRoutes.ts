import express from "express";
import { PessoaController } from "../controllers/pessoa/peopleController";
import { AuthController } from "../controllers/auth/authController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PessoaController.createPessoa);
pessoaRoutes.get(
  "/pessoa",
  AuthController.verify_JWT,
  PessoaController.findAllPessoa
);
pessoaRoutes.get(
  "/pessoa/:id",
  AuthController.verify_JWT,
  PessoaController.findPessoaForId
);
pessoaRoutes.patch(
  "/pessoa/:idPessoa/envia/grupo/:idGrupo",
  AuthController.verify_JWT,
  PessoaController.sendPessoaToGrupo
);
pessoaRoutes.delete(
  "/pessoa/:id",
  AuthController.verify_JWT,
  PessoaController.destroyPessoa
);

export { pessoaRoutes };

import express from "express";
import { PeopleController } from "../controllers/People/peopleController";
import { AuthController } from "../controllers/auth/authController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PeopleController.createPeople);
pessoaRoutes.get(
  "/pessoa",
  AuthController.verify_JWT,
  PeopleController.findAllPeople
);
pessoaRoutes.get(
  "/pessoa/:id",
  AuthController.verify_JWT,
  PeopleController.findPeopleForId
);
pessoaRoutes.patch(
  "/pessoa/:idPessoa/envia/grupo/:idGrupo",
  AuthController.verify_JWT,
  PeopleController.sendPeopleToGroup
);
pessoaRoutes.delete(
  "/pessoa/:id",
  AuthController.verify_JWT,
  PeopleController.deletePeople
);

export { pessoaRoutes };

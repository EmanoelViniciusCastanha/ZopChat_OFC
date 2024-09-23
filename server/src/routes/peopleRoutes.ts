import express from "express";
import { PeopleController } from "../controllers/People/peopleController";
import { AuthController } from "../controllers/auth/authController";

const peopleRoutes = express.Router();

peopleRoutes.post("/pessoa", PeopleController.createPeople);
peopleRoutes.get(
  "/pessoa",
  AuthController.verify_JWT,
  PeopleController.findAllPeople
);
peopleRoutes.get(
  "/pessoa/:id",
  AuthController.verify_JWT,
  PeopleController.findPeopleForId
);
peopleRoutes.patch(
  "/pessoa/:idPessoa/envia/grupo/:idGrupo",
  AuthController.verify_JWT,
  PeopleController.sendPeopleToGroup
);
peopleRoutes.delete(
  "/pessoa/:id",
  AuthController.verify_JWT,
  PeopleController.deletePeople
);

export { peopleRoutes };

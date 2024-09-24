import express from "express";
import { PeopleController } from "../controllers/People/peopleController";
import { AuthController } from "../controllers/auth/authController";

const peopleRoutes = express.Router();

peopleRoutes.post("/pessoa", PeopleController.createPeople);
peopleRoutes.get(
  "/pessoa",
  PeopleController.findAllPeople
);
peopleRoutes.get(
  "/pessoa/:id",
  PeopleController.findPeopleForId
);
peopleRoutes.patch(
  "/pessoa/:idPessoa/envia/grupo/:idGrupo",
  PeopleController.sendPeopleToGroup
);
peopleRoutes.delete(
  "/pessoa/:id",
  PeopleController.deletePeople
);

export { peopleRoutes };

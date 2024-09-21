import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { Groups_Controller } from "../controllers/Groups/GroupController";
const grupoRoutes = express.Router();

grupoRoutes.get(
  "/grupo",
  AuthController.verify_JWT,
  Groups_Controller.findAllGrupos
);

grupoRoutes.get(
  "/grupo/:id",
  AuthController.verify_JWT,
  Groups_Controller.findGrupoForid
);

grupoRoutes.post(
  "/grupo",
  AuthController.verify_JWT,
  Groups_Controller.createGrupo
);

export { grupoRoutes };

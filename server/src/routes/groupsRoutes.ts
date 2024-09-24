import express from "express";
import { Groups_Controller } from "../controllers/Groups/GroupController";
const grupoRoutes = express.Router();

grupoRoutes.get(
  "/grupo",
  Groups_Controller.findAllGrupos
);

grupoRoutes.get(
  "/grupo/:id",
  Groups_Controller.findGrupoForid
);

grupoRoutes.post(
  "/grupo",
  Groups_Controller.createGrupo
);

export { grupoRoutes };

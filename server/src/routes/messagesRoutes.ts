import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { Messages_Controller } from "../controllers/Messages/MessagesController";

const MessagesRoutes = express.Router();

MessagesRoutes.post(
  "/Messages/grupo",
  AuthController.verify_JWT,
  Messages_Controller.find_group_Messages
);

MessagesRoutes.post(
  "/Messages/privada",
  AuthController.verify_JWT,
  Messages_Controller.findMessagesUserPrivada
);

export { MessagesRoutes };

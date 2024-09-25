import express from "express";
import { Messages_Controller } from "../controllers/Messages/MessagesController";

const MessagesRoutes = express.Router();

MessagesRoutes.post(
  "/Messages/grupo",
  Messages_Controller.find_group_Messages
);

MessagesRoutes.post(
  "/Messages/privada",
  Messages_Controller.findMessagesUserPrivada
);

export { MessagesRoutes };

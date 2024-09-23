import express, { Request, Response } from "express";
import { peopleRoutes } from "./peopleRoutes";
import { authRoutes } from "./authRoutes";
import { grupoRoutes } from "./groupsRoutes";
import { MessagesRoutes } from "./messagesRoutes";
import { mensagemGrupoRoutes } from "./groupMessagesRoutes";
import { mensagemPrivadaRoutes } from "./privateMessagesRoutes";

const routes = (app: any) => {
  app
    .route("/")
    .get((req: Request, res: Response) => res.status(200).send("Funcionando"));

  app.use(
    express.json(),
    peopleRoutes,
    authRoutes,
    grupoRoutes,
    MessagesRoutes,
    mensagemGrupoRoutes,
    mensagemPrivadaRoutes
  );
};

export { routes };

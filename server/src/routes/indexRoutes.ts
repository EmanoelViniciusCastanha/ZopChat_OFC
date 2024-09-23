import express, { Request, Response } from "express";
import { pessoaRoutes } from "./pessoaRoutes";
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
    pessoaRoutes,
    authRoutes,
    grupoRoutes,
    MessagesRoutes,
    mensagemGrupoRoutes,
    mensagemPrivadaRoutes
  );
};

export { routes };

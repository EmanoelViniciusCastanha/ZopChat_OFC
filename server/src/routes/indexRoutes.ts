import express, { Request, Response } from "express";
import { pessoaRoutes } from "./pessoaRoutes";
import { authRoutes } from "./authRoutes";
import { grupoRoutes } from "./grupoRoutes";
import { MessagesRoutes } from "./MessagesRoutes";
import { mensagemGrupoRoutes } from "./mensagemGrupoRoutes";
import { mensagemPrivadaRoutes } from "./mensagemPrivadaRoutes";

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

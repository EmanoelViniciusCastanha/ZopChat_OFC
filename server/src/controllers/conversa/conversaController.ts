import { Request, Response } from "express";
import { AuthController } from "../auth/authController";
import { prismaClient } from "../../config/prismaClient";
import { PessoaController } from "../pessoa/pessoaController";
import {
  IConversaGrupo,
  IConversaPrivada,
} from "./interface/interfaceConversa";

export class ConversaController {
  static async initConversaGrupo(
    idEmissor: number,
    idGrupo: number
  ): Promise<any> {
    try {
      const conversa = await prismaClient.conversa.create({
        data: { id_pessoa: idEmissor, id_grupo: idGrupo },
      });
      return conversa;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findConversaUserGrupo(req: Request, res: Response) {
    const IConversa: IConversaGrupo = req.body;
    try {
      const user = await AuthController.currentUser(IConversa.access);
      const pessoa = await PessoaController.findOnePessoa(user.id);

      const conversa = await prismaClient.conversa.findFirst({
        where: { id_grupo: IConversa.idGrupo },
      });

      if (conversa == null) {
        const conversa = await ConversaController.initConversaGrupo(
          pessoa.id,
          IConversa.idGrupo
        );
        res.status(200).json(conversa);
      } else {
        res.status(200).json(conversa);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async initConversaPrivada(idEmissor: number, idReceptor: number) {
    try {
      const conversa = await prismaClient.conversa.create({
        data: { id_pessoa: idEmissor, id_receptor: idReceptor },
      });
      return conversa;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findConversaUserPrivada(req: Request, res: Response) {
    const IConversa: IConversaPrivada = req.body;
    try {
      const user = await AuthController.currentUser(IConversa.access);
      const pessoa = await PessoaController.findOnePessoa(user.id);

      const conversa = await prismaClient.conversa.findFirst({
        where: {
          OR: [
            {
              id_pessoa: pessoa.id,
              id_receptor: IConversa.idReceptor,
            },
            {
              id_receptor: pessoa.id,
              id_pessoa: IConversa.idReceptor,
            },
          ],
        },
      });
      if (conversa == null) {
        const conversa = await ConversaController.initConversaPrivada(
          pessoa.id,
          IConversa.idReceptor
        );

        res.status(200).json(conversa);
      } else {
        res.status(200).json(conversa);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

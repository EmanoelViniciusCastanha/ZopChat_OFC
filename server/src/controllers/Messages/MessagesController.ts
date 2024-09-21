import { Request, Response } from "express";
import { AuthController } from "../auth/authController";
import { prismaClient } from "../../config/prismaClient";
import { PessoaController } from "../pessoa/peopleController";
import {
  IMessagesGrupo,
  IMessagesPrivada,
} from "./interface/interfaceConverse";

export class Messages_Controller {
  static async initMessagesGrupo(
    idEmissor: number,
    idGrupo: number
  ): Promise<any> {
    try {
      const Messages = await prismaClient.Messages.create({
        data: { id_pessoa: idEmissor, id_grupo: idGrupo },
      });
      return Messages;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async find_group_Messages(req: Request, res: Response) {
    const IMessages: IMessagesGrupo = req.body;
    try {
      const user = await AuthController.currentUser(IMessages.access);
      const pessoa = await PessoaController.findOnePessoa(user.id);

      const Messages = await prismaClient.Messages.findFirst({
        where: { id_grupo: IMessages.idGrupo },
      });

      if (Messages == null) {
        const Messages = await Messages_Controller.initMessagesGrupo(
          pessoa.id,
          IMessages.idGrupo
        );
        res.status(200).json(Messages);
      } else {
        res.status(200).json(Messages);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async initMessagesPrivada(idEmissor: number, idReceptor: number) {
    try {
      const Messages = await prismaClient.Messages.create({
        data: { id_pessoa: idEmissor, id_receptor: idReceptor },
      });
      return Messages;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findMessagesUserPrivada(req: Request, res: Response) {
    const IMessages: IMessagesPrivada = req.body;
    try {
      const user = await AuthController.currentUser(IMessages.access);
      const pessoa = await PessoaController.findOnePessoa(user.id);

      const Messages = await prismaClient.Messages.findFirst({
        where: {
          OR: [
            {
              id_pessoa: pessoa.id,
              id_receptor: IMessages.idReceptor,
            },
            {
              id_receptor: pessoa.id,
              id_pessoa: IMessages.idReceptor,
            },
          ],
        },
      });
      if (Messages == null) {
        const Messages = await Messages_Controller.initMessagesPrivada(
          pessoa.id,
          IMessages.idReceptor
        );

        res.status(200).json(Messages);
      } else {
        res.status(200).json(Messages);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

import { Request, Response } from "express";
import { prismaClient } from "../../config/prismaClient";
import { PeopleController } from "../People/peopleController";
import {
  IGroupMessages,
  IPrivateMessages,
} from "./interface/interfaceMessages";

export class Messages_Controller {
  static async initGroupMessages(
    idEmissor: number,
    idGrupo: number
  ): Promise<any> {
    try {
      const Messages = await prismaClient.messages.create({
        data: { id_pessoa: idEmissor, id_grupo: idGrupo },
      });
      return Messages;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async find_group_Messages(req: Request, res: Response) {
    const IMessages: IGroupMessages = req.body;
    try {
      // Substituir a lógica que dependia de AuthController.currentUser
      const pessoa = await PeopleController.findOnePeople(Number(IMessages.access)); // Aqui assumimos que 'access' contém o ID do usuário

      const Messages = await prismaClient.messages.findFirst({
        where: { id_grupo: IMessages.idGrupo },
      });

      if (Messages == null) {
        const Messages = await Messages_Controller.initGroupMessages(
          Number(pessoa.id),
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
      const Messages = await prismaClient.messages.create({
        data: { id_pessoa: idEmissor, id_receptor: idReceptor },
      });
      return Messages;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findMessagesUserPrivada(req: Request, res: Response) {
    const IMessages: IPrivateMessages = req.body;
    try {
      // Substituir a lógica que dependia de AuthController.currentUser
      const pessoa = await PeopleController.findOnePeople(Number(IMessages.access)); // Aqui assumimos que 'access' contém o ID do usuário

      const Messages = await prismaClient.messages.findFirst({
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
          Number(pessoa.id),
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

import { Request, Response } from "express";
import { IGroupMessages } from "./interface/interfaceGroupMessages";
import { prismaClient } from "../../config/prismaClient";

export class groupMessagesController {
  static async createMessages(req: Request, res: Response) {
    const IGroupMessages: IGroupMessages = req.body;
    try {
      await prismaClient.mensagem_grupo.create({
        data: {
          id_pessoa: IGroupMessages.idPessoa,
          id_Messages: IGroupMessages.idMessages,
          mensagem: IGroupMessages.mensagem,
        },
      });
      res.status(200).json();
    } catch (e) {
      throw new Error(e);
    }
  }
  static async createGroupMessages(IGroupMessages: IGroupMessages) {
    try {
      const mensagem = await prismaClient.mensagem_grupo.create({
        data: {
          id_pessoa: IGroupMessages.idPessoa,
          id_Messages: IGroupMessages.idMessages,
          mensagem: IGroupMessages.mensagem,
        },
      });
      const mensagemData = await prismaClient.mensagem_grupo.findUnique({
        where: { id: mensagem.id },
        select: {
          id: true,
          data_cadastro: true,
          id_Messages: true,
          id_pessoa: true,
          mensagem: true,
          pessoa: {
            select: {
              nome: true,
            },
          },
        },
      });
      return mensagemData;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findUserMessage(req: Request, res: Response) {
    const { idGrupo } = req.params;
    const mensagens = await prismaClient.mensagem_grupo.findMany({
      where: { Messages: { id_grupo: Number(idGrupo) } },
      select: {
        id: true,
        mensagem: true,
        data_cadastro: true,
        id_Messages: true,
        id_pessoa: true,
        pessoa: {
          select: {
            nome: true,
          },
        },
      },
    });

    res.status(200).json(mensagens);
  }
}

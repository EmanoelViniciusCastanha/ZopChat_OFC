import { Request, Response } from "express";
import { IMensagemPrivada } from "./interface/interfacePrivateMessages";
import { prismaClient } from "../../config/prismaClient";

export class PrivateMessagesController {
  static async createMessages(req: Request, res: Response) {
    const IMensagem: IMensagemPrivada = req.body;
    try {
      await prismaClient.mensagem_privada.create({
        data: {
          mensagem: IMensagem.mensagem,
          id_Messages: IMensagem.idMessages,
          id_pessoa: IMensagem.idPessoa,
        },
      });
      res.status(200).json();
    } catch (e) {
      throw new Error(e);
    }
  }

  static async createPrivateMessage(IMensagem: IMensagemPrivada) {
    try {
      const mensagem = await prismaClient.mensagem_privada.create({
        data: {
          mensagem: IMensagem.mensagem,
          id_Messages: IMensagem.idMessages,
          id_pessoa: IMensagem.idPessoa,
        },
      });
      const mensagemData = await prismaClient.mensagem_privada.findUnique({
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
    const { idEmissor, idReceptor } = req.params;
    try {
      const mensagem = await prismaClient.mensagem_privada.findMany({
        where: {
          OR: [
            {
              Messages: {
                id_pessoa: Number(idEmissor),
                id_receptor: Number(idReceptor),
              },
            },
            {
              Messages: {
                id_pessoa: Number(idReceptor),
                id_receptor: Number(idEmissor),
              },
            },
          ],
        },
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
        orderBy: { id: "asc" },
      });
      res.status(200).json(mensagem);
    } catch (e) {
      throw new Error(e);
    }
  }
}

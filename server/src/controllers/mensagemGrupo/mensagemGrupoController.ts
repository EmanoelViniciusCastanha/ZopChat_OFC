import { Request, Response } from "express";
import { IMensagemGrupo } from "./interface/interfaceMensagemGrupo";
import { prismaClient } from "../../config/prismaClient";

export class MensagemGrupoController {
  static async createMensagem(req: Request, res: Response) {
    const IMensagemGrupo: IMensagemGrupo = req.body;
    try {
      await prismaClient.mensagem_grupo.create({
        data: {
          id_pessoa: IMensagemGrupo.idPessoa,
          id_conversa: IMensagemGrupo.idConversa,
          mensagem: IMensagemGrupo.mensagem,
        },
      });
      res.status(200).json();
    } catch (e) {
      throw new Error(e);
    }
  }
  static async testecreateMensagemGrupo(IMensagemGrupo: IMensagemGrupo) {
    try {
      const mensagem = await prismaClient.mensagem_grupo.create({
        data: {
          id_pessoa: IMensagemGrupo.idPessoa,
          id_conversa: IMensagemGrupo.idConversa,
          mensagem: IMensagemGrupo.mensagem,
        },
      });
      const mensagemData = await prismaClient.mensagem_grupo.findUnique({
        where: { id: mensagem.id },
        select: {
          id: true,
          data_cadastro: true,
          id_conversa: true,
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

  static async findMensagemUser(req: Request, res: Response) {
    const { idGrupo } = req.params;
    const mensagens = await prismaClient.mensagem_grupo.findMany({
      where: { conversa: { id_grupo: Number(idGrupo) } },
      select: {
        id: true,
        mensagem: true,
        data_cadastro: true,
        id_conversa: true,
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

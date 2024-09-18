import { Request, Response } from "express";
import { prismaClient } from "../../config/prismaClient";
import { IGrupoCadastro } from "./interfaces/interfaceGrupo";

export class GrupoController {
  static async findOneGrupo(id: number) {
    const grupo = await prismaClient.grupo.findUnique({
      where: {
        id: id,
      },
    });
    if (!grupo) {
      throw new Error("Grupo não encontrado");
    }
    return grupo;
  }

  static async findGrupoForid(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const grupo = await prismaClient.grupo.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(grupo);
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findAllGrupos(req: Request, res: Response) {
    try {
      const grupo = await prismaClient.grupo.findMany();
      res.status(200).json(grupo);
    } catch (e) {
      res.status(400).json({ message: `Erro ao buscar grupos` });
    }
  }

  static async createGrupo(req: Request, res: Response) {
    let IGrupoCadastro: IGrupoCadastro = req.body;

    try {
      if (IGrupoCadastro.nome.length < 1) {
        throw new Error("De um nome valido");
      }
      await prismaClient.grupo.create({ data: IGrupoCadastro });
      res.status(201).json();
    } catch (e) {
      res.status(400).json({ message: `Erro ao cadastrar: ${e}` });
    }
  }
}

import bcrypt from "bcrypt";
import validator from "email-validator";
import { Request, Response } from "express";
import { prismaClient } from "../../config/prismaClient";
import { IPessoa, IPessoaCadastro } from "./interfaces/interfacePessoa";
import { GrupoController } from "../grupo/grupoController";
import { GruposPessoasController } from "../gruposPessoas/gruposPessoasController";
export class PessoaController {
  static async createPessoa(req: Request, res: Response) {
    let IPessoaCadastro: IPessoaCadastro = req.body;
    try {
      const emailValido = validator.validate(IPessoaCadastro.email);
      if (!emailValido) {
        throw new Error("Email invalido");
      }
      const cpf = IPessoaCadastro.cpf.replace(/[^0-9]/g, "");
      if (cpf.length < 11 || cpf.length > 11) {
        throw new Error("Cpf invalido");
      }

      if (IPessoaCadastro.nome.length < 1) {
        throw new Error("Informe um nome");
      }
      if (IPessoaCadastro.senha.length < 4) {
        throw new Error("Informe uma senha, minimo 4 caracteres");
      }
      IPessoaCadastro.senha = await bcrypt.hash(IPessoaCadastro.senha, 10);
      const pessoa = await prismaClient.pessoa.create({
        data: IPessoaCadastro,
      });
      res.status(201).json({ id: pessoa.id, nome: pessoa.nome });
    } catch (e) {
      res.status(400).json({ message: `${e} - falha ao cadastrar` });
    }
  }

  static async findAllPessoa(req: Request, res: Response) {
    try {
      const pessoas = await prismaClient.pessoa.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          grupos_pessoas: {
            select: {
              id: true,
              grupo: true,
            },
          },
        },
      });

      res.status(200).json(pessoas);
    } catch (e) {
      res.status(400).json({ message: `${e} - falha na consulta` });
    }
  }

  static async findOnePessoa(id: number) {
    const pessoa = await prismaClient.pessoa.findUnique({ where: { id: id } });
    if (pessoa) {
      return pessoa;
    } else {
      throw new Error("Usuario não encontrado");
    }
  }

  static async findPessoaForId(req: Request, res: Response) {
    const { id } = req.params;
    const pessoa = await prismaClient.pessoa.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    res.status(200).json(pessoa);
  }

  static async findPessoaPorEmail(email: string): Promise<any> {
    const pessoa = await prismaClient.pessoa.findFirst({
      where: { email: email },
    });

    if (pessoa) {
      const newPessoa = {} as IPessoa;
      newPessoa.id = pessoa.id;
      newPessoa.email = pessoa.email;
      newPessoa.senha = pessoa.senha;
      newPessoa.nome = pessoa.nome;
      return newPessoa;
    } else {
      return false;
    }
  }

  static async sendPessoaToGrupo(req: Request, res: Response) {
    const { idPessoa, idGrupo } = req.params;

    try {
      const pessoa = await prismaClient.pessoa.findUnique({
        where: { id: Number(idPessoa) },
      });
      if (!pessoa) {
        throw new Error("Pessoa não encontrada");
      }
      const grupo = await GrupoController.findOneGrupo(Number(idGrupo));

      await GruposPessoasController.createGruposPessoas(pessoa.id, grupo.id);
      res.status(200).json();
    } catch (e) {
      res.status(400).json({
        messgae: `Erro ao adicionar pessoa, verifique se ela já faz parte do grupo: ${e}`,
      });
    }
  }

  static async destroyPessoa(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const pessoa = await prismaClient.pessoa.findUniqueOrThrow({
        where: { id: Number(id) },
      });

      if (!pessoa) {
        throw new Error("Pessoa não encontrada");
      }

      await prismaClient.pessoa.delete({ where: { id: pessoa.id } });
      res.status(200).json();
    } catch (e) {
      res.status(400).json({ messgae: `${e}` });
    }
  }
}

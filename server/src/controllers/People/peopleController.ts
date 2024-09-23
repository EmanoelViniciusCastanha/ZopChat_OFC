import bcrypt from "bcrypt";
import validator from "email-validator";
import { Request, Response } from "express";
import { prismaClient } from "../../config/prismaClient";
import { IPeople, IRegisterPeople } from "./interfaces/interfacePeople";
import { Groups_Controller } from "../Groups/GroupController";
import { peopleGroupController } from "../People_groups/peopleGroupController";
export class PeopleController {
  static async createPeople(req: Request, res: Response) {
    let IRegisterPeople: IRegisterPeople = req.body;
    try {
      const valideEmail = validator.validate(IRegisterPeople.email);
      if (!valideEmail) {
        throw new Error("Email invalido");
      }
      const cpf = IRegisterPeople.cpf.replace(/[^0-9]/g, "");
      if (cpf.length < 11 || cpf.length > 11) {
        throw new Error("Cpf invalido");
      }

      if (IRegisterPeople.nome.length < 1) {
        throw new Error("Informe um nome");
      }
      if (IRegisterPeople.senha.length < 4) {
        throw new Error("Informe uma senha, minimo 4 caracteres");
      }
      IRegisterPeople.senha = await bcrypt.hash(IRegisterPeople.senha, 10);
      const pessoa = await prismaClient.pessoa.create({
        data: IRegisterPeople,
      });
      res.status(201).json({ id: pessoa.id, nome: pessoa.nome });
    } catch (e) {
      res.status(400).json({ message: `${e} - falha ao cadastrar` });
    }
  }

  static async findAllPeople(req: Request, res: Response) {
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

  static async findOnePeople(id: number) {
    const pessoa = await prismaClient.pessoa.findUnique({ where: { id: id } });
    if (pessoa) {
      return pessoa;
    } else {
      throw new Error("Usuario não encontrado");
    }
  }

  static async findPeopleForId(req: Request, res: Response) {
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

  static async findPeopleByEmail(email: string): Promise<any> {
    const pessoa = await prismaClient.pessoa.findFirst({
      where: { email: email },
    });

    if (pessoa) {
      const newPessoa = {} as IPeople;
      newPessoa.id = pessoa.id;
      newPessoa.email = pessoa.email;
      newPessoa.senha = pessoa.senha;
      newPessoa.nome = pessoa.nome;
      return newPessoa;
    } else {
      return false;
    }
  }

  static async sendPeopleToGroup(req: Request, res: Response) {
    const { idPessoa, idGrupo } = req.params;

    try {
      const pessoa = await prismaClient.pessoa.findUnique({
        where: { id: Number(idPessoa) },
      });
      if (!pessoa) {
        throw new Error("Pessoa não encontrada");
      }
      const grupo = await Groups_Controller.findOneGrupo(Number(idGrupo));

      await peopleGroupController.createPeopleGroups(pessoa.id, grupo.id);
      res.status(200).json();
    } catch (e) {
      res.status(400).json({
        messgae: `Erro ao adicionar pessoa, verifique se ela já faz parte do grupo: ${e}`,
      });
    }
  }

  static async deletePeople(req: Request, res: Response) {
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

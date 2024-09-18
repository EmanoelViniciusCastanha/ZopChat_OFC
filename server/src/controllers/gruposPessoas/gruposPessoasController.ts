import { prismaClient } from "../../config/prismaClient";

export class GruposPessoasController {
  static async createGruposPessoas(idPessoa: number, idGrupo: number) {
    await prismaClient.grupos_pessoas.create({
      data: { id_pessoa: idPessoa, id_grupo: idGrupo },
    });
  }
}

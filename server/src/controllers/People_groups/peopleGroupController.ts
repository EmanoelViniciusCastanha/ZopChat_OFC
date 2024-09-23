import { prismaClient } from "../../config/prismaClient";

export class peopleGroupController {
  static async createPeopleGroups(idPessoa: number, idGrupo: number) {
    await prismaClient.grupos_pessoas.create({
      data: { id_pessoa: idPessoa, id_grupo: idGrupo },
    });
  }
}

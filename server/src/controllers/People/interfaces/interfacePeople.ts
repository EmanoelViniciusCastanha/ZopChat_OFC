export interface IPeople {
  id: BigInt;
  nome: string;
  email: string;
  senha: string;
  cpf?: string;
}

export interface IRegisterPeople {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
}

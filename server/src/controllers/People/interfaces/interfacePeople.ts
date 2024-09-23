export interface IPeople {
  id: number;
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

export interface IPessoa {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf?: string;
}

export interface IPessoaCadastro {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
}

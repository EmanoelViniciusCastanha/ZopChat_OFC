import "./style/cadastroPessoa.css";
import NavBar from "../../components/navbarComponents/navBar";
import { webFetch } from "../../config/axiosConfig";
import { useEffect, useState } from "react";

export type pessoa = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
};

const INIT_ALL_USER = {
  cpf: "",
  email: "",
  nome: "",
  senha: "",
};

type grupos = {
  id: number;
  nome: string;
  descricao: string;
};

const CadastroPessoa = () => {
  const [user, setUser] = useState<pessoa>(INIT_ALL_USER);
  const [grupos, setGrupo] = useState<grupos[]>([]);
  const [selectedValue, setSelectedValue] = useState("");

  const criarUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await webFetch
      .post("/pessoa", {
        ...user,
      })
      .then((user) => {
        adicionaGrupo(user.data.id, Number(selectedValue));
        setUser(INIT_ALL_USER);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const adicionaGrupo = async (idUser: number, idGrupo: number) => {
    try {
      await webFetch.patch(`/pessoa/${idUser}/envia/grupo/${idGrupo}`);
    } catch (e) {
      console.error(e);
    }
  };

  const getGrupos = async () => {
    try {
      const response = await webFetch.get("/grupo");

      const data = response.data;

      setGrupo(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getGrupos();
  }, []);

  return (
    <>
      <div className="container-cadastro-pessoa">
        <NavBar />
        <div className="cadastro-user">
          <h2 className="titulo-cadastro-pessoa">Cadastro de Usuario:</h2>
          <form className="formulario-cadastro-pessoa" onSubmit={criarUser}>
            <div className="form-control">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Digite aqui"
                value={user.nome}
                onChange={(e) =>
                  setUser((old) => ({ ...old, nome: e.target.value }))
                }
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite aqui"
                value={user.email}
                onChange={(e) =>
                  setUser((old) => ({ ...old, email: e.target.value }))
                }
              />
            </div>
            <div className="form-control">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Digite aqui"
                value={user.senha}
                onChange={(e) =>
                  setUser((old) => ({ ...old, senha: e.target.value }))
                }
              />
            </div>
            <div className="input-duplo">
              <div className="box-input-cpf">
                <label htmlFor="cpf">Cpf:</label>
                <input
                  className="input-cpf"
                  type="number"
                  name="cpf"
                  id="cpf"
                  placeholder="Digite aqui"
                  value={user.cpf}
                  onChange={(e) =>
                    setUser((old) => ({ ...old, cpf: e.target.value }))
                  }
                />
              </div>
              <div className="box-input-cpf">
                <label htmlFor="grupo">Grupo:</label>
                <select
                  className="select-grupo"
                  name="grupos"
                  id="grupos"
                  defaultValue={""}
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Selecione
                  </option>
                  {grupos.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="button-login">
              Criar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastroPessoa;

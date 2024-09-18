import "./style/cadastroGrupo.css";
import NavBar from "../../components/navbarComponents/navBar";
import { useState } from "react";
import { webFetch } from "../../config/axiosConfig";

type grupo = {
  nome: string;
  descricao: string;
};

const INIT_ALL_GRUPO = {
  nome: "",
  descricao: "",
};

const CadastroGrupo = () => {
  const [grupo, setGrupo] = useState<grupo>(INIT_ALL_GRUPO);

  const criarGrupo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await webFetch
        .post("/grupo", {
          ...grupo,
        })
        .then()
        .catch((e) => {
          alert(e.response.data.message);
        });
      setGrupo(INIT_ALL_GRUPO);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="container-cadastro-grupo">
        <NavBar />
        <h2 className="titulo-cadastro-grupo">Cadastro de Grupo</h2>
        <form className="formulario-cadastro-grupo" onSubmit={criarGrupo}>
          <div className="form-control">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite aqui"
              value={grupo.nome}
              onChange={(e) =>
                setGrupo((old) => ({ ...old, nome: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="descricao">descrição:</label>
            <input
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Digite aqui"
              value={grupo.descricao}
              onChange={(e) =>
                setGrupo((old) => ({ ...old, descricao: e.target.value }))
              }
            />
          </div>
          <input type="submit" value="Criar" className="button-login" />
        </form>
      </div>
    </>
  );
};

export default CadastroGrupo;

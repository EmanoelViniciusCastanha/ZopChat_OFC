import NavBar from "../../components/navbarComponents/navBar";
import { useState, useEffect, useContext } from "react";
import "../../components/homeComponents/style/dropBox.css";
import DropDown from "../../components/homeComponents/dropBox";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";
import "./style/home.css";

export type pessoas = {
  email: string;
  grupos_pessoas: {
    id: number;
    grupo: {
      id: number;
      nome: string;
      descricao: string;
    };
  }[];
  id: number;
  nome: string;
};

type grupos = {
  id: number;
  nome: string;
  descricao: string;
};

const Home = () => {
  const auth = useContext(AuthContext);
  const [pessoas, setPessoa] = useState<pessoas[]>([]);
  const [grupos, setGrupo] = useState<grupos[]>([]);

  const getUsers = async () => {
    try {
      const response = await webFetch.get("/pessoa");

      const data = response.data;

      setPessoa(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getGrupos = async () => {
    try {
      const response = await webFetch.get("/grupo");

      const data = response.data;

      setGrupo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
    getGrupos();
  }, []);

  return (
    <>
      <div className="container-home">
        <NavBar />
        <div className="container-main">
          <div className="background-drop">
            <h1 className="nome-user">Olá {auth.user?.nome}</h1>
            {grupos.map((grupo) => (
              <div className="grupos" key={grupo.id}>
                <DropDown
                  grupoNome={grupo.nome}
                  users={pessoas}
                  idGrupo={grupo.id}
                />
              </div>
            ))}
          </div>
          <div className="img-logo-container">
            <img src="../../../img/userLogo.png" alt="" className="img-logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import NavBar from "../../components/Componentes/nav_bar";
import { useState, useEffect, useContext } from "react";
import DropDown from "../../components/Componentes/drop";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";
import { Divider } from "@nextui-org/react";

export type Pessoa = {
  email: string;
  gruposRelacionados: {
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

type Grupo = {
  id: number;
  nome: string;
  descricao: string;
};

const Home = () => {
  const auth = useContext(AuthContext);
  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([]);
  const [listaGrupos, setListaGrupos] = useState<Grupo[]>([]);

  const fetchPessoas = async () => {
    try {
      const response = await webFetch.get("/pessoa");
      const data = response.data;
      setListaPessoas(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchGrupos = async () => {
    try {
      const response = await webFetch.get("/grupo");
      const data = response.data;
      setListaGrupos(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPessoas();
    fetchGrupos();
  }, []);

  return (
    <div className="bg-[#16181D] text-white min-h-screen">
      <NavBar />
      <div>
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 px-3 pt-3">
          <div className="lg:w-[22%] h-[850px] bg-[#2E353B] p-5 shadow-lg ">
            <h1 className="text-xl font-bold mb-4">
              Olá!, {auth.user?.nome}
            </h1>
            <Divider className="bg-[#2E353B]" />
            {listaGrupos.map((grupo) => (
              <div className="mb-4" key={grupo.id}>
                <DropDown
                  grupoNome={grupo.nome}
                  usuarios={listaPessoas}
                  grupoId={grupo.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

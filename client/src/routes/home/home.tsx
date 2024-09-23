import NavBar from "../../components/Componentes/nav_bar";
import { useState, useEffect, useContext } from "react";
import DropDown from "../../components/Componentes/dropBox";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";

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
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="lg:w-1/2 w-full bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">
              Olá {auth.user?.nome}
            </h1>
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

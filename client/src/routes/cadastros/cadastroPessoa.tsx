import NavBar from "../../components/Componentes/nav_bar";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const criarUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await webFetch
      .post("/pessoa", { ...user })
      .then((response) => {
        adicionaGrupo(response.data.id, Number(selectedValue));
        setUser(INIT_ALL_USER);
        setIsModalOpen(false);
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
      setGrupo(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getGrupos();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center">
        <NavBar setIsModalOpen={setIsModalOpen} />
        <div className="bg-[#2E353B] rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 pb-5 text-center text-white">Cadastro de Usuário:</h2>
          <div className="flex flex-col">
            <label htmlFor="grupo" className="block text-white mb-2">Grupo:</label>
            <select
              className="w-full p-4 rounded-lg bg-[#16181D] text-white"
              name="grupos"
              id="grupos"
              value={selectedValue}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedValue(value);
                if (value) {
                  setIsModalOpen(true);
                }
              }}
            >
              <option value="" disabled hidden>Selecione</option>
              {grupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2E353B] rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 pb-5 text-center">Cadastro de Usuário</h2>
              <form className="space-y-4" onSubmit={criarUser}>
                <div className="flex flex-col">
                  <label htmlFor="nome" className="block text-white mb-2">Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    placeholder="Digite aqui"
                    value={user.nome}
                    onChange={(e) =>
                      setUser((old) => ({ ...old, nome: e.target.value }))
                    }
                    className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="block text-white mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite aqui"
                    value={user.email}
                    onChange={(e) =>
                      setUser((old) => ({ ...old, email: e.target.value }))
                    }
                    className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="senha" className="block text-white mb-2">Senha:</label>
                  <input
                    type="password"
                    name="senha"
                    id="senha"
                    placeholder="Digite aqui"
                    value={user.senha}
                    onChange={(e) =>
                      setUser((old) => ({ ...old, senha: e.target.value }))
                    }
                    className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cpf" className="block text-white mb-2">CPF:</label>
                  <input
                    className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="Digite aqui"
                    value={user.cpf}
                    onChange={(e) =>
                      setUser((old) => ({ ...old, cpf: e.target.value }))
                    }
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-[50%] p-4 rounded-lg bg-red-500 text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-[50%] p-4 rounded-lg bg-[#00A03C] text-white"
                  >
                    Criar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CadastroPessoa;

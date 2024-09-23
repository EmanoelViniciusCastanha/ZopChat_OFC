import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { Image } from "@nextui-org/react";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    authContext.signOut();
    localStorage.removeItem("AuthAccess");
    navigate("/");
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoute = e.target.value;
    if (selectedRoute === "/cadastro/grupo") {
      setIsModalOpen(true); // Abre o modal se selecionar "Cadastro de Grupo"
    } else if (selectedRoute) {
      navigate(selectedRoute); // Navega para a rota se for outra opção
    }
  };

  const criarGrupo = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de criação de grupo vai aqui (igual ao código anterior)
    setIsModalOpen(false); // Fecha o modal após criar o grupo
  };

  return (
    <nav className="bg-[#2E353B] text-white py-4 px-8 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image src="/src/Imagens/logo.png" className="w-[200px] rounded-full" />
      </div>
      <div className="flex space-x-6 items-center">
        <select
          onChange={handleSelectionChange}
          className="px-5 py-3 rounded-lg bg-[#16181D] text-white cursor-pointer"
        >
          <option value="">Cadastros</option>
          <option value="/cadastro/grupo">Cadastro de Grupo</option>
          <option value="/cadastro/user">Cadastro de Usuário</option>
        </select>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
        >
          Sair
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Cadastro de Grupo</h2>
            <form onSubmit={criarGrupo}>
              <div className="mb-4">
                <label
                  htmlFor="nome"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Digite aqui"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="descricao"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Descrição:
                </label>
                <input
                  type="text"
                  id="descricao"
                  placeholder="Digite aqui"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { Image } from "@nextui-org/react";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleLogout = () => {
    authContext.signOut();
    localStorage.removeItem("AuthAccess");
    setSelectedValue("");
    navigate("/");
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (newValue === "/cadastro/grupo") {
      setIsModalOpen(true);
    } else if (newValue === "/cadastro/user") {
      setIsUserModalOpen(true);
    } else if (newValue) {
      navigate(newValue);
    }
  };

  const criarGrupo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const criarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUserModalOpen(false);
  };

  return (
    <nav className="bg-[#2E353B] text-white py-4 px-8 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image src="/src/Imagens/logo.png" className="w-[200px] rounded-full" />
      </div>
      <div className="flex space-x-6 items-center">
        <select
          value={selectedValue}
          onChange={handleSelectionChange}
          className="px-5 py-3 rounded-lg bg-[#16181D] text-white cursor-pointer"
        >
          <option disabled value="">Cadastros</option>
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
          <div className="bg-[#2E353B] rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 pb-5 text-center">Cadastro de Grupo</h2>
            <form onSubmit={criarGrupo}>
              <div className="mb-4">
                <label htmlFor="nome" className="block text-white mb-2">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Digite aqui"
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="descricao" className="block text-white mb-2">Descrição:</label>
                <input
                  type="text"
                  id="descricao"
                  placeholder="Digite aqui"
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
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
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2E353B] rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 pb-5 text-center">Cadastro de Usuário</h2>
            <form onSubmit={criarUsuario}>
              <div className="mb-4">
                <label htmlFor="nome" className="block text-white mb-2">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Digite aqui"
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite aqui"
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="block text-white mb-2">Senha:</label>
                <input
                  type="password"
                  id="senha"
                  placeholder="Digite aqui"
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cpf" className="block text-white mb-2">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="Digite aqui"
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                />
              </div>
              <div className="flex justify-end space-x-4 pt-5">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
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
    </nav>
  );
};

export default NavBar;

import NavBar from "../../components/Componentes/nav_bar";
import { useState, useEffect, useContext } from "react";
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

type Mensagem = {
  id: number;
  texto: string;
  tipo: "enviada" | "recebida";
};

const Home = () => {
  const auth = useContext(AuthContext);
  const [listaPessoas, setListaPessoas] = useState<Pessoa[]>([]);
  const [listaGrupos, setListaGrupos] = useState<Grupo[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Mensagem[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // const fetchPessoas = async () => {
  //   try {
  //     const response = await webFetch.get("/pessoa");
  //     const data = response.data;
  //     setListaPessoas(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchPessoas();
  // }, []);

  const handleSelectMessage = (message: string) => {
    setSelectedMessage(message);
    setMessages([
      { id: 1, texto: message, tipo: "recebida" },
      { id: 2, texto: "Estou bem, e você?", tipo: "enviada" }
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, texto: newMessage, tipo: "enviada" }]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <NavBar />
      <div className="mx-auto flex h-[713px]">
        <div className="w-1/4 bg-gray-900 p-4">
          <h1 className="text-2xl font-bold text-white mb-4">Olá!, Usuário Fictício</h1>
          <div
            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer mb-4"
            onClick={() => handleSelectMessage("Olá! Como você está?")}
          >
            <h3 className="text-lg font-semibold">João</h3>
            <p className="mt-2 truncate">Olá! Como você está?</p>
          </div>
        </div>
        <div className="w-3/4 bg-gray-800 p-4 flex flex-col justify-between">
          {selectedMessage ? (
            <div className="flex flex-col flex-grow">
              <div className="flex-grow overflow-y-auto p-4 bg-gray-700 rounded-lg max-h-[713px] h-full">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex mb-4 ${msg.tipo === "enviada" ? "justify-end" : ""}`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xl break-words ${msg.tipo === "enviada" ? "bg-gray-600 text-white" : "bg-blue-500 text-white"
                        }`}
                    >
                      {msg.texto}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="w-full p-3 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleSendMessage} className="bg-gray-900  text-white p-3 rounded-r-lg">
                  Enviar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Selecione uma mensagem para visualizar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

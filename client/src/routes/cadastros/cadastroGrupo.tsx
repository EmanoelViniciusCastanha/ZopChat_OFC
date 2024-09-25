import { useState } from "react";
import NavBar from "../../components/Componentes/nav_bar";
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
    const [isOpen, setIsOpen] = useState(false);

    const criarGrupo = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await webFetch
                .post("/grupo", { ...grupo })
                .then()
                .catch((e) => {
                    alert(e.response.data.message);
                });
            setGrupo(INIT_ALL_GRUPO);
            setIsOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
                >
                    Cadastrar Grupo
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="rounded-lg shadow-lg p-6 max-w-md w-full bg-black">
                        <h2 className="text-2xl font-bold mb-4 text-white">Cadastro de Grupo</h2>
                        <form onSubmit={criarGrupo}>
                            <div className="mb-4">
                                <label
                                    htmlFor="nome"
                                    className="block text-white font-semibold mb-2"
                                >
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Digite aqui"
                                    value={grupo.nome}
                                    onChange={(e) =>
                                        setGrupo((old) => ({ ...old, nome: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="descricao"
                                    className="block text-white font-semibold mb-2"
                                >
                                    Descrição:
                                </label>
                                <input
                                    type="text"
                                    id="descricao"
                                    placeholder="Digite aqui"
                                    value={grupo.descricao}
                                    onChange={(e) =>
                                        setGrupo((old) => ({ ...old, descricao: e.target.value }))
                                    }
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Criar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CadastroGrupo;

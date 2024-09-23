import { useContext, useState } from "react";
import { Pessoa } from "../../routes/home/home";
import { useNavigate } from "react-router-dom";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";

interface DropDownProps {
  grupoId: number;
  grupoNome: string;
  usuarios: Pessoa[];
}

const DropDown = (props: DropDownProps) => {
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const enviarMensagensGrupo = async () => {
    const tokenArmazenado = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/Messages/grupo", {
        access: tokenArmazenado,
        idGrupo: Number(props.grupoId),
      });
      const mensagemData = mensagens.data;
      navigate(`/Messages/${mensagemData.id}/grupo/${props.grupoId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const enviarMensagensPrivada = async (idReceptor: number) => {
    const tokenArmazenado = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/Messages/privada", {
        access: tokenArmazenado,
        idReceptor: idReceptor,
      });

      const mensagemData = mensagens.data;
      let usuarioAlvo: number | undefined;
      if (auth.user?.id === mensagemData.id_receptor) {
        usuarioAlvo = mensagemData.id_pessoa;
      } else {
        usuarioAlvo = mensagemData.id_receptor;
      }
      navigate(
        `/Messages/${mensagemData.id}/privada/receptor/${usuarioAlvo}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-gray-800 rounded-lg shadow-lg">
        <button
          className="text-white font-bold"
          onClick={() => setAberto((prevState) => !prevState)}
        >
          {props.grupoNome}
        </button>
        <button onClick={enviarMensagensGrupo}>
          <img
            className="w-6 h-6"
            src="../../../img/comente.png"
            alt="comentário"
          />
        </button>
      </div>
      {aberto && (
        <ul className="mt-2 bg-gray-700 rounded-lg shadow-md">
          {props.usuarios.map((usuario) => {
            const pertenceAoGrupo = usuario.gruposRelacionados.filter(
              (item) => item.grupo.id === props.grupoId
            );
            return (
              <>
                {pertenceAoGrupo.length > 0 && auth.user?.id !== usuario.id ? (
                  <li
                    className="p-2 hover:bg-gray-600 text-white cursor-pointer"
                    key={usuario.id}
                  >
                    <button
                      onClick={() => enviarMensagensPrivada(usuario.id)}
                    >
                      {usuario.nome}
                    </button>
                  </li>
                ) : null}
              </>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DropDown;

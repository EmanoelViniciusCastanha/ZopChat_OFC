import { useContext, useEffect, useRef, useState } from "react";
import "./style/telaConversa.css";
import NavBar from "../../components/navbarComponents/navBar";
import { useParams } from "react-router-dom";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";
import { socket } from "../../config/socket";
import { format } from "date-fns";

type grupo = {
  id: number;
  nome: string;
  descricao: string;
};

type mensagens = {
  id: number;
  mensagem: string;
  data_cadastro: Date;
  idConversa: number;
  id_pessoa: number;
  pessoa: {
    nome: string;
  };
}[];

const TelaConversaGrupo = () => {
  const [mensagensBox, setMensagensBox] = useState<mensagens>([]);
  const [grupo, setGrupo] = useState<grupo>();
  const { idGrupo, idConversa } = useParams();
  const [mensagem, setMensagem] = useState<string>("");
  const auth = useContext(AuthContext);
  const refConversation = useRef(null);

  const getGrupo = async () => {
    try {
      const grupo = await webFetch.get(`/grupo/${idGrupo}`);

      setGrupo(grupo.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMensagens = async () => {
    try {
      const mensagem = await webFetch.get(`/mensagens/grupo/${idGrupo}`);
      setMensagensBox(mensagem.data);
    } catch (e) {
      console.log(e);
    }
  };

  const enviaMensagem = async () => {
    try {
      socket.emit("mensagemGrupo", {
        mensagem: mensagem,
        idConversa: Number(idConversa),
        idPessoa: auth.user?.id,
      });
      setMensagem("");
    } catch (e) {
      console.log(e);
    }
  };

  const formatData = (data: Date) => {
    const newData = format(new Date(data), "dd-MM-yyyy HH:mm");
    return newData;
  };

  useEffect(() => {
    function onMsgEvent(data: any) {
      setMensagensBox((previous) => [...previous, data]);
      setTimeout(() => {
        if (refConversation.current) {
          const divScroll = refConversation.current as HTMLDivElement;

          divScroll.scrollTo({
            top: divScroll.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 50);
    }
    socket.connect();
    getGrupo();
    getMensagens();
    socket.emit("room", {
      idUser: auth.user?.id,
      grupo: Number(idConversa),
    });
    socket.on("mensagemGrupo", onMsgEvent);

    return () => {
      socket.off("mensagemGrupo", onMsgEvent);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="container-conversa">
        <NavBar />
        <div className="titulo">
          <h2>{grupo?.nome}</h2>
          <p>{grupo?.descricao}</p>
        </div>
        <div className="container-conversa-modal">
          <div className="modal">
            <div className="conversa-dentro" ref={refConversation}>
              {mensagensBox.map((value, index) => {
                return (
                  <div
                    className={
                      value.id_pessoa === auth.user?.id
                        ? "texto-user-container"
                        : "texto-container"
                    }
                  >
                    <div
                      key={`${value.id} + ${index}`}
                      className={
                        value.id_pessoa === auth.user?.id
                          ? "texto-user"
                          : "texto"
                      }
                    >
                      <ul key="mensagens">
                        <p className="user">{value.pessoa.nome}:</p>
                        <li key="mensagem" className="mensagem">
                          {value.mensagem}
                        </li>
                      </ul>
                      <p className="data">{formatData(value.data_cadastro)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="input-button">
              <input
                onChange={(e) => setMensagem(e.target.value)}
                value={mensagem}
                className="caixa-digito"
                type="text"
                placeholder="Digite aqui"
              />
              <button onClick={enviaMensagem} className="envia-mensagem">
                enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TelaConversaGrupo;

import { useParams } from "react-router-dom";
import NavBar from "../../components/Componentes/nav_bar";
import { webFetch } from "../../config/axiosConfig";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { socket } from "../../config/socket";
import { format } from "date-fns";
type mensagens = {
  id: number;
  mensagem: string;
  data_cadastro: Date;
  idMessages: number;
  id_pessoa: number;
  pessoa: {
    nome: string;
  };
}[];

type pessoa = {
  id: number;
  nome: string;
  email: string;
};

const TelaMessagesPrivada = () => {
  const { idMessages, idReceptor } = useParams();
  const [mensagensBox, setMensagensBox] = useState<mensagens>([]);
  const [pessoa, setPessoa] = useState<pessoa>();
  const [mensagem, setMensagem] = useState<string>("");
  const auth = useContext(AuthContext);
  const refMessagestion = useRef(null);

  const getUser = async () => {
    const pessoa = await webFetch.get(`/pessoa/${idReceptor}`);
    setPessoa(pessoa.data);
  };

  const getMensagens = async () => {
    try {
      const mensagem = await webFetch.get(
        `mensagens/privada/emissor/${auth.user?.id}/receptor/${idReceptor}`
      );
      setMensagensBox(mensagem.data);
    } catch (e) {
      console.log(e);
    }
  };

  const enviaMensagem = async () => {
    try {
      socket.emit("mensagemPrivada", {
        mensagem: mensagem,
        idMessages: Number(idMessages),
        idPessoa: auth.user?.id,
        idReceptor: Number(idReceptor),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onMsgEvent(data: any) {
      setMensagensBox((previous) => [...previous, data]);
      setTimeout(() => {
        if (refMessagestion.current) {
          const divScroll = refMessagestion.current as HTMLDivElement;
          divScroll.scrollTo({
            top: divScroll.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 50);
    }
    socket.connect();
    getMensagens();
    getUser();
    socket.emit("userReceptor", {
      idUser: auth.user?.id,
      idReceptor: Number(idReceptor),
      idMessages: Number(idMessages),
    });

    socket.on("mensagemPrivada", onMsgEvent);

    return () => {
      socket.off("mensagemPrivada", onMsgEvent);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="container-Messages">
        <NavBar />
        <div className="titulo">
          <h2>{pessoa?.nome}</h2>
        </div>
        <div className="container-Messages-modal">
          <div className="modal">
            <div className="Messages-dentro" ref={refMessagestion}>
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
                      key={value.id + index}
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

export default TelaMessagesPrivada;

import { useContext, useState } from "react";
import { pessoas } from "../../routes/home/home";
import { useNavigate } from "react-router-dom";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";

interface IProps {
  idGrupo: number;
  grupoNome: string;
  users: pessoas[];
}

const DropDown = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const navegation = useNavigate();
  const auth = useContext(AuthContext);

  const postConversaGrupo = async () => {
    const storageData = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/conversa/grupo", {
        access: storageData,
        idGrupo: Number(props.idGrupo),
      });
      const mensagemData = mensagens.data;
      navegation(`/conversa/${mensagemData.id}/grupo/${props.idGrupo}`);
    } catch (e) {
      console.log(e);
    }
  };

  const postConversaPrivada = async (idReceptor: number) => {
    const storageData = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/conversa/privada", {
        access: storageData,
        idReceptor: idReceptor,
      });

      const mensagemData = mensagens.data;
      let changeUser: number | undefined;
      if (auth.user?.id === mensagemData.id_receptor) {
        changeUser = mensagemData.id_pessoa;
      } else {
        changeUser = mensagemData.id_receptor;
      }
      navegation(`/conversa/${mensagemData.id}/privada/receptor/${changeUser}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="btn-grupos">
        <button className="nome-grupo" onClick={() => setOpen((old) => !old)}>
          {props.grupoNome}
        </button>
        <button className="conversa" onClick={postConversaGrupo}>
          <img className="icone" src="../../../img/comente.png" alt="logo" />
        </button>
      </div>
      <ul className="menu">
        {open
          ? props.users.map((user) => {
              const filtro = user.grupos_pessoas.filter(
                (item) => item.grupo.id === props.idGrupo
              );
              return (
                <>
                  {filtro.length > 0 && auth.user?.id != user.id ? (
                    <li className="menu-item" key={user.id}>
                      <button
                        className="menu-nome-user"
                        onClick={() => postConversaPrivada(user.id)}
                      >
                        {user.nome}
                      </button>
                    </li>
                  ) : null}
                </>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default DropDown;

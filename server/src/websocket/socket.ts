import { io } from "../config/webSocket";
import { MensagemGrupoController } from "../controllers/mensagemGrupo/mensagemGrupoController";
import { MensagemPrivadaController } from "../controllers/mensagemPrivada/mensagemPrivadaController";

interface IuserRoom {
  idUser: number;
  grupo: number;
  socketId: string;
}

const usersGrupo: IuserRoom[] = [];

interface IUserPrivado {
  idUser: number;
  idReceptor: number;
  idConversa: number;
  socketId: string;
}

const usersPrivado: IUserPrivado[] = [];

io.on("connection", (socket) => {
  socket.on("room", (data) => {
    socket.join(data.grupo);

    const userInRoom = usersGrupo.find(
      (user) => user.idUser === data.idUser && user.grupo === data.grupo
    );
    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      usersGrupo.push({
        idUser: data.idUser,
        grupo: data.grupo,
        socketId: socket.id,
      });
    }
  });

  socket.on("mensagemGrupo", async (data) => {
    const str = data.mensagem.replace(/\s/g, "");
    if (str.length > 0) {
      const mensagem = await MensagemGrupoController.testecreateMensagemGrupo(
        data
      );

      io.to(data.idConversa).emit("mensagemGrupo", mensagem);
    }
  });

  socket.on("userReceptor", (data) => {
    socket.join(data.idConversa);

    const userLogged = usersPrivado.find((user) => user.idUser === data.idUser);
    if (userLogged) {
      userLogged.socketId = socket.id;
    } else {
      usersPrivado.push({
        idUser: data.idUser,
        idReceptor: data.idReceptor,
        idConversa: data.idConversa,
        socketId: socket.id,
      });
    }
  });

  socket.on("mensagemPrivada", async (data) => {
    const str = data.mensagem.replace(/\s/g, "");
    if (str.length > 0) {
      const mensagem =
        await MensagemPrivadaController.testecreateMensagemPrivada({
          idConversa: data.idConversa,
          idPessoa: data.idPessoa,
          mensagem: data.mensagem,
        });

      io.to([data.idConversa]).emit("mensagemPrivada", mensagem);
    }
  });

  socket.on("disconnect", () => {});
});

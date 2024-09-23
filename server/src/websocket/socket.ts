import { io } from "../config/webSocket";
import { groupMessagesController } from "../controllers/GroupMessages/groupMessagesController";
import { PrivateMessagesController } from "../controllers/PrivateMessages/PrivateMessagesController";

interface IuserRoom {
  idUser: number;
  grupo: number;
  socketId: string;
}

const usersGrupo: IuserRoom[] = [];

interface IUserPrivado {
  idUser: number;
  idReceptor: number;
  idMessages: number;
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
      const mensagem = await groupMessagesController.createGroupMessages(
        data
      );

      io.to(data.idMessages).emit("mensagemGrupo", mensagem);
    }
  });

  socket.on("userReceptor", (data) => {
    socket.join(data.idMessages);

    const userLogged = usersPrivado.find((user) => user.idUser === data.idUser);
    if (userLogged) {
      userLogged.socketId = socket.id;
    } else {
      usersPrivado.push({
        idUser: data.idUser,
        idReceptor: data.idReceptor,
        idMessages: data.idMessages,
        socketId: socket.id,
      });
    }
  });

  socket.on("mensagemPrivada", async (data) => {
    const str = data.mensagem.replace(/\s/g, "");
    if (str.length > 0) {
      const mensagem =
        await PrivateMessagesController.createPrivateMessage({
          idMessages: data.idMessages,
          idPessoa: data.idPessoa,
          mensagem: data.mensagem,
        });

      io.to([data.idMessages]).emit("mensagemPrivada", mensagem);
    }
  });

  socket.on("disconnect", () => {});
});

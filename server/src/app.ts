import { serverHttp } from "./config/server";
import "./websocket/socket";

serverHttp.listen(process.env.PORTA, () => {
  console.log(`Servidor rodadndo http://localhost:${process.env.PORTA}`);
});

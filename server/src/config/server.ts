import express from "express";
import http from "http";
import cors from "cors";
import { routes } from "../routes/indexRoutes";
const app = express();
const serverHttp = http.createServer(app);

app.use(cors());
routes(app);

export { serverHttp };

import express from "express";
import { AuthController } from "../controllers/auth/authController";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/busca/user", AuthController.FindUser);

export { authRoutes };

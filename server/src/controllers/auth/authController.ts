import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PeopleController } from "../People/peopleController";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const Email_Verification = await PeopleController.findPeopleByEmail(email);
      if (!Email_Verification) {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }

      const Password_Verification = bcrypt.compareSync(senha, Email_Verification.senha);
      if (Password_Verification) {
        // Remover a geração do token JWT
        return res.status(200).json({ message: "Login bem-sucedido", user: { id: Email_Verification.id, nome: Email_Verification.nome } });
      } else {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Erro no servidor", error: e.message });
    }
  }

  // Remover a função verify_JWT, pois não será mais utilizada
  // static async verify_JWT(req: Request, res: Response, next: NextFunction) { ... }

  static async FindUser(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await PeopleController.findPeopleByEmail(email);
      if (user) {
        return res.status(200).json({ id: user.id, nome: user.nome });
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Erro no servidor", error: e.message });
    }
  }

  // Remover o método currentUser, pois não será mais necessário sem JWT
  // static async currentUser(access: string) { ... }
}

import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PessoaController } from "../pessoa/peopleController";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ICustomRequest, IUser } from "./interfaces/interfacePayload";

dotenv.config();

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const Email_Verification = await PessoaController.findPessoaPorEmail(email);
      if (!Email_Verification) {
        res.status(401).json({ message: "Email ou senha incorreto" });
      }

      if (Email_Verification) {
        const Password_Verification = bcrypt.compareSync(senha, Email_Verification.senha);
        if (Password_Verification) {
          const token = jwt.sign(
            { id: Email_Verification.id, nome: Email_Verification.nome },
            process.env.SECRET_JWT as string,
            {
              expiresIn: "15d",
            }
          );
          res.status(200).json({ access: token });
        } else {
          res.status(401).json({ message: "Email ou senha incorreto" });
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async verify_JWT(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, process.env.SECRET_JWT as string);
      (req as ICustomRequest).token = decoded;

      next();
    } catch (e) {
      res.status(401).json();
    }
  }

  static async FindUser(req: Request, res: Response) {
    try {
      const { access } = req.body;

      const decodeToken = jwt.verify(
        access,
        process.env.SECRET_JWT as string
      ) as IUser;

      res.status(200).json({ id: decodeToken.id, nome: decodeToken.nome });
    } catch (e) {
      console.log(e);
      res.status(401).json();
    }
  }

  static async currentUser(access: string) {
    const decodeToken = jwt.verify(
      access,
      process.env.SECRET_JWT as string
    ) as IUser;

    return decodeToken;
  }
}

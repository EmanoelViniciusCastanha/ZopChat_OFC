import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

export interface IUser {
  id: number;
  nome: string;
}

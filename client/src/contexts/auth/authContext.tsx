import { createContext } from "react";
import { User } from "./type/user";
export type AuthContext = {
  usuario: unknown;
  user: User | null;
  signIn: (email: string, senha: string) => Promise<boolean>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContext>(null!);

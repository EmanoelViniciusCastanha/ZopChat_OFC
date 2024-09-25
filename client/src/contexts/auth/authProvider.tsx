import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { User } from "./type/user";
import { webFetch } from "../../config/axiosConfig";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Faz a chamada para verificar se o usuário está autenticado
        const response = await webFetch.get("/busca/user");
        if (response.data) {
          setUser(response.data as User);
        }
      } catch (error) {
        // Se não estiver autenticado, ignore ou faça logout
        console.error("Erro ao validar sessão", error);
      }
    };

    validateSession();
  }, []);

  const signIn = async (email: string, senha: string) => {
    try {
      const login = await webFetch.post("/login", {
        email,
        senha,
      });
      
      if (login.status === 200) {
        setUser(login.data.user as User); // Aqui assumimos que o `user` vem na resposta
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await webFetch.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

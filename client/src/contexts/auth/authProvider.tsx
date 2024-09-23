import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { User } from "./type/user";
import { webFetch } from "../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";



export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (process.env.NODE_ENV === "development") {
        const mockUser: User = {
          id: 1,
          nome: "Emanoel Castanha",
        };
        setUser(mockUser);
        console.log("Autenticação desabilitada no modo de desenvolvimento");
        return;
      }

      const storageData = localStorage.getItem("AuthAccess");
      if (storageData) {
        await webFetch
          .post("/busca/user", {
            access: storageData,
          })
          .then(() => {
            const decodeUser = jwtDecode(storageData) as User;
            webFetch.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${storageData}`;
            setUser(decodeUser);
            setToken(storageData);
          });
      }
    };
    validateToken();
  }, []);

  const signIn = async (email: string, senha: string) => {
    const login = await webFetch.post("/login", {
      email,
      senha,
    });
    const data = login.data;

    if (data.access) {
      const decodeUser = jwtDecode(data.access) as User;
      webFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access}`;
      setUser(decodeUser);
      setToken(data.access);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("AuthAccess");
  };

  const setToken = (access: string) => {
    localStorage.setItem("AuthAccess", access);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

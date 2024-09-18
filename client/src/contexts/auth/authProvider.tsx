import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { User } from "./type/user";
import { webFetch } from "../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("AuthAccess");
      if (storageData) {
        await webFetch
          .post("/busca/user", {
            access: storageData,
          })
          .then(() => {
            const decodeUser = jwtDecode(storageData);
            webFetch.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${storageData}`;
            setUser(decodeUser as User);
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
      const decodeUser = jwtDecode(data.access);
      webFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access}`;
      setUser(decodeUser as User);
      setToken(data.access);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
  };

  const setToken = (access: string) => {
    localStorage.setItem("AuthAccess", access);
  };

  return (
    <AuthContext.Provider value={{ user, signIn: signIn, signOut: signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { User } from "./type/user";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storageData = localStorage.getItem("AuthAccess");
    if (storageData) {
      const fakeUser: User = {
        id: 1,
        nome: "Usuário Fictício",
      };
      setUser(fakeUser);
    }
  }, []);

  const signIn = async (email: string, senha: string) => {
    if (email === "fakeuser@example.com" && senha === "123456") {
      const fakeUser: User = {
        id: 1,
        nome: "Usuário Fictício",
      };
      setUser(fakeUser);
      localStorage.setItem("AuthAccess", "fakeToken123");
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("AuthAccess");
  };

  return (
    <AuthContext.Provider value={{ user, signIn: signIn, signOut: signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

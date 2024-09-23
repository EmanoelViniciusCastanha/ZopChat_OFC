import { useContext } from "react";
import { AuthContext } from "./authContext";
import Login from "../../routes/login/login";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (!auth.user && process.env.NODE_ENV !== "development") {
    return <Login />;
  }

  return children;
};

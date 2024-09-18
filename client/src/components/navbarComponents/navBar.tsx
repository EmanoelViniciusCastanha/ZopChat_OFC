import { Link, useNavigate } from "react-router-dom";
import "./style/navBar.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
const NavBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const deslogar = async () => {
    auth.signOut();
    localStorage.setItem("AuthAccess", "");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>
        <Link to={`/`}>Wave</Link>
      </h2>
      <div className="container-navbar">
        <Link to={"/cadastro/grupo"} className="button-navbar">
          Cadastro de Grupo
        </Link>

        <Link to={"/cadastro/user"} className="button-navbar">
          Cadastro de Usuario
        </Link>

        <button onClick={deslogar} className="button-sair">
          Sair
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

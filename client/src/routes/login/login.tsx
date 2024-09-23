import "./style/loginTela.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";

type Payload = {
  email: string;
  senha: string;
};

const Login = () => {
  const auth = useContext(AuthContext);
  const [payload, setPayload] = useState<Payload>({ email: "", senha: "" });

  const logar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payload.email && payload.senha) {
      await auth
        .signIn(payload.email, payload.senha)
        .then()
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={logar}>
        <div className="form-control-login">
          <label htmlFor="email">Email:</label>
          <input
            className="input-login"
            type="text"
            name="email"
            id="email"
            value={payload.email}
            onChange={(e) =>
              setPayload((old) => ({ ...old, email: e.target.value }))
            }
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="form-control-login">
          <label htmlFor="senha">Senha:</label>
          <input
            className="input-login"
            type="password"
            name="senha"
            id="senha"
            value={payload.senha}
            onChange={(e) =>
              setPayload((old) => ({ ...old, senha: e.target.value }))
            }
            placeholder="Digite sua senha"
          />
        </div>
        <button className="button-login" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

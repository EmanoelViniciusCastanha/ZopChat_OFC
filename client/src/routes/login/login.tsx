import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { Image } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  userEmail: string;
  userPassword: string;
};

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState<FormData>({
    userEmail: "",
    userPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.userEmail && formData.userPassword) {
      await authContext
        .signIn(formData.userEmail, formData.userPassword)
        .then()
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#16181D] space-x-32">
      <div className="bg-[#2E353B] shadow-md rounded-lg overflow-hidden w-[550px]">
        <div className="p-8 w-full">
          <div className="pb-8">
            <h1 className="text-3xl text-white pb-3 font-bold flex items-center">
              Bem-vindo de Volta <span className="ml-2 hand">👋</span>
            </h1>
            <span className="text-[12px] text-white font-normal pb-5">
              Sua comunicação empresarial nunca foi tão fácil. O Zopchat é a solução ideal para otimizar a colaboração entre equipes e melhorar o atendimento ao cliente.
            </span>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div className="space-y-2 w-full">
              <label htmlFor="email" className="text-white">Email</label>
              <div className="w-full">
                <input
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, userEmail: e.target.value }))
                  }
                  placeholder="Digite seu e-mail"
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <label htmlFor="password" className="text-white">Senha</label>
              <div className="w-full relative">
                <input
                  className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                  type={showPassword ? "text" : "password"}
                  value={formData.userPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      userPassword: e.target.value,
                    }))
                  }
                  placeholder="Digite sua senha"
                />
                <div 
                  className="absolute right-3 top-4 text-white cursor-pointer" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 w-full">
              <button
                type="submit"
                className="py-3 w-full bg-[#0e83f0] hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Entrar
              </button>
              <button
                type="button"
                className="py-3 w-full bg-[#00A03C] hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Cadastrar-se
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block bg-cover bg-center select-none">
        <Image src="/src/Imagens/logo.png" />
      </div>
    </div>
  );
};

export default LoginForm;

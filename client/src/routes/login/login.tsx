import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { Image } from "@nextui-org/react";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  email: string;
  senha: string;
};

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.senha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    await authContext
      .signIn(formData.email, formData.senha)
      .then(() => {
        toast.success("Login realizado com sucesso!");
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Erro ao tentar fazer login."
        );
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#16181D] space-x-0 lg:space-x-12 select-none ">
      <div className="bg-[#2E353B] shadow-md rounded-[0px] sm:rounded-lg overflow-hidden w-[550px] sm: select-none">
        <div className="p-8 w-full">
          <div className="pb-8">
            <h1 className="text-[33px] sm:text-3xl text-white pb-3 font-bold">Bem-vindo de Volta <span className="hand">👋</span></h1>
            <span className="text-[13px] sm:text-xs text-justify text-white font-normal pb-5">
              Sua comunicação empresarial nunca foi tão fácil. O Zopchat é a solução ideal para otimizar a colaboração entre equipes e melhorar o atendimento ao cliente.
            </span>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="" className="text-white">Email</label>
              <input
                className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Digite seu e-mail"
              />
            </div>
            <div className="space-y-2 relative">
              <label htmlFor="" className="text-white">Senha</label>
              <input
                className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                type={showPassword ? "text" : "password"}
                value={formData.senha}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    senha: e.target.value,
                  }))
                }
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center text-white"
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="py-3 w-full bg-[#0e83f0] hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Toaster position="top-center" richColors />
        <div className="hidden lg:block bg-cover bg-center select-none w-[700px]">
          <Image src="/src/Imagens/logo.png" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

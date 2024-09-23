import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { Image, Input } from "@nextui-org/react";
import { toast, Toaster } from "sonner";

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

    if (!formData.userEmail || !formData.userPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    await authContext
      .signIn(formData.userEmail, formData.userPassword)
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
    <div className="flex min-h-screen items-center justify-center bg-[#16181D] space-x-12 ">
      <div className="bg-[#2E353B] shadow-md rounded-lg overflow-hidden w-[550px]">
        <div className="p-8 w-full">
          <div className="pb-8">
            <h1 className="text-2xl text-white pb-3">Bem-vindo de Volta <span className="hand">👋</span></h1>
            <span className="text-xs text-white font-light pb-5">
              Sua comunicação empresarial nunca foi tão fácil. O Zopchat é a solução ideal para otimizar a colaboração entre equipes e melhorar o atendimento ao cliente.
            </span>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="" className="text-white">Email</label>
              <Input
                className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                color="primary"
                size="lg"
                type="email"
                value={formData.userEmail}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, userEmail: e.target.value }))
                }
                placeholder="Digite seu e-mail"

              />
            </div>
            <div className="space-y-2">
              <label htmlFor="" className="text-white">Senha</label>
              <Input
                className="w-full p-4 rounded-lg bg-[#16181D] text-white"
                color="primary"
                size="lg"
                type={showPassword ? "text" : "password"}
                value={formData.userPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    userPassword: e.target.value,
                  }))
                }
                placeholder="Digite sua senha"
                fullWidth
              />
              <button type="button" onClick={togglePasswordVisibility} className="text-white">
                {showPassword ? "Esconder" : "Mostrar"}
              </button>
            </div>

            <div className="flex space-x-4">
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

      <div className="block md:hidden bg-cover bg-center select-none">
        <Image src="/src/Imagens/logo.png" />
      </div>

      <div>
        <Toaster position="top-center" richColors />
        <div className="hidden md:block bg-cover bg-center select-none w-[700px]">
          <Image src="/src/Imagens/logo.png" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

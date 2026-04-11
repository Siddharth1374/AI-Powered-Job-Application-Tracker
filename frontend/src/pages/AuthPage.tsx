import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import { useAuth } from "../hooks/useAuth";

const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
    navigate("/");
    window.location.reload();
  };

  const handleRegister = async (email: string, password: string) => {
    await register({ email, password });
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <LoginForm onLogin={handleLogin} />
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default AuthPage;
import { FormEvent, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

interface Props {
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import api from "./services/api";
import DashboardPage from "./pages/DashboardPage";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const response = await api.post(endpoint, {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.href = "/";
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
      </button>

      <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: "10px" }}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
    </div>
  );
};

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={token ? <Navigate to="/" /> : <AuthPage />}
        />
        <Route
          path="/"
          element={token ? <DashboardPage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
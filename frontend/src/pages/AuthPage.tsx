import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./AuthPage.css";

type Mode = "login" | "register";

const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) await login({ email, password });
      else await register({ email, password });
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : isLogin
          ? "Login failed. Check your email and password."
          : "Registration failed. Try a different email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <span className="blob b-ring" />
      <span className="blob b-zig" />
      <span className="blob b-zig2" />
      <span className="blob b-loop" />
      <span className="blob b-wave" />
      <span className="blob b-squig" />

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo">AI Job Tracker</div>
        <h1>{isLogin ? "Login" : "Create account"}</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <div className="pw">
          <input
            id="password"
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
          <button
            type="button"
            className="pw-toggle"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        {isLogin && (
          <a className="forgot" href="#forgot">
            Forgot password?
          </a>
        )}

        {error && <p className="auth-error" role="alert">{error}</p>}

        <button className="primary" type="submit" disabled={loading}>
          {loading ? "Please wait…" : isLogin ? "Sign in" : "Register"}
        </button>

        {/* Remove this block if you don't support social login */}
        <p className="divider">or continue with</p>
        <div className="socials">
          <button type="button" aria-label="Continue with Google">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1a6 6 0 1 1 0-12c1.9 0 3.1.8 3.8 1.5l2.6-2.5A9.6 9.6 0 0 0 12 2.4a9.6 9.6 0 1 0 0 19.2c5.5 0 9.2-3.9 9.2-9.3 0-.6-.1-1.1-.2-1.6z"/></svg>
          </button>
          <button type="button" aria-label="Continue with GitHub">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#111" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.300 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.800 1.2 1.8 1.2 3.1 0 4.400-2.7 5.4-5.3 5.7.4.400.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>
          </button>
          <button type="button" aria-label="Continue with Facebook">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.900 11.900v-8.400h-3V12h3V9.400c0-3 1.8-4.700 4.500-4.700 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.900V12h3.400l-.5 3.500h-2.900v8.400A12 12 0 0 0 24 12z"/></svg>
          </button>
        </div>

        <p className="switch">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => setMode(isLogin ? "register" : "login")}>
            {isLogin ? "Register for free" : "Sign in"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;

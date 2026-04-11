import { useEffect, useState } from "react";
import { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "../store/authStore";
import { getMe, loginUser, registerUser } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(getStoredAuth().user);
  const [token, setToken] = useState<string | null>(getStoredAuth().token);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (payload: LoginPayload): Promise<void> => {
    const data = await loginUser(payload);
    setStoredAuth(data.token, data.user);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (payload: RegisterPayload): Promise<void> => {
    const data = await registerUser(payload);
    setStoredAuth(data.token, data.user);
    setUser(data.user);
    setToken(data.token);
  };

  const logout = (): void => {
    clearStoredAuth();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
          setLoading(false);
          return;
        }

        const me = await getMe();
        setUser({
          id: me._id,
          email: me.email
        });
        setToken(storedToken);
      } catch {
        clearStoredAuth();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout
  };
};
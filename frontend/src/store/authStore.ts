import { AuthUser } from "../types/auth";

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

export const getStoredAuth = (): AuthState => {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");

  return {
    token,
    user: rawUser ? JSON.parse(rawUser) : null
  };
};

export const setStoredAuth = (token: string, user: AuthUser): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearStoredAuth = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
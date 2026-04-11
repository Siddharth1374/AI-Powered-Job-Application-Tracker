import api from "./api";
import { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
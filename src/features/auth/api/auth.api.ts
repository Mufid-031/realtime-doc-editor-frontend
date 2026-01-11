import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/axios";
import { useSocketStore } from "@/store/socket.store";

export const loginApi = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const logoutApi = async () => {
  await api.post("/auth/logout");
  useAuthStore.getState().logout();
  useSocketStore.getState().disconnect();
  window.location.href = "/auth/login";
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

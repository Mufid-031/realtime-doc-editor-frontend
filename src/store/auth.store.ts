import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  setToken: (token) => {
    document.cookie = `token=${token}; path=/`;
    set({ token });
  },

  logout: () => {
    document.cookie = "token=; Max-Age=0; path=/";
    set({ token: null });
  },
}));

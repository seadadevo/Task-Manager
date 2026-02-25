import { create } from "zustand";
import type { AuthUser } from "@/interfaces/auth";

export type { AuthUser };

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem("accessToken", token);
    set({ user, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));


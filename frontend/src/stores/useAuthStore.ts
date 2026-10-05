import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export interface User {
  _id: string;
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  imageUrl?: string;
  role: string;
  isAdmin: boolean;
  createdAt?: string;
}

const normalizeUser = (u: any): User | null => {
  if (!u) return null;
  const fullName = u.fullName || u.name || "User";
  const parts = fullName.split(" ");
  return {
    ...u,
    _id: u._id || u.id,
    id: u.id || u._id,
    fullName,
    firstName: u.firstName || parts[0] || fullName,
    lastName: u.lastName || parts.slice(1).join(" ") || "",
    email: u.email || "",
    imageUrl: u.imageUrl || u.avatar || "",
    role: u.role || "user",
    isAdmin: Boolean(u.isAdmin || u.role === "admin"),
  };
};

interface AuthStore {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;

  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (data: { name: string; email: string; password: string; confirmPassword?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkAdminStatus: () => Promise<void>;
  setUser: (user: User | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("beat_token") : null,
  isAdmin: false,
  isLoading: false,
  isLoaded: false,
  error: null,

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const rawUser = res.data?.user || res.data;
      const user = normalizeUser(rawUser);
      const token = res.data?.token;
      if (token) {
        localStorage.setItem("beat_token", token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      set({
        user,
        token: token || null,
        isAdmin: Boolean(user?.isAdmin || user?.role === "admin"),
        isLoading: false,
        isLoaded: true,
        error: null,
      });
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to log in";
      set({ error: msg, isLoading: false });
      throw new Error(msg);
    }
  },

  register: async ({ name, email, password, confirmPassword }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      const rawUser = res.data?.user || res.data;
      const user = normalizeUser(rawUser);
      const token = res.data?.token;
      if (token) {
        localStorage.setItem("beat_token", token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      set({
        user,
        token: token || null,
        isAdmin: Boolean(user?.isAdmin || user?.role === "admin"),
        isLoading: false,
        isLoaded: true,
        error: null,
      });
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to create account";
      set({ error: msg, isLoading: false });
      throw new Error(msg);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("beat_token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      set({
        user: null,
        token: null,
        isAdmin: false,
        isLoading: false,
        isLoaded: true,
        error: null,
      });
    }
  },

  checkAuth: async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("beat_token") : null;
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/auth/me");
      const rawUser = res.data?.user || res.data;
      const user = normalizeUser(rawUser);
      if (user) {
        set({
          user,
          isAdmin: Boolean(user.isAdmin || user.role === "admin"),
          isLoading: false,
          isLoaded: true,
        });
      } else {
        set({ user: null, isAdmin: false, isLoading: false, isLoaded: true });
      }
    } catch {
      localStorage.removeItem("beat_token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      set({ user: null, token: null, isAdmin: false, isLoading: false, isLoaded: true });
    }
  },

  checkAdminStatus: async () => {
    try {
      const res = await axiosInstance.get("/admin/check");
      set({ isAdmin: Boolean(res.data?.admin) });
    } catch {
      const { user } = get();
      set({ isAdmin: Boolean(user?.isAdmin || user?.role === "admin") });
    }
  },

  setUser: (user) => {
    const normalized = normalizeUser(user);
    set({
      user: normalized,
      isAdmin: Boolean(normalized?.isAdmin || normalized?.role === "admin"),
    });
  },

  reset: () => {
    localStorage.removeItem("beat_token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    set({
      user: null,
      token: null,
      isAdmin: false,
      isLoading: false,
      isLoaded: true,
      error: null,
    });
  },
}));

// Backward compatibility alias for useAuthStro
export const useAuthStro = useAuthStore;

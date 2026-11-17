"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { name: string; email: string; storeName: string };

type AuthContextValue = {
  user: User | null;
  login: (email: string) => void;
  register: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "zemestan-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) setUser(JSON.parse(raw) as User);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: (email) => {
      const next = { name: "کاربر زمستان", email, storeName: "فروشگاه من" };
      setUser(next);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    register: (next) => {
      setUser(next);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    logout: () => {
      setUser(null);
      window.localStorage.removeItem(STORAGE_KEY);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

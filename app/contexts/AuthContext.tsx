"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // 初期値としてlocalStorageから読み込む（クライアントサイドのみ）
  const [user, setUser] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("win95_user");
    }
    return null;
  });

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("win95_user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("win95_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

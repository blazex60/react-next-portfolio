"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // クライアントサイドでマウント後にlocalStorageから復元
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("win95_user");
      if (savedUser) {
        setUser(savedUser);
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("win95_user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("win95_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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

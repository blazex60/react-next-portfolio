"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginScreen from "./LoginScreen";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { user, login, isLoading } = useAuth();

  if (isLoading) {
    // ローディング画面（Windows 95風）
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#008080]">
        <div className="win95-border bg-[#c0c0c0] p-8 flex flex-col items-center gap-4">
          <div className="text-4xl">⏳</div>
          <div className="text-sm">Loading Windows 95...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={login} />;
  }

  return <>{children}</>;
}

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ja" | "en";

type Translations = {
  ja: {
    [key: string]: string;
  };
  en: {
    [key: string]: string;
  };
};

const translations: Translations = {
  ja: {
    loginTitle: "ログイン",
    username: "ユーザー名",
    password: "パスワード",
    login: "ログイン",
    selectLanguage: "言語選択",
    japanese: "日本語",
    english: "English",
    welcome: "ようこそ",
    enterUsername: "ユーザー名を入力してください",
    enterPassword: "パスワードを入力してください",
  },
  en: {
    loginTitle: "Login",
    username: "Username",
    password: "Password",
    login: "Login",
    selectLanguage: "Select Language",
    japanese: "日本語",
    english: "English",
    welcome: "Welcome",
    enterUsername: "Please enter your username",
    enterPassword: "Please enter your password",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ja");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

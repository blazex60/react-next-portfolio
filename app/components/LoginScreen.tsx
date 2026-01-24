"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

type LoginScreenProps = {
  onLogin: (username: string) => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { language, setLanguage, t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#008080] overflow-hidden">
      {/* Windows 95 風の背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
        }}></div>
      </div>

      {/* ログインウィンドウ */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="win95-border bg-[#c0c0c0] shadow-2xl">
          {/* タイトルバー */}
          <div className="win95-title-bar flex items-center justify-between px-1 py-0.5">
            <div className="flex items-center gap-1">
              <span className="text-sm">🔐</span>
              <span className="font-bold text-sm">{t("loginTitle")}</span>
            </div>
            <div className="flex gap-0.5">
              <button className="win95-button px-2 text-xs h-4 flex items-center" disabled>
                _
              </button>
              <button className="win95-button px-1.5 text-xs h-4 flex items-center" disabled>
                ×
              </button>
            </div>
          </div>

          {/* コンテンツ */}
          <div className="p-6">
            {/* 言語選択 */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold">{t("selectLanguage")}:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage("ja")}
                  className={`win95-button px-3 py-1 text-sm ${
                    language === "ja" ? "win95-button-pressed" : ""
                  }`}
                >
                  {t("japanese")}
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`win95-button px-3 py-1 text-sm ${
                    language === "en" ? "win95-button-pressed" : ""
                  }`}
                >
                  {t("english")}
                </button>
              </div>
            </div>

            {/* Windows 95 ロゴ風 */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg transform rotate-45">
                  <span className="transform -rotate-45">W</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#000080]">Windows 95</div>
                  <div className="text-xs text-gray-600">Portfolio Edition</div>
                </div>
              </div>
            </div>

            {/* ログインフォーム */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">
                  {t("username")}:
                </label>
                <div className="win95-border-in bg-white">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-2 py-1 text-sm outline-none bg-transparent"
                    placeholder={t("enterUsername")}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">
                  {t("password")}:
                </label>
                <div className="win95-border-in bg-white">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 py-1 text-sm outline-none bg-transparent"
                    placeholder={t("enterPassword")}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="win95-button px-6 py-2 font-bold"
                  disabled={!username.trim()}
                >
                  {t("login")} &gt;&gt;
                </button>
              </div>
            </form>

            {/* ヒント */}
            <div className="mt-4 pt-4 border-t-2 border-gray-400 text-xs text-gray-600 text-center">
              <div className="mb-1">💡 {language === "ja" ? "ヒント" : "Tip"}:</div>
              <div>
                {language === "ja" 
                  ? "任意のユーザー名を入力してEnterキーを押してください"
                  : "Enter any username and press Enter key"}
              </div>
            </div>
          </div>
        </div>

        {/* シャドウ効果 */}
        <div className="absolute top-2 left-2 right-2 bottom-2 bg-black opacity-20 -z-10"></div>
      </div>
    </div>
  );
}

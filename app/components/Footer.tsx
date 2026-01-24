"use client";

import { useWindows } from "../contexts/WindowContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState, useRef } from "react";

export const Footer = () => {
  const { windows, minimizeWindow, focusWindow, restoreWindow } = useWindows();
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 時刻初期化と更新を関数化
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime(); // 初回実行
    const timer = setInterval(updateTime, 1000); // 1秒ごとに更新

    return () => clearInterval(timer);
  }, []);

  // 外側クリックでメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowWelcome(false);
      }
    };

    if (showWelcome) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWelcome]);

  const handleTaskClick = (windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (!window) return;

    if (window.isMinimized) {
      restoreWindow(windowId);
      focusWindow(windowId);
    } else {
      // アクティブなウィンドウをクリックした場合は最小化
      const maxZ = Math.max(...windows.map(w => w.zIndex), 0);
      if (window.zIndex === maxZ) {
        minimizeWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#c0c0c0] win95-border-out p-1 flex items-center justify-between h-10 select-none">
      
      {/* 左側：スタートボタンとタスク */}
      <div className="flex items-center gap-2 grow overflow-x-auto">
        
        {/* スタートボタン */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowWelcome(!showWelcome)}
            className={`win95-border-out flex items-center gap-1 px-2 py-0.5 font-bold shrink-0 ${
              showWelcome ? "win95-button-pressed" : ""
            }`}
          >
            <span className="text-lg">🪟</span>
            <span className="mt-0.5">Start</span>
          </button>

          {/* スタートメニュー */}
          {showWelcome && (
            <div className="absolute bottom-full left-0 mb-1 win95-border bg-[#c0c0c0] min-w-48 shadow-lg z-50">
              <div className="flex">
                <div className="bg-linear-to-r from-[#000080] to-[#1084d0] text-white px-2 py-8 text-xs font-bold vertical-text flex items-center justify-center">
                  <div>Windows <span className="font-normal">95</span></div>
                </div>
                <div className="p-2 space-y-1 flex-1">
                  <div className="win95-border-out px-3 py-2 flex items-center gap-2 bg-[#c0c0c0]">
                    <span>👤</span>
                    <div className="text-xs">
                      <div className="font-bold">{t("welcome")}</div>
                      <div className="text-[#000080]">{user}</div>
                    </div>
                  </div>
                  <div className="border-t-2 border-gray-400 my-1"></div>
                  <button 
                    onClick={() => {
                      logout();
                      setShowWelcome(false);
                    }}
                    className="win95-button w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-[#000080] hover:text-white text-left"
                  >
                    <span>🚪</span>
                    <span>{language === "ja" ? "ログアウト" : "Logout"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 区切り線 */}
        <div className="w-0.5 h-6 bg-gray-400 mx-1 border-r border-white shrink-0"></div>

        {/* タスクバーアイテム（開いているウィンドウ） */}
        {windows.map((window) => {
          const isActive = window.zIndex === Math.max(...windows.map(w => w.zIndex), 0);
          return (
            <button
              key={window.id}
              onClick={() => handleTaskClick(window.id)}
              className={`${
                isActive && !window.isMinimized
                  ? "win95-border-in bg-gray-300"
                  : "win95-border-out bg-[#c0c0c0]"
              } px-4 py-1 text-sm flex items-center gap-2 w-40 truncate shrink-0`}
            >
              <span>📄</span>
              <span className="truncate">{window.title}</span>
            </button>
          );
        })}
      </div>

      {/* 右側：時計（タスクトレイ） */}
      <div className="win95-border-in bg-[#c0c0c0] px-4 py-1 text-xs flex items-center gap-2 shrink-0">
        <span className="text-base">🔈</span>
        <span>{currentTime}</span>
      </div>
    </footer>
  );
};
"use client";

import { useWindows } from "../contexts/WindowContext";
import { useEffect, useState } from "react";

export const Footer = () => {
  const { windows, minimizeWindow, focusWindow, restoreWindow } = useWindows();
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    // 1秒ごとに時刻を更新
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        <button className="win95-border-out flex items-center gap-1 px-2 py-0.5 active:shadow-[inset_1px_1px_0px_#000000] active:translate-y-px font-bold shrink-0">
          <span className="text-lg">🪟</span>
          <span className="mt-0.5">Start</span>
        </button>

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
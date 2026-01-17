"use client";

import { useState } from "react";
import Link from "next/link";
import { Win95Window } from "./RetroUI";
import { Blog } from "@/libs/microcms";

// アイコンコンポーネント（onClick対応版に拡張）
const DesktopIcon = ({ 
  label, 
  icon, 
  href, 
  onClick 
}: { 
  label: string; 
  icon: string; 
  href?: string; 
  onClick?: () => void; 
}) => {
  const Wrapper = href ? Link : "div";
  return (
    <Wrapper 
      {...(href ? { href } : {})}
      onClick={onClick}
      className="group flex flex-col items-center gap-1 w-20 p-2 hover:bg-[#000080]/30 border border-transparent hover:border-dotted hover:border-white rounded-sm cursor-pointer mb-4 select-none"
    >
      <div className="text-4xl filter drop-shadow-md">{icon}</div>
      <span className="text-white text-xs text-center px-1 bg-[#008080] group-hover:bg-[#000080]">
        {label}
      </span>
    </Wrapper>
  );
};

type DesktopProps = {
  contents: Blog[];
};

export const Desktop = ({ contents }: DesktopProps) => {
  // ウィンドウの開閉状態を管理
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  // ウィンドウを開く関数
  const openWindow = () => setIsWindowOpen(true);
  
  // ウィンドウを閉じる関数
  const closeWindow = () => setIsWindowOpen(false);

  return (
    <div className="max-w-5xl mx-auto font-sans flex flex-col md:flex-row gap-8 h-full">
      {/* 1. デスクトップアイコンエリア */}
      <div className="flex flex-row md:flex-col gap-4 p-2 flex-wrap content-start">
        {/* onClickでウィンドウを開くように設定 */}
        <DesktopIcon onClick={openWindow} label="My Computer" icon="💻" />
        
        <DesktopIcon href="/about" label="Profile.txt" icon="📄" />
        <DesktopIcon href="/contact" label="Mail" icon="📧" />
        <DesktopIcon href="https://github.com" label="GitHub" icon="🐙" />
        
        {/* ゴミ箱（飾り：クリックでアラートを出しても面白いかも） */}
        <DesktopIcon 
          onClick={() => alert("Access Denied.")} 
          label="Trash" 
          icon="🗑️" 
        />
      </div>

      {/* 2. メインウィンドウエリア */}
      <div className="flex-grow pt-4 min-h-[500px]">
        {isWindowOpen && (
          <Win95Window 
            title="C:\Users\Admin\Blog_Articles" 
            onClose={closeWindow} // ▼ 閉じるボタンにstate変更関数を渡す
          >
            {/* ツールバー風装飾 */}
            <div className="flex gap-4 border-b border-gray-400 pb-2 mb-4 text-sm select-none">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Help</span>
            </div>

            <div className="bg-white win95-border-in p-4 min-h-[400px]">
              <div className="grid grid-cols-1 gap-1">
                {contents.length === 0 ? (
                  <p className="text-sm">0 objects</p>
                ) : (
                  contents.map((blog) => (
                    <Link key={blog.id} href={`/blog/${blog.id}`} className="flex items-center gap-2 p-1 hover:bg-[#000080] hover:text-white cursor-pointer group">
                      <span className="text-xl">📄</span>
                      <div className="flex-grow text-sm truncate">
                        {blog.title}.txt
                      </div>
                      <div className="hidden sm:block text-xs text-gray-500 group-hover:text-gray-300 w-32 text-right">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    </Link>
                  ))
                )}
              </div>
              
              <div className="mt-4 pt-2 border-t border-gray-200 text-xs text-gray-500">
                {contents.length} object(s)
              </div>
            </div>
          </Win95Window>
        )}
      </div>
    </div>
  );
};
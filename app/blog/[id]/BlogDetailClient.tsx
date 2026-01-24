"use client";

import { useEffect } from "react";
import parse from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Win95Window } from "@/app/components/RetroUI";
import { useWindows } from "@/app/contexts/WindowContext";
import { Blog } from "@/libs/microcms";
import Link from "next/link";

// デスクトップアイコン
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

type BlogDetailClientProps = {
  blog: Blog;
};

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const { 
    windows, 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow,
    updateWindowPosition
  } = useWindows();

  const parseOptions = {
    replace: (domNode: {name?: string; children?: {name?: string; attribs?: {class?: string}; children?: {data?: string}[]}[]}) => {
      if (domNode.name === "pre") {
        const codeNode = domNode.children?.[0];
        if (codeNode && codeNode.name === "code") {
          const className = codeNode.attribs?.class || "";
          const language = className.replace("language-", "");
          const codeString = codeNode.children?.[0]?.data || "";
          return (
            <div className="my-4 border-2 border-gray-400">
              <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div" customStyle={{ margin: 0 }}>
                {codeString}
              </SyntaxHighlighter>
            </div>
          );
        }
      }
    },
  };

  useEffect(() => {
    const windowId = `blog-${blog.id}`;
    // 既に開いている場合はスキップ
    if (windows.find(w => w.id === windowId)) {
      return;
    }
    
    // ページ読み込み時にブログウィンドウを開く
    openWindow({
      id: windowId,
      title: `${blog.title} - Notepad`,
      x: 180,
      y: 80,
      width: 800,
      height: 600,
      content: (
        <>
          <div className="flex gap-4 px-2 py-1 text-sm border-b border-gray-400 mb-2 select-none">
            <span className="underline">File</span>
            <span className="underline">Edit</span>
            <span className="underline">Search</span>
            <span className="underline">Help</span>
          </div>

          <div className="win95-border-in bg-white p-6 min-h-[400px]">
            <header className="mb-6 border-b border-dashed border-gray-400 pb-4">
              <h1 className="text-2xl font-bold mb-2 font-mono">{blog.title}</h1>
              <div className="flex gap-4 text-xs text-gray-500 font-mono">
                <time>DATE: {new Date(blog.publishedAt).toLocaleDateString()}</time>
                <span>CAT : {blog.category?.name}</span>
              </div>
            </header>

            <div className="prose max-w-none font-mono text-sm leading-relaxed">
              {parse(blog.content, parseOptions)}
            </div>
          </div>
        </>
      ),
    });

    // ページ離脱時にウィンドウを閉じる
    return () => {
      closeWindow(windowId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-full mx-auto font-sans flex flex-col md:flex-row gap-8 h-full relative pb-8">
      {/* デスクトップアイコンエリア */}
      <div className="flex flex-row md:flex-col gap-4 p-2 flex-wrap content-start z-10">
        <DesktopIcon href="/" label="My Computer" icon="💻" />
        <DesktopIcon href="/about" label="Profile.txt" icon="📄" />
        <DesktopIcon href="/contact" label="Mail" icon="📧" />
        <DesktopIcon href="https://github.com" label="GitHub" icon="🐙" />
        <DesktopIcon 
          onClick={() => alert("Access Denied.")} 
          label="Trash" 
          icon="🗑️" 
        />
      </div>

      {/* ウィンドウ描画エリア */}
      {windows.map((window) => (
        !window.isMinimized && (
          <Win95Window
            key={window.id}
            title={window.title}
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            zIndex={window.zIndex}
            isMaximized={window.isMaximized}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
          >
            {window.content}
          </Win95Window>
        )
      ))}
    </div>
  );
}

"use client";

import { Win95Window } from "./RetroUI";
import { Blog, Profile } from "@/libs/microcms";
import { useWindows } from "../contexts/WindowContext";
import { useActionState } from "react";
import { submitContactForm, ContactState } from "../contact/actions";
import { Win95Button } from "./RetroUI";
import parse, { DOMNode, Element } from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const initialContactState: ContactState = {
  success: false,
  message: "",
};

// アイコンコンポーネント
const DesktopIcon = ({ 
  label, 
  icon, 
  onClick 
}: { 
  label: string; 
  icon: string; 
  onClick?: () => void; 
}) => {
  return (
    <div 
      onClick={onClick}
      className="group flex flex-col items-center gap-1 w-20 p-2 hover:bg-[#000080]/30 border border-transparent hover:border-dotted hover:border-white rounded-sm cursor-pointer mb-4 select-none"
    >
      <div className="text-4xl filter drop-shadow-md">{icon}</div>
      <span className="text-white text-xs text-center px-1 bg-[#008080] group-hover:bg-[#000080]">
        {label}
      </span>
    </div>
  );
};

type DesktopProps = {
  blogs: Blog[];
  profileData: Profile;
};

export const Desktop = ({ blogs, profileData }: DesktopProps) => {
  const { 
    windows, 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow,
    updateWindowPosition
  } = useWindows();

  const [contactState, contactFormAction, isContactPending] = useActionState(submitContactForm, initialContactState);
  // HTMLパース用のオプション
  const parseOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const codeNode = domNode.children?.[0];
        if (codeNode instanceof Element && codeNode.name === "code") {
          const className = codeNode.attribs?.class || "";
          const language = className.replace("language-", "");
          const textNode = codeNode.children?.[0];
          const codeString = textNode && 'data' in textNode ? textNode.data : "";
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

  // カスケード表示用の初期位置計算
  const getNextWindowPosition = () => {
    const baseX = 150;
    const baseY = 80;
    const offset = 30;
    const count = windows.length;
    return {
      x: baseX + (count * offset),
      y: baseY + (count * offset),
    };
  };

  const handleOpenBlogDetail = (blog: Blog) => {
    const { x, y } = getNextWindowPosition();
    openWindow({
      id: `blog-${blog.id}`,
      title: `${blog.title} - Notepad`,
      x,
      y,
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

          <div className="win95-border-in bg-white p-6 min-h-100">
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
  };

  const handleOpenBlogWindow = () => {
    const { x, y } = getNextWindowPosition();
    openWindow({
      id: "blog-list",
      title: "C:\\Users\\Admin\\Blog_Articles",
      x,
      y,
      width: 700,
      height: 500,
      content: (
        <>
          <div className="flex gap-4 border-b border-gray-400 pb-2 mb-4 text-sm select-none">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Help</span>
          </div>

          <div className="bg-white win95-border-in p-4 min-h-100">
            <div className="grid grid-cols-1 gap-1">
              {blogs.length === 0 ? (
                <p className="text-sm">0 objects</p>
              ) : (
                blogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => handleOpenBlogDetail(blog)}
                    className="flex items-center gap-2 p-1 hover:bg-[#000080] hover:text-white cursor-pointer group"
                  >
                    <span className="text-xl">📄</span>
                    <div className="grow text-sm truncate">
                      {blog.title}.txt
                    </div>
                    <div className="hidden sm:block text-xs text-gray-500 group-hover:text-gray-300 w-32 text-right">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-4 pt-2 border-t border-gray-200 text-xs text-gray-500">
              {blogs.length} object(s)
            </div>
          </div>
        </>
      ),
    });
  };

  const handleOpenProfileWindow = () => {
    const { x, y } = getNextWindowPosition();
    openWindow({
      id: "profile",
      title: "System_Properties.exe",
      x,
      y,
      width: 700,
      height: 600,
      content: (
        <>
          <div className="flex gap-6 mb-8 items-start">
            <div className="text-6xl select-none">🖥️</div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{profileData?.name || "Unknown"}</h1>
              <p className="text-[#000080] font-bold mb-4">
                {profileData?.role || ""}
              </p>
              <div className="win95-border-in bg-white p-4 h-32 overflow-y-scroll text-sm leading-relaxed">
                {profileData?.summary || ""}
              </div>
            </div>
          </div>

          <section className="mb-8">
            <fieldset className="border border-white shadow-[inset_1px_1px_0px_#808080,1px_1px_0px_#ffffff] p-4">
              <legend className="px-1 text-sm">Technical Skills</legend>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {profileData?.skills?.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <div className="flex gap-0.5 border border-gray-500 bg-white p-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-3 w-4 border border-gray-400 ${
                            i < Math.round(skill.level)
                              ? "bg-[#000080]"
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </section>

          <section>
            <fieldset className="border border-white shadow-[inset_1px_1px_0px_#808080,1px_1px_0px_#ffffff] p-4">
              <legend className="px-1 text-sm">History.log</legend>
              <div className="win95-border-in bg-white p-2 h-48 overflow-y-scroll font-mono text-sm">
                {profileData?.histories?.map((item, index) => (
                  <div key={index} className="mb-4">
                    <span className="text-gray-500">[{item.year}]</span>
                    <div className="font-bold">{item.title}</div>
                    <div className="pl-4 border-l-2 border-gray-300 ml-1 text-xs text-gray-700">
                      &gt; {item.description}
                    </div>
                  </div>
                ))}
                <div className="animate-pulse">_</div>
              </div>
            </fieldset>
          </section>
        </>
      ),
    });
  };

  const handleOpenContactWindow = () => {
    const { x, y } = getNextWindowPosition();
    openWindow({
      id: "contact",
      title: "Compose New Message",
      x,
      y,
      width: 650,
      height: 550,
      content: (
        <>
          {contactState.success ? (
            <div className="text-center py-10 bg-white win95-border-in m-4">
              <h2 className="text-xl font-bold text-[#000080] mb-4">Message Sent</h2>
              <p className="mb-6 text-sm">{contactState.message}</p>
              <Win95Button onClick={() => closeWindow("contact")}>
                OK
              </Win95Button>
            </div>
          ) : (
            <form action={contactFormAction} className="p-2 space-y-4">
              <div className="flex gap-4 pb-2 border-b border-white shadow-[0_1px_0_#808080] mb-4 select-none text-sm">
                <span className="flex items-center gap-1">✉️ Send</span>
                <span className="text-gray-500">📎 Attach</span>
              </div>

              {contactState.message && !contactState.success && (
                <div className="p-2 bg-red-100 text-red-600 text-sm border border-red-500">
                  ⚠ {contactState.message}
                </div>
              )}

              <div className="flex items-center gap-2">
                <label htmlFor="name" className="w-20 text-right text-sm">To (Name):</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={contactState.inputs?.name}
                  className="flex-1 p-1 win95-border-in focus:outline-none font-mono bg-white"
                />
              </div>
              {contactState.errors?.name && <p className="ml-20 text-red-600 text-xs">{contactState.errors.name[0]}</p>}

              <div className="flex items-center gap-2">
                <label htmlFor="email" className="w-20 text-right text-sm">From (Email):</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={contactState.inputs?.email}
                  className="flex-1 p-1 win95-border-in focus:outline-none font-mono bg-white"
                />
              </div>
              {contactState.errors?.email && <p className="ml-20 text-red-600 text-xs">{contactState.errors.email[0]}</p>}

              <div className="mt-4">
                <textarea
                  id="message"
                  name="message"
                  rows={8}
                  defaultValue={contactState.inputs?.message}
                  className="w-full p-2 win95-border-in focus:outline-none font-mono bg-white resize-none"
                  placeholder="Type your message here..."
                ></textarea>
                {contactState.errors?.message && <p className="text-red-600 text-xs">{contactState.errors.message[0]}</p>}
              </div>

              <div className="flex justify-end pt-2">
                <Win95Button type="submit" disabled={isContactPending} className="w-32">
                  {isContactPending ? "Sending..." : "Send Mail"}
                </Win95Button>
              </div>
            </form>
          )}
        </>
      ),
    });
  };

  return (
    <div className="max-w-full mx-auto font-sans flex flex-col md:flex-row gap-8 h-full relative">
      {/* 1. デスクトップアイコンエリア */}
      <div className="flex flex-row md:flex-col gap-4 p-2 flex-wrap content-start z-10">
        <DesktopIcon onClick={handleOpenBlogWindow} label="My Computer" icon="💻" />
        <DesktopIcon onClick={handleOpenProfileWindow} label="Profile.txt" icon="📄" />
        <DesktopIcon onClick={handleOpenContactWindow} label="Mail" icon="📧" />
        <DesktopIcon onClick={() => window.open("https://github.com", "_blank")} label="GitHub" icon="🐙" />
        <DesktopIcon 
          onClick={() => alert("Access Denied.")} 
          label="Trash" 
          icon="🗑️" 
        />
      </div>

      {/* 2. ウィンドウ描画エリア */}
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
            onPositionChange={(x: number, y: number) => updateWindowPosition(window.id, x, y)}
          >
            {window.content}
          </Win95Window>
        )
      ))}
    </div>
  );
};
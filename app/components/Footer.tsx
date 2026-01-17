import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#c0c0c0] win95-border-out p-1 flex items-center justify-between h-10 select-none">
      
      {/* 左側：スタートボタンとタスク */}
      <div className="flex items-center gap-2 flex-grow">
        
        {/* スタートボタン */}
        <button className="win95-border-out flex items-center gap-1 px-2 py-0.5 active:shadow-[inset_1px_1px_0px_#000000] active:translate-y-[1px] font-bold">
          <span className="text-lg">🪟</span>
          <span className="mt-0.5">Start</span>
        </button>

        {/* 区切り線 */}
        <div className="w-[2px] h-6 bg-gray-400 mx-1 border-r border-white"></div>

        {/* タスクバーアイテム（ナビゲーションリンク） */}
        {/* 押されているように見せるため win95-border-in (凹み) を使うのもアリですが、今回はボタン風にします */}
        <Link href="/" className="win95-border-out bg-[#c0c0c0] px-4 py-1 text-sm flex items-center gap-2 active:win95-border-in active:bg-gray-300 w-32 truncate">
          <span>📝</span> Blog
        </Link>
        
        <Link href="/about" className="win95-border-out bg-[#c0c0c0] px-4 py-1 text-sm flex items-center gap-2 active:win95-border-in active:bg-gray-300 w-32 truncate">
          <span>👨‍💻</span> Profile
        </Link>

        <Link href="/contact" className="win95-border-out bg-[#c0c0c0] px-4 py-1 text-sm flex items-center gap-2 active:win95-border-in active:bg-gray-300 w-32 truncate">
          <span>📧</span> Contact
        </Link>
      </div>

      {/* 右側：時計（タスクトレイ） */}
      <div className="win95-border-in bg-[#c0c0c0] px-4 py-1 text-xs flex items-center gap-2">
        <span className="text-base">🔈</span>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </footer>
  );
};
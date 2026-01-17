import Link from "next/link";

export const Header = () => {
  return (
    <header className="win95-border-out bg-[#c0c0c0] mb-8 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* スタートボタン風ロゴ */}
        <Link href="/" className="win95-border-out flex items-center gap-2 px-2 py-1 active:shadow-inner bg-[#c0c0c0]">
          <span className="text-xl">💻</span>
          <span className="font-bold text-black">Start Portfolio</span>
        </Link>

        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/" className="text-black hover:underline decoration-2">
            📂 Blog
          </Link>
          <Link href="/about" className="text-black hover:underline decoration-2">
            👨‍💻 Profile
          </Link>
          <Link href="/contact" className="text-black hover:underline decoration-2">
            📧 Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};
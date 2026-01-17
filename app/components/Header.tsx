import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b bg-white dark:bg-black dark:border-gray-800 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80">
      <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* ロゴエリア */}
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition">
          Portfolio
        </Link>

        {/* ナビゲーション */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Blog
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};
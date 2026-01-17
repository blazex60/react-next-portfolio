import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
// Headerは削除
import { Footer } from "./components/Footer";

const dotGothic = DotGothic16({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dot-gothic",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Web Developer & Backend Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${dotGothic.className} antialiased min-h-screen flex flex-col`}
        // 背景色
        style={{ backgroundColor: "#008080", color: "#000" }}
      >
        {/* Headerは削除しました */}
        
        {/* メインコンテンツ（デスクトップ領域） */}
        <div className="flex-grow w-full p-4 pb-16"> 
          {/* pb-16: タスクバーの分だけ余白を空ける */}
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
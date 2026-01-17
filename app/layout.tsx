import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 作成したコンポーネントをインポート
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col text-gray-900 dark:text-gray-100 bg-white dark:bg-black`}
      >
        <Header />
        
        {/* メインコンテンツエリア */}
        <div className="flex-grow w-full">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
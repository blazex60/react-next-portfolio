import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import { WindowProvider } from "./contexts/WindowContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AuthWrapper from "./components/AuthWrapper";

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
        style={{ backgroundColor: "#008080", color: "#000" }}
      >
        <AuthProvider>
          <LanguageProvider>
            <WindowProvider>
              <AuthWrapper>
                <div className="grow w-full p-4 pb-16"> 
                  {children}
                </div>

                <Footer />
              </AuthWrapper>
            </WindowProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
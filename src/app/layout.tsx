import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recruitment Terminal",
  description: "公開求人検索ツールのポートフォリオMVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 画面が表示される前にテーマを決めて、ライト/ダーク切り替え時のちらつきを防ぐ。
  const themeScript = `
    (() => {
      try {
        const savedTheme = localStorage.getItem("theme");
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        const theme = savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : prefersLight ? "light" : "dark";
        document.documentElement.classList.toggle("light", theme === "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
      } catch {
        document.documentElement.classList.add("dark");
      }
    })();
  `;

  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}

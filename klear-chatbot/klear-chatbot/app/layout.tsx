import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klear Brand AI",
  description: "Klear Intelligence — K-Beauty Brand AI Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-klear-cream min-h-screen">{children}</body>
    </html>
  );
}

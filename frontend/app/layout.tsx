import type { Metadata } from "next";
import { Gowun_Batang } from "next/font/google";
import "./globals.css";

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ulimate To-Do App",
  description: "To-Do app that was coded and designed by Nail Rizatdinov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gowunBatang.variable} antialiased`}>{children}</body>
    </html>
  );
}

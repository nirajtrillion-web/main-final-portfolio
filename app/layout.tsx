import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Developer Bhai | Full-Stack Web Architect",
  description:
    "Portfolio of Developer Bhai - Full-Stack Web Architect specializing in Next.js, Supabase, Tailwind CSS, and edge performance engineering.",
  keywords: [
    "Developer Bhai",
    "Next.js",
    "React",
    "Supabase",
    "TypeScript",
    "Tailwind CSS",
    "Full-Stack Architect",
    "Vercel Edge",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-[#070709] text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}

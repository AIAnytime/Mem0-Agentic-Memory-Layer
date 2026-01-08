import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mem0 Playground | Memory Layer for Agentic AI",
  description:
    "Enterprise-grade demonstration of Mem0 - A self-improving memory layer for Agentic AI applications with Neo4j Graph Store integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VyomAi Solutions Pvt Ltd | AI, Automation & Corporate Services",
  description:
    "VyomAi Solutions Pvt Ltd delivers AI chatbots, AI agents, process automation, digital marketing, full-stack app development, and legal corporate services worldwide.",
  keywords: [
    "VyomAi",
    "AI Chatbots",
    "Process Automation",
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "Legal Corporate Services",
    "Next.js AI Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white`}>
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}

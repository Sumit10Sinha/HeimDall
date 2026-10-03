import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { WorkspaceProvider } from "@/context/WorkspaceContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HeimDall — Enterprise Workspace",
  description: "Unified AI-grounded company intelligence and management platform",
  icons: {
    icon: "/logo.png", // Points directly to public/logo.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans text-base antialiased transition-colors duration-200 bg-white dark:bg-[#202124]`}>
        <WorkspaceProvider>
          {children}
        </WorkspaceProvider>
      </body>
    </html>
  );
}
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AuthModalProvider } from "@/lib/context/auth-modal-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { Metadata } from "next";
import { Toaster } from "sonner";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });


export const metadata: Metadata = {
  title: "EduNovia - Learning and streaming Platform.",
  description: "A modern web application built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <QueryProvider>
          <AuthModalProvider>
            {children}
            <AuthModal />
             <Toaster position="top-center" richColors />
          </AuthModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
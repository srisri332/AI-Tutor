import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/Theme-Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tutor",
  description: "AI Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

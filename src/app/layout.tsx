import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import FullPageHeader from "@/components/layout/FullPageHeader";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative w-full h-full min-h-screen flex flex-col">
        <MantineProvider>
          <div className="flex-1">
            <div className="relative w-full">
              <FullPageHeader />
            </div>
            {children}
          </div>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}

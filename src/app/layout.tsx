import type { Metadata } from "next";
import { mantineTheme } from "@/components/MantineTheme";
import { DM_Sans, Bokor } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import FullPageHeader from "@/components/layout/FullPageHeader";
import Footer from "@/components/layout/Footer";
import CartProviderComponent from "@/components/order/CartProviderComponent";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "earlybird",
  description: "website for the earlybird cafe in Rotorua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`flex flex-col min-h-screen  ${dmSans.className}`}>
        <div className="z-10 absolute top-0 w-full">
          <FullPageHeader />
        </div>
        <main className="text-sm sm:text-base flex-1 w-full">
          <MantineProvider theme={mantineTheme}>
            <CartProviderComponent>{children}</CartProviderComponent>
          </MantineProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}

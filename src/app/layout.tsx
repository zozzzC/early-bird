import Footer from "@/components/layout/Footer";
import FullPageHeader from "@/components/layout/FullPageHeader";
import { mantineTheme } from "@/components/MantineTheme";
import CartProviderComponent from "@/components/wrappers/CartProviderComponent";
import { getOrderItems } from "@/lib/orderItems";
import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import OrderItemsComponent from "@/components/wrappers/OrderItemsComponent";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orderItems = await getOrderItems();

  console.log("got order items");
  console.log(orderItems);
  return (
    <html lang="en" className="h-full">
      <body className={`flex flex-col min-h-screen  ${dmSans.className}`}>
        <div className="z-10 absolute top-0 w-full">
          <FullPageHeader />
        </div>
        <main className="text-sm sm:text-base flex-1 w-full">
          <MantineProvider theme={mantineTheme}>
            <OrderItemsComponent orderItems={orderItems}>
              <CartProviderComponent orderItems={orderItems}>
                {children}
              </CartProviderComponent>
            </OrderItemsComponent>
          </MantineProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}

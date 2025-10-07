import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "@/component/head";
import Foot from "@/component/foot";
import { CartProvider } from "@/component/cartFunction";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-COMMERCE WEBSITE/APP",
  description: "Shop the latest trends in fashion, electronics, home essentials, and more—all in one place. Fast shipping, secure checkout, and unbeatable deals every day.",
  icons:{
    icon:"/icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <CartProvider >
            <Head />
            <main className="flex-grow">
              {children}
            </main>
            <Foot />
        </CartProvider>
      </body>
    </html>
  );
}

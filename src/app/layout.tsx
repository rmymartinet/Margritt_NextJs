import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "./context/CardContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Margritt",
  description: "Margritt is an artist who shows her art gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative p-2 antialiased md:px-[4vw]`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

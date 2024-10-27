"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import "../app/globals.css";
import Transition from "./components/Animations/pagetransition/PageTransition";
import CartSideBar from "./components/CartSidebar";
import Footer from "./components/Footer/Footer";
import MobileNav from "./components/Nav/MobileNavBar";
import Nav from "./components/Nav/NavBar";
import { CartProvider } from "./context/CardContext";
import useWindowWidth from "./hooks/useWindowWidth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width, isMounted } = useWindowWidth();

  useEffect(() => {
    document.title = "Margritt.com";
  }, []);

  const pathname = usePathname();
  const isGallery = /^\/gallery\/[^\/]+$/.test(pathname);

  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <head>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-49TRCET0NT"
            ></Script>
            <Script id="google-analytic">
              {`
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-49TRCET0NT');
    `}
            </Script>
          </head>
          <body className={`relative p-2 antialiased md:px-[4vw]`}>
            <motion.div>
              {isMounted &&
                (!isGallery &&
                pathname !== "/success" &&
                pathname !== "/cancel" ? (
                  width <= 1024 ? (
                    <MobileNav />
                  ) : (
                    <Nav />
                  )
                ) : null)}
              <CartProvider>
                <Transition>{children}</Transition>
                {isMounted && <CartSideBar />}
              </CartProvider>
              {pathname !== "/contact" &&
                pathname !== "/checkout" &&
                pathname !== "/success" &&
                pathname !== "/cancel" &&
                pathname !== "/admin" &&
                pathname !== "/404" && <Footer />}
            </motion.div>
          </body>
        </html>
        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-49TRCET0NT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-49TRCET0NT');
          `}
        </Script>
      </ClerkProvider>
    </>
  );
}

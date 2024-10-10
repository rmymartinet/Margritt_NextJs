"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useEffect } from "react";
import "../app/globals.css";
import Transition from "./components/Animations/pagetransition/PageTransition";
import CartSideBar from "./components/CartSidebar";
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

  return (
    <>
      <ClerkProvider>
        <html lang="fr">
          <body className={`relative p-2 antialiased md:px-[4vw]`}>
            <motion.div>
              {isMounted && (width <= 1024 ? <MobileNav /> : <Nav />)}
              <CartProvider>
                <Transition>{children}</Transition>
                {isMounted && <CartSideBar />}
              </CartProvider>
            </motion.div>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}

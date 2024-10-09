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
  const width = useWindowWidth();
  // const [showLanding, setShowLanding] = useState(
  //   !localStorage.getItem("visited"),
  // );
  // const [count, setCount] = useState(0);
  // const [isRender, setIsRender] = useState(false);
  // const { setFromLoadingPage } = useStore();

  useEffect(() => {
    document.title = "Margritt.com";
  }, []);

  // const startCounting = useCallback(() => {
  //   const start = Date.now();
  //   const intervalId = setInterval(() => {
  //     const elapsed = Date.now() - start;
  //     const newCount = Math.min(Math.floor(elapsed / 30), 100);
  //     setCount(newCount);

  //     if (newCount === 100) {
  //       clearInterval(intervalId);
  //       setIsRender(true);
  //     }
  //   }, 30);
  // }, []);

  // const handleRender = useCallback(() => {
  //   if (count === 100) {
  //     const timer = setTimeout(() => {
  //       localStorage.setItem("visited", "true");
  //       setShowLanding(false);
  //       document.body.style.cursor = "default";
  //       setFromLoadingPage(true);
  //     }, 1600);
  //     return () => clearTimeout(timer);
  //   }
  // }, [count, setFromLoadingPage]);

  // useEffect(() => {
  //   if (localStorage.getItem("visited")) {
  //     setShowLanding(false);
  //   } else {
  //     startCounting();
  //   }
  // }, [startCounting]);

  // useEffect(() => {
  //   handleRender();
  // }, [handleRender]);

  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`relative p-2 antialiased md:px-[4vw]`}>
          {width <= 1024 ? <MobileNav /> : <Nav />}
          <motion.div>
            <CartProvider>
              <Transition>{children}</Transition>
              <CartSideBar />
            </CartProvider>
          </motion.div>
        </body>
      </html>
    </ClerkProvider>
  );
}

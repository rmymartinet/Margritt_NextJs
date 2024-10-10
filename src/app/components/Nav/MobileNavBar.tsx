"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export default function MobileNav() {
  const [isCLicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);
  const handleClickMenu = () => {
    setIsClicked(true);
  };
  const handleClickCloseMenu = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    gsap.set(menuRef.current, { x: "-100%" });
  }, []);

  useGSAP(() => {
    if (isCLicked) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, [isCLicked]);
  return (
    <>
      <div className="flex w-full justify-end p-10">
        <span
          onClick={() => handleClickMenu()}
          className="cursor-pointer rounded-full bg-black px-3 py-2 text-white"
        >
          Menu
        </span>
      </div>

      <nav
        ref={menuRef}
        className="fixed left-0 top-0 z-50 flex h-[105vh] w-full items-center justify-center overflow-hidden bg-black text-white"
      >
        <div
          onClick={() => handleClickCloseMenu()}
          className="absolute right-10 top-10"
        >
          <IoCloseOutline size={25} />
        </div>
        <div className="grid grid-rows-4 place-items-start gap-10 rounded-2xl bg-black text-4xl font-semibold text-white shadow-xl">
          <Link href="/">Accueil</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <Link href={"/checkout"} className="absolute right-10 top-40 p-5">
          <FaShoppingCart size={20} />
        </Link>
      </nav>
    </>
  );
}

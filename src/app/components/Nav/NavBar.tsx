"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"; // Ajoute useUser ici
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Nav() {
  const { user, isLoaded } = useUser();

  const [showOriginals, setShowOriginals] = useState(false);
  const [showPrints, setShowPrints] = useState(false);

  const originalsMenuRef = useRef(null);
  const printsMenuRef = useRef(null);

  const toggleEnterOriginals = () => {
    setShowOriginals(true);
  };

  const toggleLeaveOriginals = () => {
    setShowOriginals(false);
  };

  const toggleEnterPrints = () => {
    setShowPrints(true);
  };

  const toggleLeavePrints = () => {
    setShowPrints(false);
  };


  // Animation pour Originals
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5 } });

    if (showOriginals) {
      tl.fromTo(
        originalsMenuRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1 },
      );
    } else {
      tl.to(originalsMenuRef.current, {
        y: 10,
        opacity: 0,
        onComplete: () => {
          gsap.to(originalsMenuRef.current, { display: "none" });
        },
      });
    }

    // Afficher le menu après la première animation
    if (showOriginals) {
      gsap.to(originalsMenuRef.current, { display: "block" });
    }

    return () => {
      tl.kill(); // Nettoyer l'animation
    };
  }, [showOriginals]);

  // Animation pour Prints
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5 } });

    if (showPrints) {
      tl.fromTo(
        printsMenuRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1 },
      );
    } else {
      tl.to(printsMenuRef.current, {
        y: 10,
        opacity: 0,
        onComplete: () => {
          if (printsMenuRef.current) {
            gsap.to(printsMenuRef.current, { display: "none" });
          }
        },
      });
    }

    // Afficher le menu après la première animation
    if (showPrints && printsMenuRef.current) {
      gsap.to(printsMenuRef.current, { display: "block" });
    }

    return () => {
      tl.kill(); // Nettoyer l'animation
    };
  }, [showPrints]);

  return (
    <nav className="z-50 mb-72 flex items-center justify-center p-2 pt-10">
      <div className="text-md flex gap-20 p-4 font-semibold">
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        {/* Menu Originals */}
        <div
          className="relative"
          onMouseEnter={toggleEnterOriginals}
          onMouseLeave={toggleLeaveOriginals}
        >
          <button className="flex items-center gap-4 focus:outline-none">
            Originals
          </button>
          <div
            ref={originalsMenuRef}
            className={`absolute left-1/2 w-max -translate-x-1/2 overflow-hidden rounded-lg border-[1px] border-slate-200 bg-[#f8f8f8] p-1 shadow-md`}
            style={{ display: showOriginals ? "block" : "none" }}
          >
            <Link
              href="/originals/large"
              className="mb-1 block rounded-md bg-slate-200 p-2 hover:opacity-80"
            >
              Large Format
            </Link>
            <Link
              href="/originals/medium"
              className="mb-1 block rounded-md bg-slate-200 p-2 hover:opacity-80"
            >
              Medium Format
            </Link>
          </div>
        </div>
        {/* Menu Prints */}
        <div
          className="relative"
          onMouseEnter={toggleEnterPrints}
          onMouseLeave={toggleLeavePrints}
        >
          <button className="flex items-center gap-4 focus:outline-none">
            Prints
          </button>
          <div
            ref={printsMenuRef}
            className={`absolute left-1/2 w-max -translate-x-1/2 overflow-hidden rounded-lg border-[1px] border-slate-200 bg-[#f8f8f8] p-1 shadow-md`}
            style={{ display: showPrints ? "block" : "none" }}
          >
            <Link
              href="/prints/large"
              className="mb-1 block rounded-md bg-slate-200 p-2 hover:opacity-80"
            >
              Large Format
            </Link>
            <Link
              href="/prints/medium"
              className="mb-1 block rounded-md bg-slate-200 p-2 hover:opacity-80"
            >
              Medium Format
            </Link>
          </div>
        </div>
        <Link href="/about">About</Link>
        <Link href="/exhibitions">Exhibitions</Link>
        <Link href="/contact">Contact</Link>

        {isLoaded && user?.publicMetadata.role === "admin" && (
          <Link href="/admin">Admin</Link>
        )}
      </div>
      <div className="absolute right-10 flex items-center gap-20 p-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link href="/checkout">
          <FaShoppingCart size={20} />
        </Link>
      </div>
    </nav>
  );
}

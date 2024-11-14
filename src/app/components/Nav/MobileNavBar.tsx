"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export default function MobileNav() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isCLicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);
  const linkContainerRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    if (isCLicked) {
      const children = linkContainerRef.current?.children;

      if (children) {
        gsap.fromTo(
          children,
          { x: -100 },
          { x: 0, stagger: 0.06, duration: 0.7, ease: "power4.out" },
        );
      }
    }
  }, [isCLicked]);

  const handleClickMenu = () => {
    setIsClicked(true);
  };

  const handleClickCloseMenu = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    if (isSignedIn && user) {
      const registerUser = async () => {
        try {
          const response = await fetch("/api/users/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress,
            }),
          });
          if (!response.ok) {
            const addUser = await fetch(
              `/api/users/${user.primaryEmailAddress?.emailAddress}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user.primaryEmailAddress?.emailAddress,
                }),
              },
            );

            if (addUser.ok) {
              console.log("Utilisateur enregistré avec succès");
            } else {
              console.error("Erreur lors de l'enregistrement de l'utilisateur");
            }
          }
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement de l'utilisateur :",
            error,
          );
        }
      };

      registerUser();
    }
  }, [isSignedIn, user]);

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
        className="fixed left-0 top-0 z-50 flex h-[105vh] w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
      >
        <div
          onClick={() => handleClickCloseMenu()}
          className="absolute right-10 top-10"
        >
          <IoCloseOutline size={25} />
        </div>

        <div
          ref={linkContainerRef}
          className="ml-4 flex flex-col items-start gap-5"
        >
          <Link
            onClick={() => handleClickCloseMenu()}
            href="/"
            className="mb-2 text-4xl font-semibold"
          >
            Home
          </Link>
          <Link
            onClick={() => handleClickCloseMenu()}
            href="/about"
            className="mb-2 text-4xl font-semibold"
          >
            About
          </Link>
          <Link
            onClick={() => handleClickCloseMenu()}
            href="/artworks"
            className="mb-2 text-4xl font-semibold"
          >
            Artworks
          </Link>
          <Link
            onClick={() => handleClickCloseMenu()}
            href="/shop"
            className="mb-2 text-4xl font-semibold"
          >
            Shop
          </Link>
          <Link
            onClick={() => handleClickCloseMenu()}
            href="/contact"
            className="mb-2 text-4xl font-semibold"
          >
            Contact
          </Link>
          {isLoaded && user?.publicMetadata.role === "admin" && (
            <Link href="/admin">Admin</Link>
          )}
        </div>
        <Link
          href={"/checkout"}
          className="absolute top-40 flex w-full justify-between px-10"
        >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <FaShoppingCart onClick={() => handleClickCloseMenu()} size={20} />
        </Link>
      </nav>
    </>
  );
}

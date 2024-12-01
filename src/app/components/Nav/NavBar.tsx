"use client";

import { useZoom } from "@/app/context/ZoomProvider";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"; // Ajoute useUser ici
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Nav() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { isZoom } = useZoom();
  const [isClicked, setIsClicked] = useState(0);
  const linksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  const Links = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/about",
      name: "About",
    },
    {
      href: "/artworks",
      name: "Artworks",
    },
    {
      href: "/shop",
      name: "Shop",
    },
    {
      href: "/exhibitions",
      name: "Exhibitions",
    },
    {
      href: "/contact",
      name: "Contact",
    },
  ];

  const handleCLicked = (index: number) => {
    setIsClicked(index);
  };

  useGSAP(() => {
    linksRefs.current.forEach((link, index) => {
      if (link) {
        if (isClicked === index) {
          gsap.to(link, {
            duration: 1,
            backgroundColor: "#60a5fa",
            color: "white",
            ease: "power2.out",
          });
        } else {
          gsap.to(link, {
            duration: 1,
            backgroundColor: "transparent",
            color: "black",
            ease: "power2.out",
          });
        }
      }
    });
  }, [isClicked]);

  return (
    <nav
      className={`relative left-0 top-0 z-50 mb-[20vh] flex w-full items-center justify-center ${isZoom && "blur-lg"} p-2 pt-4`}
    >
      <div className="flex gap-20 p-4 text-lg font-semibold">
        {Links.map((link, index) => (
          <Link
            ref={(el) => {
              linksRefs.current[index] = el;
            }}
            onClick={() => handleCLicked(index)}
            className="rounded-full p-2"
            key={link.name}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
        {isLoaded && user?.publicMetadata.role === "admin" && (
          <Link href="/admin">Admin</Link>
        )}
      </div>
      <div className="absolute right-4 flex items-center gap-10 rounded-xl bg-black px-4 py-2 text-white">
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

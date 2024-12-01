"use client";

import { useZoom } from "@/app/context/ZoomProvider";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"; // Ajoute useUser ici
import Link from "next/link";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Nav() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { isZoom } = useZoom();

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
    <nav
      className={`relative left-0 top-0 z-50 mb-[20vh] flex w-full items-center justify-center ${isZoom && "blur-lg"} p-2 pt-4`}
    >
      <div className="flex gap-20 p-4 text-lg font-semibold">
        <Link href="/" className="p-2">
          Home
        </Link>
        <Link href="/about" className="p-2">
          About
        </Link>
        <Link href="/artworks" className="p-2">
          Artworks
        </Link>
        <Link href="/shop" className="rounded-full bg-blue-400 p-2 text-white">
          Shop
        </Link>
        <Link href="/exhibitions" className="p-2">
          Exhibitions
        </Link>
        <Link href="/contact" className="p-2">
          Contact
        </Link>

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

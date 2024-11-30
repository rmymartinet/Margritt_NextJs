"use client";

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
    <nav className="z-50 mb-48 flex items-center justify-center p-2 pt-4">
      <div className="text-md flex gap-20 p-4 font-semibold">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/artworks">Artworks</Link>
        <Link href="/shop">Shop</Link>
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

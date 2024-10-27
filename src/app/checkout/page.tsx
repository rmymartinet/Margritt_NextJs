"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import Swal from "sweetalert2";
import { useCart } from "../context/CardContext";
import { useFilteredData } from "../hooks/useFilteredData";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

export default function Checkout() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(""); // Pour stocker l'email entré par l'utilisateur
  const [guestModal, setGuestModal] = useState<boolean>(false);
  const [showAuthOptions, setShowAuthOptions] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null); // Utiliser une chaîne pour les messages d'erreur
  const removeItemFromCart = useRemoveFromCart();
  const { openSignIn } = useClerk();
  const { data } = useFilteredData();
  const allProducts = cart.flat().map((item) => item.id);
  const compare = data.filter((item) => allProducts.includes(item.id));
  const outOfStockProduct = compare.find((item) => item.quantity === 0);

  const deliveryCost = 20;
  const currentUser = useUser();
  const currentUserEmail =
    currentUser?.user?.primaryEmailAddress?.emailAddress || email;

  // Calculer le montant total basé sur le panier sans ajouter les frais de livraison ici
  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);

    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  const handleCloseModal = () => {
    setShowAuthOptions(false);
    setIsGuest(false);
    setEmail("");
    setEmailError(null);
    setGuestModal(false);
  };

  // Afficher les options de connexion ou de continuer en tant qu'invité
  function handleAuthOptions() {
    setShowAuthOptions(true);
  }

  // Fonction pour valider l'email
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
    return emailPattern.test(email);
  };

  async function handleEmailVerification() {
    if (!email) {
      setEmailError("Veuillez entrer une adresse email.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide.");
      return;
    }

    setEmailError(null);
    try {
      const response = await fetch("/api/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();

      if (data.exists) {
        setIsGuest(false);
        setGuestModal(false);
        Swal.fire({
          title: "Cette adresse mail existe déjà",
          text: "Connectez-vous pour continuer",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          handleAuthOptions();
        });
        return;
      } else {
        checkout();
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
    }
  }

  async function checkout() {
    setLoading(true);

    // Si personne n'est connecté et qu'aucun invité n'est défini
    if (!isGuest && !currentUser.isSignedIn) {
      handleAuthOptions(); // Affiche la boîte de dialogue
      setLoading(false);
      return;
    }

    try {
      // Vérification du stock
      if (outOfStockProduct) {
        Swal.fire({
          title: "Erreur!",
          text: `Stock insuffisant pour : ${outOfStockProduct.title} Veillez à retirer cet article de votre panier`,
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        throw new Error("Stock insuffisant");
      }

      // Vérification des prix pour les passer à la session de paiement
      const products = cart.flat();

      if (products.some((product) => product.price === undefined)) {
        console.error("Un ou plusieurs produits n'ont pas de prix défini.");
        setLoading(false);
        return;
      }

      // Création de la session de paiement
      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          deliveryCost,
          currentUserEmail,
        }),
      });

      const data = await response.json();

      if (data?.url) {
        const url = data.url;
        setLoading(false);
        window.location.href = url;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement :",
        error,
      );
      setLoading(false);
    }
  }

  return (
    <section className="fixed left-0 -z-10 flex h-[85vh] w-full lg:top-0 lg:h-[60vh]">
      <div className="flex h-full w-full flex-col items-center justify-end overflow-hidden">
        <div className="grid h-[100%] w-full grid-flow-col overflow-x-auto whitespace-nowrap border border-black md:flex">
          {cart.length > 0 ? (
            <>
              {cart.flat().map((item) => (
                <div
                  key={item.id}
                  className="flex h-full w-max flex-col items-center justify-center border-r border-black"
                >
                  <Image
                    width={300}
                    height={300}
                    objectFit="contain"
                    src={item.imageUrls[0]}
                    alt={item.title}
                  />
                  <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
                    <h3 className="text-md text-center font-normal">
                      {item.title}
                    </h3>
                    <p className="text-center text-base font-normal">
                      {item.price} €
                    </p>
                  </div>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="mb-2 cursor-pointer text-sm text-red-500"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p>Votre panier est vide</p>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 flex w-full items-center justify-end gap-8 border border-black bg-white px-2">
          <div className="flex flex-col gap-4">
            <p>Delivery Cost: {deliveryCost},00 €</p>
            <span>Total: {totalAmount + deliveryCost},00 €</span>
          </div>
          <button
            onClick={checkout}
            className={`cursor-pointer bg-black px-4 py-3 text-white ${
              cart.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Chargement..." : "Payer"}
          </button>
        </div>
      </div>

      {/* Modal pour les options de connexion/invité */}
      {showAuthOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative">
            <div
              onClick={() => handleCloseModal()}
              className="absolute right-0 top-0 cursor-pointer p-2"
            >
              <CgClose size={12} />
            </div>
            <div className="rounded-md bg-white p-6">
              <h3 className="mb-4 rounded-xl">
                Se connecter ou continuer en tant qu&apos;invité
              </h3>
              <button
                onClick={() => openSignIn()}
                className="mr-4 rounded-xl bg-black px-4 py-2 text-white"
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  setIsGuest(true);
                  setShowAuthOptions(false);
                  setGuestModal(true);
                }}
                className="rounded-xl bg-gray-500 px-4 py-2 text-white"
              >
                Continuer en tant qu&apos;invité
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour les invités */}
      {guestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative">
            <div
              onClick={() => handleCloseModal()}
              className="absolute right-0 top-0 cursor-pointer p-2"
            >
              <CgClose size={12} />
            </div>
            <div className="rounded-md bg-white p-6">
              <h3 className="mb-4">Entrer votre adresse e-mail</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                placeholder="Entrez votre e-mail"
                className={`mb-4 w-full rounded-md border p-2 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emailError && <p className="mb-2 text-red-500">{emailError}</p>}
              {/* Afficher le message d'erreur */}
              <button
                onClick={handleEmailVerification}
                className="cursor-pointer rounded-xl bg-black px-4 py-2 text-white"
                disabled={loading || !email}
              >
                {loading ? "Vérification..." : "Continuer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

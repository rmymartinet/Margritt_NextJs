"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CardContext";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import QuantitySelector from "./QuantitySelector";
import { Item } from "@/types/dataTypes";
import Swal from "sweetalert2";
import { useFilteredData } from "../hooks/useFilteredData";

gsap.registerPlugin(useGSAP);

const CartSideBar = () => {
  const { cart, isShoppingOpen, setIsShoppingOpen, updateCartQuantity } =
    useCart();

  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddQuantity = (item: Item) => {
    if (item.stock && item.tempQuantity < item.stock) {
      updateCartQuantity(item.id, item.tempQuantity + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Insufficient Stock",
        text: "You have reached the maximum stock limit for this item.",
      });
    }
  };

  const handleRemoveQuantity = (item: Item) => {
    if (item.tempQuantity > 1) {
      updateCartQuantity(item.id, item.tempQuantity - 1);
    }
  };

  const removeFromCart = useRemoveFromCart();
  const shoppingContainerRef = useRef<HTMLDivElement>(null);
  const formattedTotalWithDelivery = cart
    .reduce((total, item) => {
      const itemPrice = Number(item?.finalPrice) || 0; // Prend le prix de l'article ou 0 si le prix est invalide
      const itemQuantity = item.tempQuantity || 0; // Prend la quantité de l'article ou 0 si la quantité est invalide

      return total + itemPrice * itemQuantity; // Ajoute le prix total de l'article (prix * quantité) au total
    }, 0)
    .toFixed(2); // Commence avec un total de 0 et arrondit à deux décimales

  useGSAP(() => {
    const element = shoppingContainerRef.current;

    if (!element) return;

    if (isShoppingOpen) {
      setIsAnimating(true);
      gsap.to(element, {
        x: "0%",
        duration: 1,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      });
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(true);
      gsap.to(element, {
        x: "200%",
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
      document.body.style.overflow = "auto";
    }
  }, [isShoppingOpen]);

  useGSAP(() => {
    const element = shoppingContainerRef.current;
    if (element) {
      gsap.set(element, { x: "200%" });
    }
  }, []);

  const handleCloseClick = () => {
    if (!isAnimating) {
      setIsShoppingOpen(false);
    }
  };

  const { data } = useFilteredData();
  const allProducts = cart.flat().map((item) => item.id);
  const compare = data.filter((item) => allProducts.includes(item.id));
  const outOfStockProduct = compare.find((item) => item.quantity === 0);

  const isQuantityGreaterThanStock = (item: Item) =>
    (cart?.find((cartItem) => cartItem?.id === item?.id)?.tempQuantity || 0) >=
    (item?.stock || 0);

  const productStock = (item: Item) => {
    const cartItem = cart.find((cartItem) => cartItem?.id === item?.id);
    return cartItem?.stock || 0;
  };

  async function checkout() {
    try {
      // Vérification du stock
      if (outOfStockProduct) {
        Swal.fire({
          title: "Erreur!",
          text: `Stock insuffisant pour : ${outOfStockProduct.title} Veillez à retirer cet article de votre panier`,
          icon: "error",
          confirmButtonText: "OK",
        });
        throw new Error("Stock insuffisant");
      }

      // Vérification des prix pour les passer à la session de paiement
      const products = cart.flat();

      if (products.some((product) => product.price === undefined)) {
        console.error("Un ou plusieurs produits n'ont pas de prix défini.");
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
        }),
      });

      const data = await response.json();

      if (data?.url) {
        const url = data.url;
        window.location.href = url;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement :",
        error,
      );
    }
  }

  return (
    <div
      ref={shoppingContainerRef}
      className="pointer-events-auto fixed right-0 top-1/2 z-50 flex h-[100dvh] w-[100vdh] -translate-y-1/2 flex-col overflow-y-auto border-2 bg-white shadow-lg md:right-5 md:h-[80vh] md:w-[450px] md:rounded-xl"
    >
      <div className="w-max cursor-pointer rounded-br-xl bg-black p-4">
        <IoClose onClick={handleCloseClick} size={20} color="white" />
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {cart.length > 0 ? (
          cart.flat().map((item, index) => (
            <div
              key={index}
              className="mb-5 mt-20 grid grid-cols-3 place-items-center border-b border-gray-200 pb-5"
            >
              <Image
                className="mr-5"
                width={10}
                height={10}
                layout="responsive"
                objectFit="contain"
                src={item.imageUrls[0]}
                alt={item.title}
              />
              <div className="flex flex-col">
                <h3 className="mb-1 text-sm">{item.title}</h3>
                <p className="mb-1 text-sm font-bold">{item.finalPrice} €</p>
                <p className="text-sm">Quantity: {item.tempQuantity}</p>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="cursor-pointer text-sm text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
                <QuantitySelector
                  productStock={productStock(item)}
                  isQuantityGreaterThanStock={isQuantityGreaterThanStock(item)}
                  quantity={item.tempQuantity || 1}
                  onAdd={() => handleAddQuantity(item)}
                  onRemove={() => handleRemoveQuantity(item)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="h-full p-5 pt-10">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 z-10 w-full border-t border-gray-200 bg-white p-5">
        <div className="mb-2 flex justify-between">
          <p>DELIVERY</p>
          <p>Free</p>
        </div>
        <div className="mb-4 flex justify-between font-bold">
          <p>Total order:</p>
          <p>{formattedTotalWithDelivery} €</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/checkout">
            <button
              onClick={() => setIsShoppingOpen(false)}
              className="w-full border border-[#4A628A] bg-white py-2 text-sm uppercase transition hover:bg-[#4A628A] hover:text-white"
            >
              Checkout
            </button>
          </Link>
          <button
            onClick={() => {
              setIsShoppingOpen(false);
              checkout();
            }}
            className="w-full border border-[#4A628A] bg-white py-2 text-sm uppercase transition hover:bg-[#4A628A] hover:text-white"
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;

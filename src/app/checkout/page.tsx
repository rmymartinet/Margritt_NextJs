"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "../context/CardContext";
import { useFilteredData } from "../hooks/useFilteredData";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import { Item } from "../types/dataTypes";

export default function Checkout() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const removeFromCart = useRemoveFromCart();
  const deliveryCost = 20;
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const { openSignIn } = useClerk();

  useEffect(() => {
    const total = cart
      .flat()
      .reduce(
        (sum, item) => sum + (item?.price ?? 0) * (item?.tempQuantity || 1),
        0,
      );
    setTotalAmount(total);
  }, [cart]);

  const allProducts = cart.flat().map((item) => item.id);
  const { data } = useFilteredData();

  const compare = data.filter((item) => allProducts.includes(item.id));
  const outOfStockProduct = compare.find((item) => item.stock === 0);

  //vérification du stock et paiement

  async function checkout() {
    setLoading(true);

    if (!userId) {
      openSignIn();
      setLoading(false);
      return;
    }

    try {
      const userResponse = await fetch(`/api/users/${userId}`);
      const userData = await userResponse.json();

      // Vérifiez si l'utilisateur existe dans votre base de données
      if (!userData || userData.message === "Utilisateur non trouvé") {
        openSignIn();
        setLoading(false);
        return;
      }

      if (outOfStockProduct) {
        Swal.fire({
          title: "Erreur!",
          text: `Stock insuffisant pour : ${outOfStockProduct.title} Veillez à retirer cet article de votre panier`,
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cart.flat(), userId }),
      });

      const data = await response.json();

      if (data?.url) {
        const url = data.url;
        setLoading(false);
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  return (
    <section className="h-checkoutmd lg:h-checkoutlg relative flex flex-col border-[1px] border-black lg:-mt-44">
      <div className="flex h-full w-full flex-col overflow-x-auto whitespace-nowrap lg:flex-row">
        {cart.length > 0 ? (
          <>
            {cart.flat().map((item: Item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center gap-2 border-b-[1px] border-black p-4 lg:border-r-[1px]"
              >
                <Image
                  width={300}
                  height={300}
                  src={item.imageUrls[0]}
                  alt={item.title}
                />
                <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
                  <h3 className="text-md text-center font-normal">
                    {item.title}
                  </h3>
                  <p className="text-center text-base font-normal">
                    Price: {item.price} €
                  </p>
                  <p className="text-center text-base font-normal">
                    Quantity: {item.tempQuantity}
                  </p>
                </div>
                <button
                  className="cursor-pointer text-sm text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>

      {/* Checkout summary fixed at the bottom */}
      <div className="fixed -bottom-24 left-0 flex w-full items-center justify-between gap-8 border border-black bg-white p-4 md:justify-end">
        {cart.length > 0 && (
          <div className="flex flex-col gap-4">
            <p>Delivery: {deliveryCost},00 €</p>
            <span>Total: {totalAmount + deliveryCost},00 €</span>
          </div>
        )}
        <button
          onClick={checkout}
          className={`cursor-pointer bg-black px-4 py-3 text-white ${cart.length === 0 ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Loading..." : "Pay"}
        </button>
      </div>
    </section>
  );
}

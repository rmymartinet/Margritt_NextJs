"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "../context/CardContext";
import { useFilteredData } from "../hooks/useFilteredData";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import QuantitySelector from "../components/QuantitySelector";
import { Item } from "@/types/dataTypes";

export default function Checkout() {
  const { cart, updateCartQuantity } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const removeItemFromCart = useRemoveFromCart();
  const { data } = useFilteredData();
  const allProducts = cart.flat().map((item) => item.id);
  const compare = data.filter((item) => allProducts.includes(item.id));
  const outOfStockProduct = compare.find((item) => item.quantity === 0);

  useEffect(() => {
    const total = cart.reduce((total, item) => {
      const itemPrice = item?.finalPrice || 0;
      const itemQuantity = item.tempQuantity || 0;
      // const itemQuantity = Number(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);

    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  async function checkout() {
    setLoading(true);

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

  const isQuantityGreaterThanStock = (item: Item) =>
    (cart?.find((cartItem) => cartItem?.id === item?.id)?.tempQuantity || 0) >=
    (item?.stock || 0);

  const productStock = (item: Item) => {
    const cartItem = cart.find((cartItem) => cartItem?.id === item?.id);
    return cartItem?.stock || 0;
  };

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
                    <p>Quantity: {item.tempQuantity}</p>
                    <QuantitySelector
                      productStock={productStock(item)}
                      isQuantityGreaterThanStock={isQuantityGreaterThanStock(
                        item,
                      )}
                      quantity={item.tempQuantity || 1}
                      onAdd={() => handleAddQuantity(item)}
                      onRemove={() => handleRemoveQuantity(item)}
                    />
                  </div>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="mb-2 cursor-pointer text-sm text-red-500"
                  >
                    Remove
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
            <div className="flex gap-2">
              <p className="font-semibold"> Delivery:</p> <span>Free</span>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold"> Total: </p>{" "}
              <span>{totalAmount},00 €</span>
            </div>
          </div>
          <button
            onClick={checkout}
            className={`ml-10 cursor-pointer bg-black px-4 py-3 text-white ${
              cart.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Loading..." : "Pay"}
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CardContext";
import { useRemoveFromCart } from "../hooks/useRemoveToCart";

const CartSideBar = () => {
  const { cart, isShoppingOpen, setIsShoppingOpen } = useCart();
  const removeFromCart = useRemoveFromCart();

  const shoppingContainerRef = useRef<HTMLDivElement>(null);

  const deliveryCost = 20;
  const totalWithoutDelivery = cart.reduce((total, item) => {
    const itemPrice = item?.finalPrice || 0;
    // const itemQuantity = Number(item.quantity) || 0;
    return total + itemPrice;
  }, 0);
  const totalWithDelivery = totalWithoutDelivery + deliveryCost;
  const formattedTotalWithoutDelivery = totalWithoutDelivery.toFixed(2);
  const formattedTotalWithDelivery = totalWithDelivery.toFixed(2);

  useGSAP(() => {
    gsap.to(shoppingContainerRef.current, {
      x: isShoppingOpen ? "0%" : "200%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isShoppingOpen]);

  const handleCloseClick = () => {
    setIsShoppingOpen(false);
    // if (locomotiveScroll) locomotiveScroll.start();
    // document.body.style.overflow = "auto";
  };

  // useEffect(() => {
  //   if (isShoppingOpen) {
  //     if (locomotiveScroll) {
  //       locomotiveScroll.stop(); // Stopper Locomotive Scroll lorsque le shopping cart s'ouvre
  //     }
  //     document.body.style.overflow = "hidden"; // Désactiver le scroll global de la page
  //   } else {
  //     if (locomotiveScroll) {
  //       locomotiveScroll.start(); // Reprendre Locomotive Scroll à la fermeture du shopping cart
  //     }
  //     document.body.style.overflow = "auto"; // Réactiver le scroll global de la page
  //   }
  // }, [isShoppingOpen, locomotiveScroll]);

  // const stopPropagation = (e) => {
  //   e.stopPropagation();
  // };

  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (isShoppingOpen) {
  //       event.stopPropagation(); // Empêcher la propagation du scroll à Locomotive Scroll
  //     }
  //   };

  //   const shoppingContainer = document.querySelector(".shopping-container");
  //   if (shoppingContainer) {
  //     shoppingContainer.addEventListener("wheel", handleWheel);
  //   }

  //   return () => {
  //     if (shoppingContainer) {
  //       shoppingContainer.removeEventListener("wheel", handleWheel);
  //     }
  //   };
  // }, [isShoppingOpen]);

  return (
    <div
      ref={shoppingContainerRef}
      className="pointer-events-auto fixed right-0 top-0 z-50 flex h-screen w-[400px] flex-col overflow-y-auto bg-white shadow-lg"
    >
      <div className="cursor-pointer p-5">
        <IoClose onClick={handleCloseClick} size={20} />
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
              <div className="flex-1">
                <h3 className="mb-1 text-sm">{item.title}</h3>
                <p className="mb-1 text-sm font-bold">{item.finalPrice} €</p>
                <p className="text-sm">Quantity: {item.tempQuantity}</p>
              </div>
              <p
                className="cursor-pointer text-sm text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </p>
            </div>
          ))
        ) : (
          <div className="h-full p-5 pt-10">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 z-10 w-full border-t border-gray-200 bg-white p-5">
        <div className="mb-2 flex justify-between">
          <p>ORDER VALUE</p>
          <p>{formattedTotalWithoutDelivery} €</p>
        </div>
        <div className="mb-2 flex justify-between">
          <p>DELIVERY</p>
          <p>{deliveryCost.toFixed(2)} €</p>
        </div>
        <div className="mb-4 flex justify-between font-bold">
          <p>Total order:</p>
          <p>{formattedTotalWithDelivery} €</p>
        </div>
        <Link href="/checkout">
          <button
            onClick={() => setIsShoppingOpen(true)}
            className="w-full border border-black bg-white py-2 text-sm uppercase transition hover:bg-black hover:text-white"
          >
            Basket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSideBar;
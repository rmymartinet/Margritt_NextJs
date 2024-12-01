"use client";

import { useCart } from "@/app/context/CardContext";
import { useAddToCart } from "@/app/hooks/useAddToCart";
import { useFilteredData } from "@/app/hooks/useFilteredData";
import { ProductItem } from "@/types/dataTypes";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Swal from "sweetalert2";
import AddToCartButton from "../AddToCartButton";
import InfosItem from "../InfosItem";
import QuantitySelector from "../QuantitySelector";
import Divider from "../Divider";

const ProductDetails = ({
  product,
  category,
  hasAnimated,
}: {
  category: string;
  product: ProductItem;
  hasAnimated: boolean;
}) => {
  const arrowRef = useRef(null);
  const [tempQuantity, setTempQuantity] = useState(1);
  const router = useRouter();
  const { data } = useFilteredData();
  const { cart, setIsShoppingOpen } = useCart();
  const addToCart = useAddToCart();
  const finalPrice = tempQuantity * (product?.price || 0);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  const isQuantityGreaterThanStock =
    (cart?.find((item) => item?.id === product?.id)?.tempQuantity || 0) >=
    (product?.stock || 0);

  const isQuantityGreaterThanItemQuantity =
    cart?.find((item) => item?.id === product?.id)?.tempQuantity || 0;

  const categories = data.filter((item) => item.category === "prints");
  const currentIndex = categories.findIndex((item) => item.id === product.id);
  const nextIndex = (currentIndex + 1) % categories.length;
  const nextItem =
    currentIndex > data.length ? categories[0] : categories[nextIndex];

  const remainingStock =
    (product.stock ?? 0) - isQuantityGreaterThanItemQuantity;

  const handleEnterHovered = useCallback(() => {
    const tl = gsap.timeline();
    tl.to(arrowRef.current, { x: 100, duration: 0.3, ease: "power3.inOut" })
      .set(arrowRef.current, { x: -100 })
      .to(arrowRef.current, { x: 0, duration: 0.5, ease: "power3.inOut" });
  }, []);

  const handleAddQuantity = useCallback(() => {
    if (tempQuantity < remainingStock) {
      setTempQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Insufficient Stock",
        text: "You have requested more than what is available in stock.",
      });
    }
  }, [tempQuantity, remainingStock]);

  const handleRemoveQuantity = useCallback(() => {
    if (tempQuantity > 1) {
      setTempQuantity((prevQuantity) => prevQuantity - 1);
    }
  }, [tempQuantity]);

  const handleNavigateNextItem = useCallback(() => {
    router.push(`/shop/${nextItem.id}`);
  }, [router, nextItem]);

  useEffect(() => {
    const verticalPostion = (ref: React.RefObject<HTMLDivElement>) => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
      );
    };
    if (product && product.imageUrls.length > 0 && !hasAnimated) {
      verticalPostion(priceRef);
      verticalPostion(stockRef);
      itemsRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 100,
          },
          {
            delay: index * 0.02, // Ajoutez une virgule ici
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.Out",
          },
        );
      });
      verticalPostion(titleRef);
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
      );
    }
  }, [product, hasAnimated]);

  const infosItem = [
    { label: "Series", value: product?.serie || "" },
    { label: "Year", value: product?.date || "" },
    { label: "Piece", value: product?.piece || "" },
    { label: "Dimension", value: product?.dimension || "" },
    { label: "Paper", value: product?.paper || "" },
  ];

  return (
    <div
      ref={containerRef}
      className="flex h-max w-full flex-col gap-20 self-start rounded-3xl border border-slate-200 p-8"
    >
      <div className="relative flex flex-col gap-5">
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="text-4xl">
            {product?.title}
          </h1>
        </div>
        {category === "prints" && (
          <>
            <div className="flex w-full justify-between">
              <div className="price overflow-hidden">
                <div className="text-xl font-semibold" ref={priceRef}>
                  <p>{finalPrice.toFixed(2)} €</p>{" "}
                </div>
              </div>
              <QuantitySelector
                quantity={tempQuantity}
                onAdd={handleAddQuantity}
                onRemove={handleRemoveQuantity}
                isQuantityGreaterThanStock={isQuantityGreaterThanStock}
              />
            </div>
            <div className="flex items-center gap-3 overflow-hidden text-sm text-slate-400">
              {product?.stock === 0 ? (
                <p ref={stockRef}>Out of stock</p>
              ) : (
                <div ref={stockRef} className="flex gap-3">
                  <p>Stock available :</p>
                  <span>
                    {product?.stock || 0}{" "}
                    {product?.stock && product?.stock > 1 ? "pieces" : "piece"}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        <Divider bgColor="black" className="origin-left" />
      </div>
      <div className="flex w-full flex-col gap-2 overflow-hidden">
        {infosItem.map((item, index) => (
          <div key={index} className="h-max overflow-hidden">
            <div
              ref={(el) => {
                itemsRefs.current[index] = el;
              }}
            >
              <InfosItem label={item.label} value={item.value} />
            </div>
          </div>
        ))}
      </div>
      {category === "prints" && (
        <>
          <div className="flex w-full justify-between">
            <div className="flex w-full items-center justify-between">
              <AddToCartButton
                product={product}
                finalPrice={finalPrice}
                tempQuantity={tempQuantity}
                setIsShoppingOpen={setIsShoppingOpen}
                addToCart={addToCart}
                setTempQuantity={setTempQuantity}
              />
            </div>
            <div
              className="user-select-none flex scale-100 cursor-pointer items-center justify-center gap-3"
              onMouseEnter={handleEnterHovered}
              onMouseLeave={handleEnterHovered}
              onClick={handleNavigateNextItem}
            >
              <span>Next</span>
              <div className="grid place-items-center overflow-hidden rounded-full border border-black p-[3px] transition-all duration-200 ease-in-out">
                <div className="grid place-items-center" ref={arrowRef}>
                  <IoIosArrowRoundForward />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;

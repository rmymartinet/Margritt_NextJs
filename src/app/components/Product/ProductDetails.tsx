import { useCart } from "@/app/context/CardContext";
import { useAddToCart } from "@/app/hooks/useAddToCart";
import { useFilteredData } from "@/app/hooks/useFilteredData";
import { ProductItem } from "@/types/dataTypes";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Swal from "sweetalert2";
import AddToCartButton from "../AddToCartButton";
import InfosItem from "../InfosItem";
import QuantitySelector from "../QuantitySelector";

const ProductDetails = ({
  product,
  path,
  isPrints,
}: {
  isPrints?: boolean;
  product: ProductItem;
  path: string;
}) => {
  const arrowRef = useRef(null);
  const [tempQuantity, setTempQuantity] = useState(1);
  const router = useRouter();
  const { data } = useFilteredData();
  const { cart, setIsShoppingOpen } = useCart();
  const addToCart = useAddToCart();
  const finalPrice = tempQuantity * (product?.price || 0);

  const isQuantityGreaterThanStock =
    (cart?.find((item) => item?.id === product?.id)?.tempQuantity || 0) >=
    (product?.stock || 0);

  const isQuantityGreaterThanItemQuantity =
    cart?.find((item) => item?.id === product?.id)?.tempQuantity || 0;

  const allItems = data.filter(
    (item) =>
      item.category === product.category &&
      item.dimension === product.dimension,
  );

  const currentIndex = allItems.findIndex((item) => item.id === product.id);
  const nextIndex = (currentIndex + 1) % allItems.length;
  const nextItem = allItems[nextIndex];

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
        title: "Out of Stock",
        text: "This product is out of stock",
      });
    }
  }, [tempQuantity, remainingStock]);

  const handleRemoveQuantity = useCallback(() => {
    if (tempQuantity > 1) {
      setTempQuantity((prevQuantity) => prevQuantity - 1);
    }
  }, [tempQuantity]);

  const handleNavigateNextItem = useCallback(() => {
    router.push(`/originals/${path}/${nextItem.id}`);
  }, [router, nextItem, path]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 md:px-0">
      <div className="flex flex-col items-center gap-1">
        <h1>
          Series {product?.serie} - {product?.title}
        </h1>
        <p className="text-center opacity-40">
          Not available for sale via the website. Contact me to discuss.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <InfosItem
          label="Series"
          value={product?.serie || ""}
          className="flex justify-between"
        />
        <InfosItem
          label="Year"
          value={product?.date || ""}
          className="flex justify-between"
        />
        <InfosItem
          label="Piece"
          value={product?.piece || ""}
          className="flex justify-between"
        />
        <InfosItem
          label="Format"
          value={product?.format || ""}
          className="flex justify-between"
        />
        <InfosItem
          label="Paper"
          value={product?.papier || ""}
          className="flex justify-between"
        />
      </div>
      {isPrints ? (
        <>
          <div className="flex items-center gap-5 self-end">
            {product?.stock === 0 ? (
              <p>Out of stock</p>
            ) : (
              <>
                <p>Stock available :</p>
                <span>
                  {product?.stock || 0}{" "}
                  {product?.stock && product?.stock > 1 ? "pieces" : "piece"}
                </span>
              </>
            )}
          </div>
          <div className="flex w-full justify-between">
            <div className="price">
              <span className="text-lg font-bold">
                {finalPrice.toFixed(2)} €
              </span>
            </div>
            <QuantitySelector
              quantity={tempQuantity}
              onAdd={handleAddQuantity}
              onRemove={handleRemoveQuantity}
              isQuantityGreaterThanStock={isQuantityGreaterThanStock}
            />
          </div>
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
              onMouseEnter={() => handleEnterHovered()}
              onMouseLeave={() => handleEnterHovered()}
              onClick={() => handleNavigateNextItem()}
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
      ) : (
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center justify-between">
            <Link
              href="mailto:margrittmartinet@gmail.com"
              className="contact cursor-pointer rounded-[20px] border-2 border-blue-500 px-2.5 py-1 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white"
            >
              Contact-me
            </Link>
          </div>
          <div
            className="user-select-none flex scale-100 cursor-pointer items-center justify-center gap-3"
            onMouseEnter={() => handleEnterHovered()}
            onMouseLeave={() => handleEnterHovered()}
            onClick={() => handleNavigateNextItem()}
          >
            <span>Next</span>
            <div className="grid place-items-center overflow-hidden rounded-full border border-black p-[3px] transition-all duration-200 ease-in-out">
              <div className="grid place-items-center" ref={arrowRef}>
                <IoIosArrowRoundForward />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Item } from "../../types/dataTypes";
import { useCart } from "../context/CardContext";
import { useAddToCart } from "../hooks/useAddToCart";
import AddToCartButton from "./AddToCartButton";
interface ImagesContainerProps {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
  isTirage?: boolean;
}

const ImagesContainer = ({ item }: ImagesContainerProps) => {
  const [tempQuantity, setTempQuantity] = useState(1);
  const { isShoppingOpen, setIsShoppingOpen } = useCart();
  const addToCart = useAddToCart();

  return (
    <section
      className={`flex min-h-screen justify-center ${isShoppingOpen ? "opacity-60" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-40">
        {item.map((imgData: Item, id: number) => (
          <div className="flex w-full flex-col gap-10 lg:w-[80%]" key={id}>
            <Link href={`shop/${imgData.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgData.imageUrls[0]}
                alt="Image"
                className="h-full w-full cursor-pointer object-contain"
              />
            </Link>
            <div
              className={`flex flex-col items-center md:flex-row md:px-10 ${
                item[0].category === "prints"
                  ? "md:items-start"
                  : "md:items-center"
              } md:justify-between md:gap-0`}
            >
              <div className="flex flex-col gap-6">
                <div className="md:text-md flex flex-wrap gap-3 lg:text-lg">
                  <p>{imgData.title}</p>
                  <span>|</span>
                  <p>{imgData.dimension}</p>
                  <span>|</span>
                  <p>{imgData.date}</p>
                </div>
                {item && item[0].category === "prints" && (
                  <div className="md:text-md flex justify-center gap-10 md:justify-start lg:text-lg">
                    <p>Price: {imgData.price} €</p>
                    {imgData.stock === 0 ? (
                      <p className="text-red-500">Out of stock</p>
                    ) : (
                      <p>In stock: {imgData.stock}</p>
                    )}
                  </div>
                )}
              </div>
              {item[0].category === "originals" && (
                <Link href={`shop/${imgData.id}`}>
                  <div className="group flex items-center gap-2 text-blue-500">
                    <p className="cursor-pointer">Learn more</p>
                    <div className="icon transition-all duration-200 ease-in-out group-hover:translate-x-1">
                      <IoIosArrowForward />
                    </div>
                  </div>
                </Link>
              )}
              {item[0].category === "prints" && (
                <div className="mt-5 flex items-center gap-6 text-blue-500 md:mt-0 md:flex-col md:items-start">
                  <AddToCartButton
                    product={imgData}
                    finalPrice={imgData?.price ?? 0}
                    tempQuantity={tempQuantity}
                    setIsShoppingOpen={setIsShoppingOpen}
                    addToCart={addToCart}
                    setTempQuantity={setTempQuantity}
                  />
                  <Link href={`shop/${imgData.id}`}>
                    <div className="group flex items-center gap-2">
                      <p className="cursor-pointer">Learn more</p>
                      <div className="icon transition-all duration-200 ease-in-out group-hover:translate-x-1">
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImagesContainer;

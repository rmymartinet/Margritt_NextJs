import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useCart } from "../context/CardContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { Item } from "../types/dataTypes";
import AddToCartButton from "./addToCartButton";
interface ImagesContainerProps {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
  isTirage?: boolean;
  path?: string;
}

const ImagesContainer = ({
  item,
  isCursorPointer,
  isOriginal,
  isTirage,
  path,
}: ImagesContainerProps) => {
  const [tempQuantity, setTempQuantity] = useState(1);
  const { isShoppingOpen, setIsShoppingOpen } = useCart();
  const addToCart = useAddToCart();

  return (
    <section
      className={`flex justify-center ${isShoppingOpen ? "opacity-60" : "opacity-100"}`}
    >
      {/*AJOUT DE HEROSUBCONTENT*/}
      <div className="flex flex-col gap-40">
        {item.map((imgData: Item, id: number) => (
          <div className="flex flex-col gap-10" key={id}>
            <Link href={`${path}/${imgData.id}`}>
              <Image
                className={`${isCursorPointer && "cursor-pointer"}`}
                width={500}
                height={500}
                layout="responsive"
                objectFit="contain"
                src={imgData.imageUrls[0]}
                alt="Image"
              />
            </Link>
            <div
              className={`flex flex-col items-start md:flex-row md:px-10 ${isTirage ? "md:items-start" : "md:items-center"} md:justify-between md:gap-0`}
            >
              <div className="flex flex-col gap-6">
                <div className="md:text-md flex flex-wrap gap-3 lg:text-lg">
                  <p>{imgData.title}</p>
                  <span>|</span>
                  <p>{imgData.format}</p>
                  <span>|</span>
                  <p>{imgData.date}</p>
                </div>
                {isTirage && (
                  <div className="md:text-md flex gap-10 lg:text-lg">
                    <p>Price: {imgData.price} €</p>
                    {imgData.stock === 0 ? (
                      <p className="text-red-500">Out of stock</p>
                    ) : (
                      <p>In stock: {imgData.stock}</p>
                    )}
                  </div>
                )}
              </div>
              {isOriginal && (
                <Link href={"/"}>
                  <div className="group flex items-center gap-2 text-blue-500">
                    <span className="cursor-pointer">Learn more</span>
                    <div className="icon transition-all duration-200 ease-in-out group-hover:translate-x-1">
                      <IoIosArrowForward />
                    </div>
                  </div>
                </Link>
              )}
              {isTirage && (
                <div className="mt-5 flex items-center gap-6 text-blue-500 md:mt-0 md:flex-col md:items-start">
                  <AddToCartButton
                    product={imgData}
                    finalPrice={imgData?.price ?? 0} // Utilisation de imgData au lieu de item
                    tempQuantity={tempQuantity}
                    setIsShoppingOpen={setIsShoppingOpen}
                    addToCart={addToCart}
                    setTempQuantity={setTempQuantity}
                  />
                  <Link href={"/"}>
                    <div className="group flex items-center gap-2">
                      <span className="cursor-pointer">Learn more</span>
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

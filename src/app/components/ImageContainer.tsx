import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ImagesContainerProps, Item } from "../../types/dataTypes";
import { useCart } from "../context/CardContext";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

const ImagesContainer = ({ item }: ImagesContainerProps) => {
  const [tempQuantity, setTempQuantity] = useState(1);
  const { isShoppingOpen, setIsShoppingOpen } = useCart();
  const [orientations, setOrientations] = useState<{ [key: number]: boolean }>(
    {},
  );
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);

  // Vérifie l'orientation des images après leur chargement
  useEffect(() => {
    item.forEach((_, index) => {
      const img = imageRefs.current[index];
      if (img) {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        setOrientations((prev) => ({
          ...prev,
          [index]: height > width, // true si portrait, false si paysage
        }));
      }
    });
  }, [item]);

  return (
    <section
      className={`flex min-h-screen justify-center ${
        isShoppingOpen ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-40">
        {item.map((imgData: Item, id: number) => (
          <div className="flex w-full flex-col gap-10" key={id}>
            <Link href={`shop/${imgData.id}`}>
              <div
                className={`relative ${
                  orientations[id]
                    ? "h-[70vh] w-screen lg:h-[100vh] lg:w-[70vw]"
                    : "h-[30vh] w-screen lg:h-[80vh] lg:w-[70vw]"
                } overflow-hidden`}
              >
                <Image
                  ref={(el) => {
                    imageRefs.current[id] = el;
                  }}
                  src={imgData.thumbnailUrl ?? ""}
                  alt="Image"
                  className="h-full w-full cursor-pointer object-contain"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>
            <div
              className={`flex flex-col items-center md:flex-row md:px-10 ${
                item[0].category === "prints"
                  ? "md:items-start"
                  : "md:items-center"
              } md:justify-between md:gap-0`}
            >
              <div className="flex flex-col gap-6">
                <div className="md:text-md flex flex-wrap gap-3 font-medium lg:text-lg">
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
              {item[0].category === "prints" && (
                <div className="mt-5 flex items-center gap-6 md:mt-0 md:flex-col md:items-start">
                  <AddToCartButton
                    product={imgData}
                    finalPrice={imgData?.price ?? 0}
                    tempQuantity={tempQuantity}
                    setIsShoppingOpen={setIsShoppingOpen}
                    setTempQuantity={setTempQuantity}
                  />
                  <Link href={`shop/${imgData.id}`}>
                    <div className="group flex items-center gap-2">
                      <p className="cursor-pointer font-medium text-[#7AB2D3]">
                        Learn more
                      </p>
                      <div className="icon transition-all duration-200 ease-in-out group-hover:translate-x-1">
                        <IoIosArrowForward color="#7AB2D3" />
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

import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Item } from "../types/dataTypes";

interface ImagesContainerProps {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
  isTirage?: boolean;
}

const ImagesContainer = ({
  item,
  isCursorPointer,
  isOriginal,
  isTirage,
}: ImagesContainerProps) => {
  return (
    <section className="flex h-screen justify-center">
      {/*AJOUT DE HEROSUBCONTENT*/}
      <div className="flex flex-col gap-40 md:h-[70vw] md:w-[70vw]">
        {item.map((imgData: Item, id: number) => (
          <div className="flex flex-col gap-10" key={id}>
            <Image
              className={`${isCursorPointer && "cursor-pointer"}`}
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              src={imgData.imageUrls[0]}
              alt="Image"
            />
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
                    <p>Price: (imgData.price) €</p>
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
                  <Link href={"/"}>
                    <div className="group grid scale-100 place-content-center rounded-2xl px-2 py-1 transition-all duration-200 ease-in-out hover:bg-blue-500 hover:text-white">
                      <span className="cursor-pointer">Add to cart</span>
                    </div>
                  </Link>
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

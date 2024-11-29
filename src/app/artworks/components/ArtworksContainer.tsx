import { Item } from "@/types/dataTypes";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface ImagesContainerProps {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
}

const ArtworksContainer = ({ item }: ImagesContainerProps) => {
  return (
    <section className="flex justify-center">
      {/*AJOUT DE HEROSUBCONTENT*/}
      <div className="flex flex-col gap-20 lg:gap-72">
        {item.map((imgData: Item, id: number) => (
          <div
            className="flex max-h-[80vh] max-w-[80vw] flex-col gap-10"
            key={id}
          >
            <Image
              className="h-full w-full object-contain"
              width={5000}
              height={5000}
              src={imgData.imageUrls[0]}
              alt="Image"
            />

            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between md:gap-0 md:px-10">
              <div className="flex w-full justify-between gap-6">
                <div className="md:text-md flex flex-wrap gap-3 lg:text-lg">
                  <p>{imgData.title}</p>
                  <span>|</span>
                  <p>{imgData.dimension}</p>
                  <span>|</span>
                  <p>{imgData.date}</p>
                </div>

                <Link href={`/artworks/${imgData.id}`} className="self-end">
                  <div className="group flex items-center gap-2 text-blue-500">
                    <p className="cursor-pointer">Learn more</p>
                    <div className="icon transition-all duration-200 ease-in-out group-hover:translate-x-1">
                      <IoIosArrowForward />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtworksContainer;

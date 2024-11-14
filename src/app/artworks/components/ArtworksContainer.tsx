import { Item } from "@/types/dataTypes";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface ImagesContainerProps {
  filter: string;
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
}

const ArtworksContainer = ({
  filter,
  item,
  isCursorPointer,
}: ImagesContainerProps) => {
  return (
    <section className="flex justify-center">
      {/*AJOUT DE HEROSUBCONTENT*/}
      <div className="md:max-h-screen-sm flex flex-col gap-40 md:max-w-screen-sm">
        {item.map((imgData: Item, id: number) => (
          <div className="flex flex-col gap-10" key={id}>
            {filter === "artworks" ? (
              <Image
                width={800}
                height={800}
                layout="responsive"
                objectFit="contain"
                src={imgData.imageUrls[0]}
                alt="Image"
              />
            ) : (
              <div className="flex flex-col gap-6">
                <Link href={`/artworks/${imgData.id}`}>
                  <Image
                    className={`${isCursorPointer && "cursor-pointer"}`}
                    width={800}
                    height={800}
                    layout="responsive"
                    objectFit="contain"
                    src={imgData.imageUrls[0]}
                    alt="Image"
                  />
                </Link>
              </div>
            )}
            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between md:gap-0 md:px-10">
              <div className="flex w-full justify-between gap-6">
                <div className="md:text-md flex flex-wrap gap-3 lg:text-lg">
                  <p>{imgData.title}</p>
                  <span>|</span>
                  <p>{imgData.dimension}</p>
                  <span>|</span>
                  <p>{imgData.date}</p>
                </div>
                {filter === "project" && (
                  <Link href={`/artworks/${imgData.id}`} className="self-end">
                    <div className="group flex items-center gap-2 text-blue-500">
                      <p className="cursor-pointer">Learn more</p>
                      <div className="icon transition-all duration-200 ease-in-out group-hover:translate-x-1">
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtworksContainer;
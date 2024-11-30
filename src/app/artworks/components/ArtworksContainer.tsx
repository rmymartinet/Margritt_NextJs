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
    <div className="flex flex-col items-center gap-40">
      {item.map((imgData: Item, id: number) => (
        <div key={id} className="w-max-screen flex flex-col gap-4 md:h-[70vh]">
          <Image
            className="h-full w-full cursor-pointer object-contain"
            width={5000}
            height={5000}
            src={imgData.imageUrls[0]}
            alt="Image"
          />
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
            <div className="flex w-full justify-between">
              <div className="flex flex-wrap gap-3">
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
  );
};

export default ArtworksContainer;

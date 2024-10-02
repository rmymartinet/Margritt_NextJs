import { Item } from "@/app/types/dataTypes";
import Image from "next/image";
import Link from "next/link";

interface ImagesContainerProps {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
}

const GalleryContainer = ({ item, isCursorPointer }: ImagesContainerProps) => {
  return (
    <section className="flex h-screen justify-center">
      {/*AJOUT DE HEROSUBCONTENT*/}
      <div className="md:max-h-screen-sm flex flex-col gap-40 md:max-w-screen-sm">
        {item.map((imgData: Item, id: number) => (
          <div className="flex flex-col gap-10" key={id}>
            <Link href={`/gallery/${imgData.id}`}>
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
            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between md:gap-0 md:px-10">
              <div className="flex flex-col gap-6">
                <div className="md:text-md flex flex-wrap gap-3 lg:text-lg">
                  <p>{imgData.title}</p>
                  <span>|</span>
                  <p>{imgData.format}</p>
                  <span>|</span>
                  <p>{imgData.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryContainer;

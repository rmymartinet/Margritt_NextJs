import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useCarousel from "../hooks/useCarousel";

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const { carouselIndex, handleNextSlide, handlePrevSlide } =
    useCarousel(imageUrls);

  return (
    <section className="w-full">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          className="h-full w-full object-contain"
          width={2000}
          height={2000}
          loading="lazy"
          src={imageUrls[carouselIndex] || ""}
          alt=""
        />

        {/* Les flèches de navigation positionnées par rapport au conteneur, pas à l'image */}
        <div className="absolute inset-0 flex items-center justify-between px-5">
          <div
            className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white"
            onClick={handlePrevSlide}
            style={{ userSelect: "none" }}
          >
            <IoIosArrowBack size={20} />
          </div>
          <div
            className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white"
            onClick={handleNextSlide}
            style={{ userSelect: "none" }}
          >
            <IoIosArrowForward size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;

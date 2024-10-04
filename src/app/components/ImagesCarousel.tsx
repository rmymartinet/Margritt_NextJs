import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useCarousel from "../hooks/useCarousel";

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const { carouselIndex, handleNextSlide, handlePrevSlide } =
    useCarousel(imageUrls);

  return (
    <section>
      <Image
        className="flex h-full w-full object-cover"
        width={600}
        height={600}
        layout="responsive"
        loading="lazy"
        src={imageUrls[carouselIndex] || ""}
        alt=""
      />
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 justify-between md:px-10">
        <div
          className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white md:-translate-x-10"
          onClick={handlePrevSlide}
          style={{ userSelect: "none" }}
        >
          <IoIosArrowBack size={20} />
        </div>
        <div
          className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white md:translate-x-10"
          onClick={handleNextSlide}
          style={{ userSelect: "none" }}
        >
          <IoIosArrowForward size={20} />
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;

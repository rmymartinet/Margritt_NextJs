import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useCarousel from "../hooks/useCarousel";

gsap.registerPlugin(useGSAP);

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const { carouselIndex, handleNextSlide, handlePrevSlide } =
    useCarousel(imageUrls);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const scaleButton = (ref: React.RefObject<HTMLDivElement>) => {
    const tl = gsap.timeline();
    tl.to(ref.current, {
      scale: 1.2,
      duration: 0.2,
    }).to(ref.current, {
      scale: 1,
      duration: 0.2,
    });
  };

  return (
    <section className="w-full">
      <div className="relative h-[80vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-full w-full object-contain"
          src={imageUrls[carouselIndex] || ""}
          alt=""
        />
        {/* Les flèches de navigation positionnées par rapport au conteneur, pas à l'image */}
        <div className="absolute inset-0 flex items-center justify-between px-5 lg:px-20">
          <div
            ref={prevRef}
            className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white"
            onClick={() => {
              handlePrevSlide();
              scaleButton(prevRef);
            }}
            style={{ userSelect: "none" }}
          >
            <IoIosArrowBack size={20} />
          </div>
          <div
            ref={nextRef}
            className="grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-white"
            onClick={() => {
              handleNextSlide();
              scaleButton(nextRef);
            }}
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

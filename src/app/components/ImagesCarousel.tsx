import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import CustomCursor from "./CustomCursor";
import { ImageCarouselProps } from "@/types/dataTypes";
import { useZoom } from "../context/ZoomProvider";
import { CiZoomIn } from "react-icons/ci";
import useWindowWidth from "../hooks/useWindowWidth";

const ImageCarousel = ({
  mainImgRef,
  imageUrls,
  carouselIndex,
  setCarouselIndex,
  isHovering,
  setIsHovering,
  isNextButton,
}: ImageCarouselProps) => {
  const carouselRef = useRef<(HTMLImageElement | null)[]>([]);
  const { setIsZoom } = useZoom();

  useEffect(() => {
    carouselRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: -1000,
        },
        {
          delay: index * 0.02,
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
        },
      );
    });
  }, []);

  useEffect(() => {
    if (isNextButton) {
      carouselRef.current.forEach((el, index) => {
        gsap.to(el, {
          delay: index * 0.02,
          opacity: 1,
          y: 200,
          duration: 1,
          ease: "power2.out",
        });
      });
    }
  }, [isNextButton]);

  const { width } = useWindowWidth();

  return (
    <div className="flex flex-col justify-between gap-10">
      <div className="h-[40vh] w-[95vw] overflow-hidden md:h-[70vh] md:w-[90vw] lg:h-[60vh] lg:w-[60vw]">
        <CustomCursor isHovering={isHovering} />

        <div
          ref={mainImgRef}
          className="opacity-1 relative h-full w-full"
          onClick={() => setIsZoom(true)}
        >
          {width <= 768 && (
            <div
              className="absolute right-5 top-20 z-[99999] rounded-full bg-black p-2"
              onClick={() => setIsZoom(true)}
            >
              <CiZoomIn size={25} color="white" />
            </div>
          )}
          <Image
            className="h-full w-full object-contain"
            src={imageUrls[carouselIndex] || ""}
            alt=""
            width={5000}
            height={5000}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden">
        {imageUrls.map((item, index) => (
          <Image
            ref={(el) => {
              carouselRef.current[index] = el;
            }}
            key={index}
            className="h-16 w-16 cursor-pointer object-cover md:h-32 md:w-32"
            src={item || ""}
            alt=""
            width={5000}
            height={5000}
            onClick={() => setCarouselIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useCart } from "@/app/context/CardContext";
import useFilteredDataById from "../../hooks/useFilteredDataById";
import ProductDetails from "@/app/components/Product/ProductDetails";
import CustomCursor from "@/app/components/CustomCursor";
import ZoomedImage from "@/app/components/ZoomedImage";
import { useZoom } from "@/app/context/ZoomProvider";
import ImageCarousel from "@/app/components/ImagesCarousel";
import useHover from "@/app/hooks/Hover";

interface OriginalItemProps {
  params: {
    id: string;
  };
}

export default function OriginalItem({ params }: OriginalItemProps) {
  const { id } = params;
  const product = useFilteredDataById(id);
  const { isShoppingOpen } = useCart();
  const { isZoom, setIsZoom } = useZoom();
  const zoomContainerRef = useRef(null);
  const mainImgRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isNextButton, setIsNextButton] = useState(false);
  const { isHovering, setIsHovering } = useHover();

  useEffect(() => {
    if (isZoom && zoomContainerRef.current) {
      gsap.from(zoomContainerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isZoom]);

  useEffect(() => {
    if (product && product.imageUrls.length > 0 && !hasAnimated) {
      gsap.from(mainImgRef.current, {
        opacity: 0,
        x: 1000,
        duration: 1.5,
        ease: "power2.out",
      });
      setHasAnimated(true);
    }
  }, [product, hasAnimated]);

  useEffect(() => {
    if (isHovering) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isHovering]);

  useEffect(() => {
    gsap.to(mainImgRef.current, {
      opacity: 0,
      x: -1500,
      duration: 1,
      ease: "power2.out",
    });
  }, [isNextButton]);

  if (!product) {
    return null;
  }

  const handleZoomImage = () => {
    setIsZoom(true);
  };

  return (
    <>
      {isZoom && (
        <ZoomedImage
          src={product.imageUrls[carouselIndex] || ""}
          onClose={() => setIsZoom(false)}
        />
      )}

      <section
        className={`flex items-center justify-center overflow-hidden px-10 lg:-mt-[12vh] ${isZoom && "blur-md"} ${isShoppingOpen ? "opacity-60" : "opacity-100"}`}
      >
        <div className="flex flex-col items-center gap-10 px-2 md:px-0 lg:grid lg:grid-cols-customShopId">
          <div className="relative flex items-center justify-center">
            {product.imageUrls.length > 2 ? (
              <ImageCarousel
                mainImgRef={mainImgRef}
                imageUrls={product.imageUrls}
                carouselIndex={carouselIndex}
                setCarouselIndex={setCarouselIndex}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
                isNextButton={isNextButton}
              />
            ) : (
              <div
                className="h-[40vh] w-[95vw] overflow-hidden md:h-[70vh] md:w-[90vw] lg:h-[60vh] lg:w-[60vw]"
                onClick={handleZoomImage}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CustomCursor isHovering={isHovering} />
                <div ref={mainImgRef} className="opacity-1">
                  <Image
                    className="h-full w-full object-contain"
                    src={product.thumbnailUrl || ""}
                    alt={product.title || ""}
                    width={5000}
                    height={5000}
                  />
                </div>
              </div>
            )}
          </div>
          <ProductDetails
            category={product.category || ""}
            product={product}
            hasAnimated={hasAnimated}
            setIsNextButton={setIsNextButton}
            isNextButton={isNextButton}
          />
        </div>
      </section>
    </>
  );
}

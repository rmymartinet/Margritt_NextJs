import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ZoomedImageProps } from "@/types/dataTypes";
import useWindowWidth from "../hooks/useWindowWidth";

const ZoomedImage = ({ src, onClose }: ZoomedImageProps) => {
  const zoomContainerRef = useRef(null);

  const { width } = useWindowWidth();

  useEffect(() => {
    if (zoomContainerRef.current) {
      gsap.fromTo(
        zoomContainerRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.inOut",
        },
      );
    }
  }, []);

  return (
    <>
      <div
        ref={zoomContainerRef}
        className="absolute left-1/2 top-0 z-50 -mt-[19vh] flex h-screen w-screen -translate-x-1/2 items-center justify-center px-40"
      >
        <Image
          className="h-full w-full object-contain"
          src={src}
          alt="Zoomed Image"
          width={5000}
          height={5000}
        />
      </div>
      <button
        className={`fixed left-5 top-0 z-50 ${width <= 768 ? "mt-0" : "-mt-[10vh]"} w-max rounded-full bg-black p-2 text-white`}
        onClick={onClose}
      >
        Close
      </button>
    </>
  );
};

export default ZoomedImage;

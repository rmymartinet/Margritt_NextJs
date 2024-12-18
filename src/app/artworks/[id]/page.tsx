"use client";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import Skeleton from "@/app/components/Skeleton/Skeleton";

interface Params {
  id: string;
}

export default function GalleryItem({ params }: { params: Params }) {
  const { id } = params;
  const { data } = useFilteredData();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { width } = useWindowWidth();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleBackToPreviousPage = () => {
    router.push("/artworks");
  };

  const filteredDataById = data.filter((item) => item.id === id);
  const datas = filteredDataById[0];
  const category = filteredDataById[0]?.category;
  const existingItemsSameCategory = data.filter(
    (item) => item.category === category,
  );

  const handleNextProject = () => {
    const currentProjectIndex = existingItemsSameCategory.findIndex(
      (item) => item.id === id,
    );
    const nextProjectIndex =
      currentProjectIndex === existingItemsSameCategory.length - 1
        ? 0
        : currentProjectIndex + 1;
    const nextProjectId = existingItemsSameCategory[nextProjectIndex].id;
    router.push(`/artworks/${nextProjectId}`);
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsImageLoaded(true);
    }, 1500);
  };

  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-50 flex w-full items-center justify-between">
        <div
          onClick={handleBackToPreviousPage}
          className="grid cursor-pointer place-content-center rounded-full bg-[#7AB2D3] px-2 py-1 font-medium text-white"
        >
          Back
        </div>
        <div
          onClick={handleNextProject}
          className="grid cursor-pointer place-content-center rounded-full bg-[#7AB2D3] px-2 py-1 font-medium text-white"
        >
          Next project
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col gap-4 py-20">
        <div ref={containerRef} className="flex flex-col gap-4">
          {!isImageLoaded && <Skeleton className="h-[80vh] w-full" />}
          <Image
            width={5000}
            height={5000}
            className={`max-h-[80vh] w-full object-contain ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            src={datas?.thumbnailUrl || datas?.imageUrls[0]}
            alt=""
            onLoadingComplete={handleImageLoad}
          />

          <div className="relative w-full overflow-hidden">
            {!isMouseEnter && width <= 768 && (
              <div className="glassmorphism absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-between px-4 text-white">
                <span className="mr-4">Swipe</span>
                <FaArrowRightLong />
              </div>
            )}
            {datas?.imageUrls.length > 1 && (
              <section
                className="flex justify-between gap-4 overflow-x-auto lg:grid lg:grid-cols-3"
                onTouchStart={() => setIsMouseEnter(true)}
                onTouchEnd={() => setIsMouseEnter(false)}
              >
                {datas?.imageUrls.slice(1).map((url, index) => {
                  return (
                    <Image
                      key={index}
                      width={5000}
                      height={5000}
                      className={`h-full w-full object-cover ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                      src={url}
                      alt=""
                    />
                  );
                })}
              </section>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-10 md:grid md:grid-cols-2">
          <video
            className="inset-0 h-[50vh] w-full object-cover object-center"
            loop
            muted
            autoPlay
            src={datas?.videoUrl}
          />
          <div className="flex w-full flex-col justify-between gap-10">
            <h1 className="text-3xl font-semibold">{datas?.title}</h1>
            <p className="text-pretty">{datas?.text}</p>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <p className="text-md">
                <span className="font-semibold">Format:</span> {datas?.format}
              </p>
              <p className="text-md">
                <span className="font-semibold">Dimensions:</span>{" "}
                {datas?.dimension}
              </p>
              <p className="text-md">
                <span className="font-semibold">Date:</span> {datas?.date}
              </p>
              <p className="text-md">
                <span className="font-semibold">Serie:</span> {datas?.serie}
              </p>
              <p className="text-md">
                <span className="font-semibold">Materials:</span>{" "}
                {datas?.materials}
              </p>
              <p className="text-md">
                <span className="font-semibold">Paper:</span> {datas?.paper}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

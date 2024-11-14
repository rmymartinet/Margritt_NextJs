"use client";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(Draggable, useGSAP);

interface Params {
  id: string;
}

export default function GalleryItem({ params }: { params: Params }) {
  const { id } = params;
  const { data } = useFilteredData();
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { width } = useWindowWidth();

  const handleBackToPreviousPage = () => {
    router.push("/artworks");
  };

  // Filtrer les données basées sur l'ID du produit
  const filteredDataById = data.filter((item) => item.id === id);
  const datas = filteredDataById[0];

  console.log(datas);

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
    router.push(`/gallery/${nextProjectId}`);
  };

  return (
    <section>
      <div className="fixed -top-20 left-0 z-50 flex w-full items-center justify-between">
        <div
          onClick={() => handleBackToPreviousPage()}
          className="grid h-5 w-5 cursor-pointer place-content-center rounded-full bg-black text-white"
        >
          <IoClose size={14} />
        </div>
        <div
          onClick={() => handleNextProject()}
          className="grid cursor-pointer place-content-center rounded-xl bg-black px-2 py-1 text-sm text-white"
        >
          Next project
        </div>
      </div>
      <div className="relative mt-28">
        <div ref={containerRef} className="flex flex-col gap-4">
          <div className="flex flex-col gap-10 border-2 border-red-300 md:grid md:grid-cols-2">
            <Image
              width={5000}
              height={5000}
              className="h-full w-full object-cover"
              src={datas?.imageUrls[0]}
              alt=""
            />
            <div className="flex flex-col items-center justify-between gap-8 px-4">
              <p className="text-pretty">{datas?.text}</p>
              <div className="h-[500px]">
                <video
                  className="h-full w-full object-cover"
                  loop
                  muted
                  autoPlay
                  src={datas?.videoUrl}
                />
              </div>
              <div className="flex w-full justify-between">
                <h1 className="text-lg font-semibold">{datas?.title}</h1>
                <span className="text-md font-semibold">{datas?.format}</span>
              </div>
            </div>
          </div>
          <div className="relative w-full overflow-hidden">
            {!isMouseEnter && width <= 768 && (
              <div className="glassmorphism absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-between px-4 text-white">
                <span className="mr-4">Swipe</span>
                <FaArrowRightLong />
              </div>
            )}
            {datas?.imageUrls.length > 1 && (
              <>
                <section
                  className="flex justify-between gap-2 overflow-x-auto lg:grid lg:grid-cols-3"
                  onTouchStart={() => setIsMouseEnter(true)}
                  onTouchEnd={() => setIsMouseEnter(false)}
                >
                  {datas?.imageUrls.slice(1).map((url, index) => {
                    return (
                      <Image
                        key={index}
                        width={5000}
                        height={5000}
                        className="object-cover"
                        src={url}
                        alt=""
                      />
                    );
                  })}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

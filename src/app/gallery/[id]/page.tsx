"use client";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Usage: App router
import { useCallback, useRef } from "react";

gsap.registerPlugin(Draggable, useGSAP);

interface Params {
  id: string;
}

export default function GalleryItem({ params }: { params: Params }) {
  const { id } = params;
  const { data } = useFilteredData();
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLElement[]>([]);
  const width = useWindowWidth();
  const router = useRouter();

  const handleBackToPreviousPage = () => {
    router.back();
  };

  // Filtrer les données basées sur l'ID du produit
  const filteredDataById = data.filter((item) => item.id === id);

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

  const datas = filteredDataById[0];

  const setMarkerRef = useCallback((el: HTMLElement | null, i: number) => {
    if (el) markersRef.current[i] = el;
  }, []);

  useGSAP(() => {
    if (
      width >= 1024 &&
      filteredDataById &&
      filteredDataById.length > 0 &&
      timelineRef.current &&
      scrollerRef.current &&
      containerRef.current
    ) {
      const timelineWidth = timelineRef.current?.offsetWidth || 0;
      const scrollerWidth = scrollerRef.current?.offsetWidth || 0;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const gap = parseInt(getComputedStyle(document.body).fontSize);
      const maxDragX = timelineWidth - scrollerWidth - 2 * gap;

      Draggable.create(scrollerRef.current, {
        type: "x",
        bounds: { minX: gap, maxX: maxDragX },
        onDrag: function () {
          const progress = (this.x - gap) / maxDragX;
          const margin = 100; // Vous pouvez ajuster cette valeur en fonction de vos besoins
          const containerX =
            -progress * (containerWidth + margin - timelineWidth);
          // Utilisation de gsap.set pour des petites modifications de position
          gsap.set(containerRef.current, { x: containerX });

          // Position avant du scroller
          const scrollerPosLeft =
            scrollerRef.current?.getBoundingClientRect().left;
          const markerPositions = markersRef.current?.map(
            (marker) => marker.getBoundingClientRect().left,
          );

          markerPositions.forEach((markerPosX, i) => {
            if (
              (scrollerPosLeft ?? 0) >= markerPosX - 30 &&
              (scrollerPosLeft ?? 0) <= markerPosX + 30
            ) {
              gsap.to(markersRef.current[i], {
                y: -10, // Lève légèrement le tiret
                duration: 0.3,
                ease: "power1.out",
              });
            } else {
              gsap.to(markersRef.current[i], {
                y: 0, // Remet à sa position initiale
                duration: 0.3,
                ease: "power1.out",
              });
            }
          });
        },
      });
    }
  }, [
    width,
    filteredDataById,
    timelineRef,
    scrollerRef,
    containerRef,
    markersRef,
  ]);

  return (
    <div className="relative h-screen lg:w-screen">
      {width < 1024 && (
        <div className="fixed bottom-4 left-0 z-50 flex w-full justify-between px-2 md:px-10">
          <div
            onClick={() => handleBackToPreviousPage()}
            className="grid h-10 w-10 place-content-center rounded-full bg-white text-black"
          >
            x
          </div>
          <div
            onClick={() => handleNextProject()}
            className="grid place-content-center rounded-xl bg-white px-4 text-black"
          >
            Next project
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="flex flex-col lg:absolute lg:left-0 lg:top-0 lg:h-[90vh] lg:w-max lg:flex-row"
      >
        <section className="flex gap-4 p-8">
          <Image
            width={2000}
            height={2000}
            layout="responsive"
            key={id}
            className="h-full w-full object-contain"
            src={datas?.imageUrls[0]}
            alt=""
          />
        </section>
        <section className="flex flex-col justify-between gap-8 p-8 lg:w-[50vw] lg:flex-row">
          <h1 className="text-pretty uppercase md:text-4xl lg:w-1/2">
            Beyond the Veil, Threads Woven from the Shadows of Tomorrow is
            launching soon
          </h1>
          <p className="text-base lg:w-2/5">
            In a world frayed at the edges, our garments emerge as relics...
          </p>
        </section>
        {datas?.imageUrls.length > 1 && (
          <>
            <section className="flex flex-col justify-between gap-8 p-8 lg:flex-row">
              <Image
                width={1000}
                height={1000}
                layout="responsive"
                key={id}
                className="h-full w-full object-cover"
                src={datas?.imageUrls[1]}
                alt=""
              />
              <Image
                width={1000}
                height={1000}
                layout="responsive"
                key={id}
                className="h-full w-full object-cover"
                src={datas?.imageUrls[2]}
                alt=""
              />
            </section>
            <section className="flex flex-col justify-between gap-8 p-8 lg:w-[50vw] lg:flex-row">
              <h1 className="text-pretty uppercase md:text-4xl lg:w-1/2">
                Beyond the Veil, Threads Woven from the Shadows of Tomorrow is
                launching soon
              </h1>
              <p className="text-base lg:w-2/5">
                In a world frayed at the edges, our garments emerge as relics...
              </p>
            </section>
          </>
        )}
      </div>
      {width >= 1024 && (
        <div
          ref={timelineRef}
          className="fixed bottom-0 left-0 flex h-[10vh] w-screen items-center justify-around p-8"
        >
          <div
            ref={scrollerRef}
            className="glassmorphism relative cursor-grab px-8 py-2 text-xs"
          >
            <span>[Drag]</span>
          </div>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => setMarkerRef(el, i)}
              className="marker mx-1 h-6 w-[1px] bg-black"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

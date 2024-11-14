"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import useWindowWidth from "../hooks/useWindowWidth";
import ArtworksContainer from "./components/ArtworksContainer";

export default function Artworks() {
  const { data } = useFilteredData("project");
  const maxSizeRef = useRef(null);

  const { width } = useWindowWidth();

  useEffect(() => {
    if (width > 768) {
      gsap.to(maxSizeRef.current, {
        delay: 2,
        fontSize: "8rem",
        duration: 1.5,
        ease: "elastic.out(0.5, 0.2)",
      });
    } else {
      gsap.to(maxSizeRef.current, {
        delay: 2,
        fontSize: "4rem",
        duration: 1.5,
        ease: "elastic.out(0.5, 0.2)",
      });
    }
  }, [width]);

  return (
    <section className="min-h-screen">
      <div className="mb-40 flex flex-col items-center justify-center gap-10 lg:gap-20">
        <div className="tex text-pretty text-center text-4xl leading-tight lg:text-8xl">
          My vision in <span ref={maxSizeRef}>Maxi size</span>
        </div>
        <p className="text-xl text-slate-400">
          Discover my biggest projects more than 2 meters
        </p>
      </div>
      <ArtworksContainer item={data} />
    </section>
  );
}

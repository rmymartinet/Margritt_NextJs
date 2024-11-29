"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import useWindowWidth from "../hooks/useWindowWidth";
import ArtworksContainer from "./components/ArtworksContainer";
import Filter from "../components/Filter/Filter";
import { Item } from "@/types/dataTypes";

export default function Artworks() {
  const { data } = useFilteredData("");
  const [category, setCategory] = useState("maxi");
  const maxSizeRef = useRef(null);
  const { width } = useWindowWidth();
  const [items, setItems] = useState<Item[]>([]);

  const filterDataByFormat = (data: Item[]) => {
    let dataFiltered = data;
    switch (category) {
      case "maxi":
        dataFiltered = data.filter((item) => item.category === "maxi");
        break;
      case "mini":
        dataFiltered = data.filter((item) => item.category === "mini");
        break;
      default:
        dataFiltered = data;
    }

    setItems(dataFiltered);
  };

  useEffect(() => {
    if (data) {
      filterDataByFormat(data);
    }
  }, [data, category]);

  useEffect(() => {
    if (width > 768 && category === "maxi") {
      gsap.to(maxSizeRef.current, {
        fontSize: "8rem",
        duration: 1.5,
        ease: "elastic.out(0.5, 0.2)",
      });
    } else {
      gsap.to(maxSizeRef.current, {
        fontSize: "4rem",
        duration: 1.5,
        ease: "elastic.out(0.5, 0.2)",
      });
    }
  }, [width, category]);

  return (
    <section className="min-h-screen">
      <div className="mb-20 flex flex-col items-center justify-center gap-10">
        <div className="text-pretty text-center text-4xl leading-tight lg:text-8xl">
          My vision in{" "}
          <span ref={maxSizeRef}>
            {category.charAt(0).toLocaleUpperCase() + category.slice(1)} size
          </span>
        </div>
        <p className="text-xl text-slate-400">
          Discover my biggest projects more than{" "}
          {category === "maxi" ? "2 meters" : "120 x 80 cm"}
        </p>
      </div>
      <div>
        <Filter
          categories={["maxi", "mini"]}
          setCategory={setCategory}
          categoryState={category}
        />
      </div>
      <ArtworksContainer item={items} />
    </section>
  );
}

"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import useWindowWidth from "../hooks/useWindowWidth";
import ArtworksContainer from "./components/ArtworksContainer";
import Filter from "../components/Filter/Filter";
import { Item } from "@/types/dataTypes";
import { TextTransition } from "../components/Animations/TitleTransition";

export default function Artworks() {
  const [category, setCategory] = useState("maxi");
  const { data } = useFilteredData(category);
  const [series, setSeries] = useState("all");
  const maxSizeRef = useRef(null);
  const { width } = useWindowWidth();
  const [items, setItems] = useState<Item[]>([]);

  const filterData = useCallback(
    (data: Item[]) => {
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

      switch (series) {
        case "Bibulle":
          dataFiltered = dataFiltered.filter(
            (item) => item.serie === "Bibulle",
          );
          break;
        case "Futurama":
          dataFiltered = dataFiltered.filter(
            (item) => item.serie === "Futurama",
          );
          break;
        default:
          break;
      }

      setItems(dataFiltered);
    },
    [category, series],
  );

  useEffect(() => {
    if (data) {
      filterData(data);
    }
  }, [data, category, series, filterData]);

  useEffect(() => {
    if (width > 768 && category === "maxi") {
      gsap.to(maxSizeRef.current, {
        fontSize: "8rem",
        duration: 1.5,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(maxSizeRef.current, {
        fontSize: "4rem",
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  }, [width, category]);

  return (
    <section className="min-h-screen">
      <div className="mb-20 flex flex-col items-center justify-center gap-10">
        <div className="text-pretty text-center text-4xl font-medium leading-tight lg:text-8xl">
          My vision in{" "}
          <span ref={maxSizeRef}>
            {category.charAt(0).toLocaleUpperCase() + category.slice(1)} size
          </span>
        </div>
        <TextTransition>
          <p className="text-center text-xl text-slate-400">
            Discover my biggest projects more than{" "}
            {category === "maxi" ? "2 meters" : "120 x 80 cm"}
          </p>
        </TextTransition>
      </div>
      <div>
        <Filter
          categories={["maxi", "mini"]}
          setCategory={setCategory}
          categoryState={category}
          series={["all", "Bibulle", "Futurama"]}
          setSeries={setSeries}
          seriesState={series}
        />
      </div>
      <ArtworksContainer item={items} />
    </section>
  );
}

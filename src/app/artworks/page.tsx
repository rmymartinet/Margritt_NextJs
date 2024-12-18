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
  const [subCategory, setSubCategory] = useState("maxi");
  const { data } = useFilteredData(subCategory);

  console.log(data);
  const [series, setSeries] = useState("all");
  const maxSizeRef = useRef(null);
  const { width } = useWindowWidth();
  const [items, setItems] = useState<Item[]>([]);

  const filterData = useCallback(
    (data: Item[]) => {
      let dataFiltered = data;
      switch (subCategory) {
        case "maxi":
          dataFiltered = data.filter((item) => item.subCategory === "maxi");
          break;
        case "mini":
          dataFiltered = data.filter((item) => item.subCategory === "mini");
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
    [subCategory, series],
  );

  useEffect(() => {
    if (data) {
      filterData(data);
    }
  }, [data, subCategory, series, filterData]);

  useEffect(() => {
    if (width > 768 && subCategory === "maxi") {
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
  }, [width, subCategory]);

  return (
    <section className="min-h-screen">
      <div className="mb-20 flex flex-col items-center justify-center gap-10">
        <div className="text-pretty text-center text-4xl font-medium leading-tight lg:text-8xl">
          My vision in{" "}
          <span ref={maxSizeRef}>
            {subCategory.charAt(0).toLocaleUpperCase() + subCategory.slice(1)}{" "}
            size
          </span>
        </div>
        <TextTransition>
          {subCategory === "maxi" ? (
            <p className="text-center text-xl text-slate-400">
              Discover my biggest projects more than{" "}
              <span className="font-medium text-[#4A628A]">2 meters</span>
            </p>
          ) : (
            <p className="text-center text-xl text-slate-400">
              Discover my biggest projects more than{" "}
              <span className="font-medium text-[#4A628A]">120 x 90 cm</span>
            </p>
          )}
        </TextTransition>
      </div>
      <div>
        <Filter
          categories={["maxi", "mini"]}
          setCategory={setSubCategory}
          categoryState={subCategory}
          series={["all", "Bibulle", "Futurama"]}
          setSeries={setSeries}
          seriesState={series}
        />
      </div>
      <ArtworksContainer item={items} />
    </section>
  );
}

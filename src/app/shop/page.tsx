"use client";

import { Item } from "@/types/dataTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import Filter from "../components/Filter/Filter";
import ImagesContainer from "../components/ImageContainer";
import { useFilteredData } from "../hooks/useFilteredData";
import { TextTransition } from "../components/Animations/TitleTransition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Shop() {
  const [category, setCategory] = useState("prints");
  const [format, setFormat] = useState("all");
  const [series, setSeries] = useState("all");
  const { data } = useFilteredData(category);
  const [items, setItems] = useState<Item[]>([]);

  const filterData = useCallback(
    (data: Item[]) => {
      let dataFiltered = data;

      switch (format) {
        case "large":
          dataFiltered = dataFiltered.filter((item) => item.format === "large");
          break;
        case "medium":
          dataFiltered = dataFiltered.filter(
            (item) => item.format === "medium",
          );
          break;
        default:
          break;
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
    [format, series],
  );

  useEffect(() => {
    if (data) {
      filterData(data);
    }
  }, [data, format, series, filterData]);

  const titleContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleContainerRef.current) {
      const children = titleContainerRef.current?.children;
      gsap.from(children, {
        skewX: 30,
        y: 400,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="mb-20 flex flex-col items-center justify-center gap-10 lg:gap-20">
        <div ref={titleContainerRef}>
          <h1 className="text-center text-4xl font-medium lg:text-8xl">
            Prints are{" "}
            <span className="border-b-8 border-[#B9E5E8]">Available</span>
          </h1>
        </div>
        <TextTransition textClassName="text-center">
          <p className="text-pretty text-center text-slate-400 md:w-[70%]">
            Prints are high-quality reproductions of my original works, perfect
            for appreciating every detail and nuance of my creations. If you’d
            like to know more about one of my original pieces, feel free to
            contact me by email
          </p>
        </TextTransition>
      </div>
      <Filter
        categories={["prints"]}
        setCategory={setCategory}
        categoryState={category}
        formats={["all", "large", "medium"]}
        setFormat={setFormat}
        formatsState={format}
        series={["all", "Bibulle", "Futurama"]}
        setSeries={setSeries}
        seriesState={series}
      />
      <ImagesContainer item={items} />
    </div>
  );
}

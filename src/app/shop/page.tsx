"use client";

import { Item } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import Filter from "../components/Filter/Filter";
import ImagesContainer from "../components/ImageContainer";
import { useFilteredData } from "../hooks/useFilteredData";

export default function Shop() {
  const [filters, setFilters] = useState({
    category: "prints",
    format: "",
  });
  const { data } = useFilteredData(filters.category);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const filteredItems = data.filter((item: Item) => {
      const matchCategory = filters.category
        ? item.category === filters.category
        : true;

      const matchFormat =
        filters.format === "" || filters.format === "all"
          ? true
          : item.format === filters.format;

      return matchCategory && matchFormat;
    });

    setItems(filteredItems);
  }, [data, filters]);

  const updateFilters = (type: "category" | "format", value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-40 flex flex-col items-center justify-center gap-10 lg:gap-20">
        <h1 className="text-center text-4xl lg:text-8xl">
          Prints are{" "}
          <span className="border-b-8 border-green-400">Available</span>
        </h1>
        <p className="text-pretty text-center text-slate-400 md:w-[70%]">
          Prints are high-quality reproductions of my original works, perfect
          for appreciating every detail and nuance of my creations. If you’d
          like to know more about one of my original pieces, feel free to
          contact me by email
        </p>
      </div>
      <Filter
        setFilters={updateFilters}
        selectedCategory={filters.category}
        selectedFormat={filters.format}
      />
      <ImagesContainer item={items} />
    </div>
  );
}

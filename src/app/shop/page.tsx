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
          Originals and Prints{" "}
          <span className="border-b-8 border-green-400">Availables</span>
        </h1>
        <p className="text-slate-400">
          The original is the authentic artwork. The print is a more accessible
          reproduction
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

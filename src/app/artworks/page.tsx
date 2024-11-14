"use client";

import { useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import Filter from "./components/Filter";
import GalleryContainer from "./components/GalleryContainer";

export default function Gallery() {
  const [active, setActive] = useState("gallery");
  const { data } = useFilteredData(active);

  return (
    <section className="">
      <div className="mb-10">
        <Filter active={active} setActive={setActive} />
      </div>
      <GalleryContainer filter={active} item={data} />
    </section>
  );
}

"use client";

import { useState } from "react";
import { useItemsFiltered } from "../hooks/useFilteredData";
import Filter from "./_components/Filter";
import GalleryContainer from "./_components/GalleryContainer";

export default function Gallery() {
  const [active, setActive] = useState("gallery");
  const { data } = useItemsFiltered(active);

  return (
    <section className="h-max md:h-screen">
      <div className="mb-10">
        <Filter active={active} setActive={setActive} />
      </div>
      <GalleryContainer item={data} />
    </section>
  );
}
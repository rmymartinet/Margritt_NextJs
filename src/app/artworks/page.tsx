"use client";

import { useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import ArtworksContainer from "./components/ArtworksContainer";
import Filter from "./components/Filter";

export default function Artworks() {
  const [active, setActive] = useState("artworks");
  const { data } = useFilteredData(active);

  return (
    <section className="">
      <div className="mb-10">
        <Filter active={active} setActive={setActive} />
      </div>
      <ArtworksContainer filter={active} item={data} />
    </section>
  );
}

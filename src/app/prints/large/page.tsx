"use client";

import Footer from "@/app/components/Footer/Footer";
import ImagesContainer from "../../components/ImageContainer";
import { useFilteredData } from "../../hooks/useFilteredData";

export default function Originals() {
  const { data } = useFilteredData("original");

  const path = "large";

  const filteredDatByDimension = data.filter(
    (item) => item.dimension === "large-formats",
  );

  return (
    <div>
      <ImagesContainer
        item={filteredDatByDimension}
        isTirage={true}
        path={path}
      />
      <Footer />
    </div>
  );
}

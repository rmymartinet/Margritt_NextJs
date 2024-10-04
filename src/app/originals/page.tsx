"use client";

import ImagesContainer from "../components/ImageContainer";
import { useFilteredData } from "../hooks/useFilteredData";

export default function Originals() {
  const { data } = useFilteredData("original");

  return (
    <div>
      <ImagesContainer item={data} isOriginal={true} />
    </div>
  );
}

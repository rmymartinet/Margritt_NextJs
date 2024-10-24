"use client";

import HeroSubContent from "@/app/components/HeroSubContent";
import { IoIosResize } from "react-icons/io";
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
      <HeroSubContent>
        <div className="flex flex-col gap-10 text-center md:grid md:grid-cols-gridHeroSubContent md:text-start lg:gap-20 lg:px-40">
          <div>
            <p>
              Interested in an original artwork? They are not available for
              purchase on the site, but you can contact me via email: {""}
              <a
                className="text-blue-500 underline hover:text-blue-700"
                href="mailto:margrittmartinet@gmail.com"
              >
                margrittmartinet@gmail.com
              </a>
            </p>
          </div>
          <div className="h-full w-[1px] bg-black"></div>
          <div className="content-right flex">
            <p className="text-base">
              Each original piece is unique, signed by the artist, and comes
              with a certificate of authenticity.
            </p>
          </div>
        </div>
        <div className="bottom-content mt-4">
          <div className="format mt-2 flex items-center gap-2">
            <div className="icon grid place-content-center rounded-full border border-black p-2">
              <IoIosResize />
            </div>
            <p>Size 120 x 80 cm</p>
          </div>
        </div>
      </HeroSubContent>
      <ImagesContainer
        item={filteredDatByDimension}
        isOriginal={true}
        path={path}
      />
    </div>
  );
}

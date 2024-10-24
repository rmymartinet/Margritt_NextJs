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
              The prints are high-quality digital reproductions of my original
              artworks. Each print, in <span>limited edition</span>, is
              numbered, <span>signed by the artist</span>
              and accompanied by a <span>certificate of authenticity</span>.
              They are produced by Les ‘Courts Tirages’.
            </p>
          </div>
          <div className="h-full w-[1px] bg-black"></div>
          <div className="content-right flex">
            <p>
              Each print is limited to 10 copies. Check their availability by
              consulting the prints.
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
        isTirage={true}
        path={path}
      />
    </div>
  );
}

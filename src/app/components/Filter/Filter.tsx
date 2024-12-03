import { useGSAP } from "@gsap/react";
import FilterItems from "./FilterItems";
import { useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

interface FilterProps {
  setCategory: (value: string) => void;
  categories: string[];
  categoryState: string;
  setFormat?: (value: string) => void;
  formats?: string[];
  formatsState?: string;

  setSeries?: (value: string) => void;
  series?: string[];
  seriesState?: string;
}

const Filter = ({
  categories,
  setCategory,
  categoryState,
  formats,
  setFormat,
  formatsState,
  setSeries,
  series,
  seriesState,
}: FilterProps) => {
  const handleFilterCategory = (value: string) => {
    setCategory(value);
  };
  const handleFilterFormat = (value: string) => {
    if (setFormat) {
      setFormat(value);
    }
  };

  const handleFilterSeries = (value: string) => {
    if (setSeries) {
      setSeries(value);
    }
  };

  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      skewX: 30,
      y: -400,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="relative mb-40 flex w-full flex-row justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="flex w-screen flex-col gap-10 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-center md:p-6 lg:w-max lg:p-8"
      >
        <p className="md:text-lg">Filters : </p>
        <div className="flex flex-col gap-10 md:flex-row md:gap-20">
          <div className="flex items-center gap-4 md:gap-2">
            <p>Category </p>
            {Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map((item, index) => (
                <div key={index} onClick={() => handleFilterCategory(item)}>
                  <FilterItems
                    key={index}
                    filterName={item}
                    isActive={categoryState === item}
                  />
                </div>
              ))}
          </div>
        </div>
        {formats && formats?.length > 0 && (
          <div className="flex items-center gap-4 md:gap-2">
            <p>Formats </p>
            {formats.map((item, index) => (
              <div key={index} onClick={() => handleFilterFormat(item)}>
                <FilterItems
                  key={index}
                  filterName={item}
                  isActive={formatsState === item}
                />
              </div>
            ))}
          </div>
        )}

        {series && series?.length > 0 && (
          <div className="flex items-center gap-4 md:gap-2">
            <p>Series </p>
            {series.map((item, index) => (
              <div key={index} onClick={() => handleFilterSeries(item)}>
                <FilterItems
                  key={index}
                  filterName={item}
                  isActive={seriesState === item}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;

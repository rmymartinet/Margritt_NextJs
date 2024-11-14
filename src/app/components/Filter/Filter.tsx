import FilterItems from "./FilterItems";

interface FilterProps {
  setFilters: (type: "category" | "format", value: string) => void;
  selectedCategory: string;
  selectedFormat: string;
}

const Filter = ({
  setFilters,
  selectedCategory,
  selectedFormat,
}: FilterProps) => {
  const handleFilter = (type: "category" | "format", value: string) => {
    // Si "originals" est sélectionné pour la catégorie, réinitialise le format
    if (type === "category" && value === "originals") {
      setFilters("format", ""); // Réinitialise le format
    }
    setFilters(type, value);
  };

  return (
    <div className="mb-40 flex w-full flex-row justify-center">
      <div className="flex w-screen flex-col gap-10 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-center md:p-6 lg:w-max lg:p-8">
        <p className="md:text-lg">Filters : </p>
        <div className="flex flex-col gap-10 md:flex-row md:gap-20">
          <div className="flex items-center gap-4 md:gap-2">
            <p>Category </p>

            <div onClick={() => handleFilter("category", "prints")}>
              <FilterItems
                filterName="Prints"
                isActive={selectedCategory === "prints"}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-2">
            <p>Formats </p>
            <div onClick={() => handleFilter("format", "")}>
              <FilterItems filterName="All" isActive={selectedFormat === ""} />
            </div>
            <div onClick={() => handleFilter("format", "large-formats")}>
              <FilterItems
                filterName="Large"
                isActive={selectedFormat === "large-formats"}
              />
            </div>
            <div onClick={() => handleFilter("format", "medium-formats")}>
              <FilterItems
                filterName="Medium"
                isActive={selectedFormat === "medium-formats"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

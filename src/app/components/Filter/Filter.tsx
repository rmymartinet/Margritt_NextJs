import FilterItems from "./FilterItems";

interface FilterProps {
  setCategory: (value: string) => void;
  categories: string[];
  categoryState: string;
  setFormat?: (value: string) => void;
  formats?: string[];
  formatsState?: string;
}

const Filter = ({
  categories,
  setCategory,
  categoryState,
  formats,
  setFormat,
  formatsState,
}: FilterProps) => {
  const handleFilterCategory = (value: string) => {
    setCategory(value);
  };

  const handleFilterFormat = (value: string) => {
    if (setFormat) {
      setFormat(value);
    }
  };

  return (
    <div className="mb-40 flex w-full flex-row justify-center">
      <div className="flex w-screen flex-col gap-10 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-center md:p-6 lg:w-max lg:p-8">
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
      </div>
    </div>
  );
};

export default Filter;

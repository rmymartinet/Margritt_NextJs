const FilterItems = ({
  isOriginalsCategory,
  isActive,
  filterName,
}: {
  isOriginalsCategory?: boolean;
  filterName: string;
  isActive?: boolean;
}) => {
  return (
    <span
      className={`cursor-pointer rounded-full border p-2 shadow-inner ${isActive && !isOriginalsCategory ? "border-blue-400 bg-blue-400 text-white" : ""}`}
    >
      {filterName}
    </span>
  );
};

export default FilterItems;

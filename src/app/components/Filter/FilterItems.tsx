const FilterItems = ({
  isActive,
  filterName,
}: {
  isOriginalsCategory?: boolean;
  filterName: string;
  isActive?: boolean;
}) => {
  return (
    <span
      className={`cursor-pointer rounded-full border p-2 shadow-inner ${isActive ? "border-blue-400 bg-blue-400 text-white" : ""}`}
    >
      {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
    </span>
  );
};

export default FilterItems;

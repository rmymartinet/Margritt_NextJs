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
      className={`cursor-pointer rounded-full border p-2 font-medium shadow-inner ${isActive ? "border-[#7AB2D3] bg-[#7AB2D3] text-white" : ""}`}
    >
      {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
    </span>
  );
};

export default FilterItems;

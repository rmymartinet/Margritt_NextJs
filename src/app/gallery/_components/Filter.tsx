interface FilterProps {
  active: string;
  setActive: (value: string) => void;
}

const Filter = ({ active, setActive }: FilterProps) => {
  const handleClickProgress = () => {
    setActive("project");
  };

  const handleClickGallery = () => {
    setActive("gallery");
  };

  return (
    <div className="mb-[5vh] flex justify-center md:mb-0">
      <div className="mt-12 flex pb-4 text-base font-medium">
        <div
          className={`border-b-[1px] px-10 pb-[5px] md:px-16 ${
            active === "gallery" ? "border-black" : "border-gray-300"
          } cursor-pointer transition-all duration-500 ease-in-out`}
        >
          <span onClick={handleClickGallery}>Gallery</span>
        </div>
        <div
          className={`cursor-pointer border-b-[1px] px-10 pb-[5px] md:px-16 ${
            active === "project" ? "border-black" : "border-gray-300"
          } transition-all duration-500 ease-in-out`}
        >
          <span onClick={handleClickProgress}>In progress</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;

import { QuantitySelectorProps } from "@/types/dataTypes";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

const QuantitySelector = ({
  quantity,
  onAdd,
  onRemove,
  isQuantityGreaterThanStock,
}: QuantitySelectorProps) => {
  const renderIcon = (
    IconComponent: React.ElementType,
    onClick: () => void,
    isDisabled: boolean,
    ariaLabel: string,
  ) => (
    <IconComponent
      className={`transition-transform duration-100 ease-in-out ${
        isDisabled
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer active:scale-110"
      }`}
      size={20}
      onClick={!isDisabled ? onClick : undefined}
      aria-label={ariaLabel}
      style={{ userSelect: "none" }}
    />
  );

  return (
    <div className="flex items-center gap-4">
      {renderIcon(
        IoIosRemoveCircle,
        onRemove,
        quantity <= 1 || isQuantityGreaterThanStock,
        "Decrease quantity",
      )}

      <input
        type="number"
        value={isQuantityGreaterThanStock ? 0 : quantity}
        min="1"
        readOnly
        className="w-14 rounded-full border border-black bg-inherit pl-3 text-center text-lg"
        aria-label="Selected quantity"
      />

      {renderIcon(
        IoIosAddCircle,
        onAdd,
        isQuantityGreaterThanStock,
        "Increase quantity",
      )}
    </div>
  );
};

export default QuantitySelector;

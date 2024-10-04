import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

interface QuantitySelectorProps {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  isQuantityGreaterThanStock: boolean; // Correction ici
}

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
      size={25}
      onClick={!isDisabled ? onClick : undefined}
      aria-label={ariaLabel}
      style={{ userSelect: "none" }}
    />
  );

  return (
    <div className="flex place-items-center gap-4">
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
        className="w-20 rounded-full border-2 border-black bg-inherit pl-3 text-center text-lg"
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

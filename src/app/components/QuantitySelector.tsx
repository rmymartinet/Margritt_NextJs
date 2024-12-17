import { QuantitySelectorProps } from "@/types/dataTypes";
import React from "react";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import Swal from "sweetalert2";

const QuantitySelector = ({
  productStock,
  quantity,
  onAdd,
  onRemove,
  isQuantityGreaterThanStock,
}: QuantitySelectorProps) => {
  // Fonction pour gérer l'ajout avec contrôle du stock
  const handleAddClick = () => {
    if (isQuantityGreaterThanStock) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Stock",
        text: `Stock limited to ${productStock}. You can't add more.`,
      });
      return;
    }
    onAdd();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Bouton pour diminuer la quantité */}
      <IoIosRemoveCircle
        className={`transition-transform duration-100 ease-in-out ${
          quantity <= 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer active:scale-110"
        }`}
        size={20}
        onClick={quantity > 1 ? onRemove : undefined}
        aria-label="Decrease quantity"
        style={{ userSelect: "none" }}
      />

      {/* Affichage de la quantité */}
      <input
        type="number"
        value={quantity}
        min="1"
        readOnly
        className="w-14 rounded-full border border-black bg-inherit pl-3 text-center text-lg"
        aria-label="Selected quantity"
      />

      {/* Bouton pour augmenter la quantité */}
      <IoIosAddCircle
        className={`transition-transform duration-100 ease-in-out ${
          isQuantityGreaterThanStock
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer active:scale-110"
        }`}
        size={20}
        onClick={handleAddClick}
        aria-label="Increase quantity"
        style={{ userSelect: "none" }}
      />
    </div>
  );
};

export default QuantitySelector;

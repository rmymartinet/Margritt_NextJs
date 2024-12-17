// AddToCartButton.tsx
import React from "react";
import Swal from "sweetalert2";
import { ProductItem } from "../../types/dataTypes";
import { useAddToCart } from "../hooks/useAddToCart";

interface AddToCartButtonProps {

  
  product: ProductItem;
  finalPrice: number;
  tempQuantity: number;
  setIsShoppingOpen: (isOpen: boolean) => void;
  setTempQuantity: (quantity: number) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  finalPrice,
  tempQuantity,
  setIsShoppingOpen,
  setTempQuantity,
}) => {
  const addToCart = useAddToCart();

  const handleClick = () => {
    setIsShoppingOpen(true);
    if (product?.stock === 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This product is out of stock",
      });
    } else if (
      product?.id &&
      product?.title &&
      product?.date &&
      product?.format &&
      product?.imageUrls
    ) {
      addToCart({
        ...product,
        finalPrice,
        tempQuantity,
      });
      setTempQuantity(1);
    }
  };

  return (
    <span
      className="contact cursor-pointer rounded-[20px] border-2 border-[#7AB2D3] px-2.5 py-1 font-medium text-[#7AB2D3] transition-colors duration-200 ease-in-out hover:bg-[#7AB2D3] hover:text-white"
      onClick={handleClick}
    >
      Add to Cart
    </span>
  );
};

export default AddToCartButton;

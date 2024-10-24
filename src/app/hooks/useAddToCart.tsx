import { Item } from "../../types/dataTypes";
import { useCart } from "../context/CardContext";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = (product: Item) => {
    const isExistingProduct = cart.findIndex((item) => item.id === product.id);

    if (isExistingProduct >= 0) {
      const existingProduct = cart[isExistingProduct];

      const existingTempQuantity = existingProduct?.tempQuantity ?? 0;
      const productTempQuantity = product?.tempQuantity ?? 0;
      const productStock = product?.stock ?? 0;
      const existingFinalPrice = existingProduct?.finalPrice ?? 0;
      const productFinalPrice = product?.finalPrice ?? 0;

      if (existingTempQuantity + productTempQuantity <= productStock) {
        existingProduct.tempQuantity =
          existingTempQuantity + productTempQuantity;
        existingProduct.finalPrice = existingFinalPrice + productFinalPrice;
      }
    } else {
      const newProduct = {
        ...product,
        tempQuantity: product?.tempQuantity ?? 1,
        finalPrice: product?.finalPrice ?? 0,
      };
      cart.push(newProduct);
    }

    setCart([...cart]);
  };

  return addToCart;
};

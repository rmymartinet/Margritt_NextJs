import { Item } from "../../types/dataTypes";
import { useCart } from "../context/CardContext";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = (product: Item) => {
    const isExistingProduct = cart.findIndex((item) => item.id === product.id);

    if (isExistingProduct >= 0) {
      const existingProduct = cart[isExistingProduct];

      const existingQuantity = existingProduct?.quantity ?? 0;
      const productQuantity = product?.quantity ?? 0;
      const productStock = product?.stock ?? 0;
      const existingFinalPrice = existingProduct?.finalPrice ?? 0;
      const productFinalPrice = product?.finalPrice ?? 0;

      if (existingQuantity + productQuantity <= productStock) {
        existingProduct.quantity = existingQuantity + productQuantity;
        existingProduct.finalPrice = existingFinalPrice + productFinalPrice;
      }
    } else {
      const newProduct = {
        ...product,
        quantity: product?.quantity ?? 1,
        finalPrice: product?.finalPrice ?? 0,
      };
      cart.push(newProduct);
    }

    setCart([...cart]);
  };

  return addToCart;
};

import { useCart } from "../context/CardContext";
import { Item } from "../types/dataTypes";

export const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = (product: Item) => {
    const isExistingProduct = cart.findIndex((item) => item.id === product.id);

    // Vérification si le produit existe déjà dans le panier
    if (isExistingProduct >= 0) {
      const existingProduct = cart[isExistingProduct];

      // Vérification des propriétés et définition de valeurs par défaut si nécessaire
      const existingTempQuantity = existingProduct?.tempQuantity ?? 0;
      const productTempQuantity = product?.tempQuantity ?? 0;
      const productStock = product?.stock ?? 0;
      const existingFinalPrice = existingProduct?.finalPrice ?? 0;
      const productFinalPrice = product?.finalPrice ?? 0;

      // Si la quantité dans le panier est inférieure ou égale au stock du produit
      if (existingTempQuantity + productTempQuantity <= productStock) {
        existingProduct.tempQuantity =
          existingTempQuantity + productTempQuantity;
        existingProduct.finalPrice = existingFinalPrice + productFinalPrice;
      }
    } else {
      // Si le produit n'est pas dans le panier, ajoutez-le
      const newProduct = {
        ...product,
        tempQuantity: product?.tempQuantity ?? 1, // Assurez-vous qu'il y a au moins 1 en quantité par défaut
        finalPrice: product?.finalPrice ?? 0, // Assurez-vous d'avoir un prix par défaut
      };
      cart.push(newProduct);
    }

    setCart([...cart]); // Mise à jour du panier
  };

  return addToCart;
};

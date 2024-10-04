"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { Item } from "../types/dataTypes";

interface CartContextProps {
  cart: Item[];
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;
}

// Créer le contexte du panier
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Fournisseur du contexte
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Item[]>([]);
  const [isShoppingOpen, setIsShoppingOpen] = useState<boolean>(false);

  return (
    <CartContext.Provider
      value={{ cart, setCart, isShoppingOpen, setIsShoppingOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

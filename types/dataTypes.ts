import { FILTERS } from "@/utils/constant";

export interface Gallery {
  id: string;
  category: string;
  title: string;
  dimension: string;
  date: string;
  format: string;
  imageUrls: string[];
}

export interface Item {
  id: string;
  category?: string;
  title: string;
  text?: string;
  serie?: string;
  piece?: string;
  dimension?: string;
  date: string;
  format: string;
  price?: number;
  paper?: string;
  imageUrls: string[];
  videoUrl?: string;
  stock?: number;
  quantity?: number;
  tempQuantity: number;
  finalPrice?: number;
  materials?: string;
  thumbnailUrl?: string;
}

export interface CustomerAddress {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface User {
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressPostalCode: string;
  addressCountry: string;
}

export interface ProductItem extends Item {
  tempQuantity: number;
  finalPrice?: number;
}

export interface ImageContainer extends Item {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
  isTirage?: boolean;
}

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export interface CustomCursorProps {
  isHovering: boolean;
}

export interface ZoomedImageProps {
  src: string;
  onClose: () => void;
}
export interface ImageCarouselProps {
  mainImgRef: React.RefObject<HTMLDivElement>;
  imageUrls: string[];
  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  isHovering: boolean;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;

  isNextButton: boolean; // Ajoutez cette ligne
}

export interface CartContextProps {
  cart: Item[];
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
  isShoppingOpen: boolean;
  setIsShoppingOpen: (isShoppingOpen: boolean) => void;

  tempQuantity: number;

  setTempQuantity: (tempQuantity: number) => void;

  updateCartQuantity: (itemId: string, newQuantity: number) => void;
}

export interface QuantitySelectorProps {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  isQuantityGreaterThanStock: boolean;
}

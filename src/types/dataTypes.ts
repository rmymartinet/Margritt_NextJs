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
  papier?: string;
  imageUrls: string[];
  videoUrl?: string;
  stock?: number;
  quantity?: number;
  tempQuantity?: number;
  finalPrice?: number;
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
  tempQuantity?: number;
  finalPrice?: number;
}

export interface ImageContainer extends Item {
  item: Item[];
  isCursorPointer?: boolean;
  isOriginal?: boolean;
  isTirage?: boolean;
}

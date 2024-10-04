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
  serie?: string;
  piece?: string;
  dimension?: string;
  date: string;
  format: string;
  price?: number;
  papier?: string;
  imageUrls: string[];
  stock?: number;
  tempQuantity?: number;
  finalPrice?: number;
}

export interface ProductItem extends Item {
  tempQuantity?: number;
  finalPrice?: number;
}

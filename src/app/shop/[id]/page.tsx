"use client";

import ProductPage from "@/app/components/Product/ProductPage";
import { useFilteredData } from "@/app/hooks/useFilteredData";

interface OriginalItemProps {
  params: {
    id: string;
  };
}

export default function OriginalItem({ params }: OriginalItemProps) {
  const { id } = params;

  const { data } = useFilteredData(id);

  const category = data.find((item) => item.id === id)?.category ?? "";
  return (
    <div>
      <ProductPage category={category} id={id} />
    </div>
  );
}

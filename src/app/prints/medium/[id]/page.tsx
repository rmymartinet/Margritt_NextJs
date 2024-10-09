"use client";

import ProductPage from "@/app/components/Product/ProductPage";

interface OriginalItemProps {
  params: {
    id: string;
  };
}

export default function OriginalItem({ params }: OriginalItemProps) {
  const { id } = params;
  const path = "medium";

  return (
    <div>
      <ProductPage path={path} id={id} />
    </div>
  );
}

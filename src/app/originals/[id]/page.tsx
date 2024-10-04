"use client";

import ProductPage from "@/app/components/ProductPage";

interface OriginalItemProps {
  params: {
    id: string;
  };
}

export default function OriginalItem({ params }: OriginalItemProps) {
  const { id } = params;

  return (
    <div>
      <ProductPage id={id} />
    </div>
  );
}

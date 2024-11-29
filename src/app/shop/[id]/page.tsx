"use client";

import { useCart } from "@/app/context/CardContext";
import useFilteredDataById from "../../hooks/useFilteredDataById";
import ImageCarousel from "@/app/components/ImagesCarousel";
import ProductDetails from "@/app/components/Product/ProductDetails";
import { useFilteredData } from "@/app/hooks/useFilteredData";
import Image from "next/image";

interface OriginalItemProps {
  params: {
    id: string;
  };
}

export default function OriginalItem({ params }: OriginalItemProps) {
  const { id } = params;
  const { data } = useFilteredData(id);
  const category = data.find((item) => item.id === id)?.category ?? "";
  const product = useFilteredDataById(id);
  const { isShoppingOpen } = useCart();
  if (!product) {
    // return <SkeletonCard />;
    return null;
  }

  return (
    <div className="min-h-screen">
      <section
        className={`flex items-start justify-center ${isShoppingOpen ? "opacity-60" : "opacity-100"}`}
      >
        <div className="flex flex-col items-center gap-5 md:gap-20">
          <div className="relative flex h-[80vh] w-screen items-center justify-center">
            {product && product.imageUrls.length > 2 ? (
              <ImageCarousel imageUrls={product.imageUrls} />
            ) : (
              <Image
                className="h-full w-full object-contain"
                src={product?.imageUrls[0] || ""}
                alt={product?.title || ""}
                width={5000}
                height={5000}
              />
            )}
          </div>
          <ProductDetails category={category} product={product} />
        </div>
      </section>
    </div>
  );
}

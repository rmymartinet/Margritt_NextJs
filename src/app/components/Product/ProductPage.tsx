import { useCart } from "@/app/context/CardContext";
import Image from "next/image";
import useFilteredDataById from "../../hooks/useFilteredDataById";
import ImageCarousel from "../ImagesCarousel";
import ProductDetails from "./ProductDetails";

const ProductPage = ({ category, id }: { category: string; id: string }) => {
  const product = useFilteredDataById(id);
  const { isShoppingOpen } = useCart();
  if (!product) {
    // return <SkeletonCard />;
    return null;
  }

  return (
    <>
      <section
        className={`flex items-start justify-center ${isShoppingOpen ? "opacity-60" : "opacity-100"}`}
      >
        <div className="flex flex-col items-center gap-5 md:gap-20">
          <div className="relative flex w-screen items-center justify-center">
            {product && product.imageUrls.length > 2 ? (
              <div className="w-full">
                <ImageCarousel imageUrls={product.imageUrls} />
              </div>
            ) : (
              <Image
                className="w-full object-contain"
                loading="lazy"
                width={5000}
                height={5000}
                src={product?.imageUrls[0] || ""}
                alt={product?.title || ""}
              />
            )}
          </div>
          <ProductDetails category={category} product={product} />
        </div>
      </section>
    </>
  );
};

export default ProductPage;

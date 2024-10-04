import gsap from "gsap";
import { Flip, ScrollTrigger } from "gsap/all";
import Image from "next/image";
import useFilteredDataById from "../hooks/useFilteredDataById";
import CartSideBar from "./CartSidebar";
import ImageCarousel from "./ImagesCarousel";
import ProductDetails from "./Product/ProductDetails";

gsap.registerPlugin(ScrollTrigger, Flip);

const ProductPage = ({ id }: { id: string }) => {
  const product = useFilteredDataById(id);

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <>
      <section className="flex h-screen items-center justify-center">
        <div className="grid w-full grid-rows-2 gap-20 lg:grid lg:grid-cols-2 lg:grid-rows-none">
          <div className="relative flex h-[500px] items-center justify-center">
            {product && product.imageUrls.length > 2 ? (
              <ImageCarousel imageUrls={product.imageUrls} />
            ) : (
              <Image
                className="flex h-full w-full object-cover"
                loading="lazy"
                width={600}
                height={600}
                layout="responsive"
                src={product?.imageUrls[0] || ""}
                alt={product?.title || ""}
              />
            )}
          </div>
          <ProductDetails product={product} />
        </div>
      </section>
      <CartSideBar />
    </>
  );
};

export default ProductPage;

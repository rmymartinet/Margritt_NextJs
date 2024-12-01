import { useCallback, useState } from "react";

interface CarouselProps {
  carouselIndex: number;
  handleNextSlide: () => void;
  handlePrevSlide: () => void;
}

const useCarousel = (items?: string[]): CarouselProps => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleNextSlide = useCallback(() => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % (items?.length || 0));
  }, [items]);

  const handlePrevSlide = useCallback(() => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? (items?.length || 0) - 1 : prevIndex - 1,
    );
  }, [items]);

  return {
    carouselIndex,
    handleNextSlide,
    handlePrevSlide,
  };
};

export default useCarousel;

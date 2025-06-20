import React, { useState, useCallback } from "react";
import type { Product } from "../types";
import { twMerge } from "tailwind-merge";
import { twJoin } from "tailwind-merge";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const imageUrls = product.images.map((img) => img.url);
  const [activeImage, setActiveImage] = useState(imageUrls[0]);
  const [fading, setFading] = useState(false);

  const changeImage = useCallback((newImage: string) => {
    setFading(true);
    setTimeout(() => {
      setActiveImage(newImage);
      setFading(false);
    }, 300);
  }, []);

  const selectImage = (image: string) => {
    if (image !== activeImage) {
      changeImage(image);
    }
  };

  const handleNext = () => {
    const currentIndex = imageUrls.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    changeImage(imageUrls[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = imageUrls.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    changeImage(imageUrls[prevIndex]);
  };

  return (
    <div className="relative flex w-3/4 flex-row" data-testid="product-gallery">
      {/* Thumbnail Gallery */}
      <ul className="mr-10 flex flex-col gap-4">
        {imageUrls.map((imageUrl, index) => (
          <li
            key={index}
            className={twMerge(
              "w-28 cursor-pointer",
              twJoin(activeImage === imageUrl && "ring-2 ring-green"),
            )}
            onClick={() => selectImage(imageUrl)}
          >
            <img src={imageUrl} alt={product.name} className="w-full" />
          </li>
        ))}
      </ul>

      {/* Main Image */}
      <div className="w-full">
        <div className="relative">
          <img
            src={activeImage}
            alt={product.name}
            className={twMerge(
              "h-[600px] w-full object-contain transition-opacity duration-300",
              fading ? "opacity-0" : "opacity-100",
            )}
          />

          {imageUrls.length > 1 && (
            <div>
              <button
                className={twMerge(
                  "absolute left-0 top-1/2 flex size-8 -translate-y-1/2 transform items-center justify-center bg-arrowBackground text-white transition-colors duration-300",
                  "hover:bg-black",
                )}
                onClick={handlePrev}
              >
                <img src="/arrow.svg" alt="Previous" className="rotate-180" />
              </button>
              <button
                className={twMerge(
                  "absolute right-0 top-1/2 flex size-8 -translate-y-1/2 transform items-center justify-center bg-arrowBackground p-2 text-white transition-colors duration-300",
                  "hover:bg-black",
                )}
                onClick={handleNext}
              >
                <img src="/arrow.svg" alt="Next" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;

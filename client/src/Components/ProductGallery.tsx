import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Product } from "../types";
import { twMerge } from "tailwind-merge";

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const imageUrls = product.images.map((img) => img.url);
  const [activeImage, setActiveImage] = useState(imageUrls[0]);
  const [fading, setFading] = useState(false);
  const [mainImageHeight, setMainImageHeight] = useState(0);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailListRef = useRef<HTMLUListElement>(null);

  const changeImage = useCallback((newImage: string) => {
    setFading(true);
    setTimeout(() => {
      setActiveImage(newImage);
      setFading(false);
    }, 300);
  }, []);

  const scrollToThumbnail = useCallback(
    (imageUrl: string) => {
      if (thumbnailListRef.current) {
        const targetIndex = imageUrls.indexOf(imageUrl);
        const thumbnailElements = thumbnailListRef.current.children;

        if (thumbnailElements[targetIndex]) {
          const targetThumbnail = thumbnailElements[targetIndex] as HTMLElement;
          targetThumbnail.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    },
    [imageUrls],
  );

  const selectImage = (image: string) => {
    if (image !== activeImage) {
      changeImage(image);
    }
  };

  const handleNext = () => {
    const currentIndex = imageUrls.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    const nextImage = imageUrls[nextIndex];
    changeImage(nextImage);
    setTimeout(() => scrollToThumbnail(nextImage), 350);
  };

  const handlePrev = () => {
    const currentIndex = imageUrls.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    const prevImage = imageUrls[prevIndex];
    changeImage(prevImage);
    setTimeout(() => scrollToThumbnail(prevImage), 350);
  };

  useEffect(() => {
    const updateMainImageHeight = () => {
      if (mainImageRef.current) {
        setMainImageHeight(mainImageRef.current.offsetHeight);
      }
    };

    const mainImage = mainImageRef.current;
    if (mainImage) {
      if (mainImage.complete) {
        updateMainImageHeight();
      } else {
        mainImage.onload = updateMainImageHeight;
      }
    }

    window.addEventListener("resize", updateMainImageHeight);
    return () => window.removeEventListener("resize", updateMainImageHeight);
  }, [activeImage]);

  return (
    <div className="relative flex w-3/4 flex-row" data-testid="product-gallery">
      {/* Thumbnail Gallery */}
      <ul
        ref={thumbnailListRef}
        className="scrollbar-hide mr-10 flex flex-shrink-0 flex-col gap-4 overflow-y-auto"
        style={{
          maxHeight: mainImageHeight > 0 ? `${mainImageHeight}px` : "384px",
        }}
      >
        {imageUrls.map((imageUrl, index) => (
          <li
            key={index}
            className={twMerge(
              "w-28 cursor-pointer border-2 border-transparent",
              activeImage === imageUrl && "border-green",
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
            ref={mainImageRef}
            src={activeImage}
            alt={product.name}
            className={twMerge(
              "w-full object-contain opacity-100 transition-opacity duration-300",
              fading && "opacity-0",
            )}
          />

          {imageUrls.length > 1 && (
            <div>
              <button
                className="absolute left-0 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-arrowBackground text-white transition-colors duration-300 hover:bg-black"
                onClick={handlePrev}
              >
                <img src="/arrow.svg" alt="Previous" className="rotate-180" />
              </button>
              <button
                className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 translate-x-1/2 transform items-center justify-center bg-arrowBackground text-white transition-colors duration-300 hover:bg-black"
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

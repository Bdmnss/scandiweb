import React from "react";
import { useCartStore } from "../store/cartStore";
import { toKebabCase } from "../utils/stringUtils";
import type { SelectedAttribute } from "./ProductDetails";
import type { Product } from "../types";
import { twJoin } from "tailwind-merge";
import { Link } from "react-router-dom";

interface ProductsGridProps {
  products: Product[];
  name: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, name }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product) => {
    const selectedAttributes: SelectedAttribute = {};

    if (product.attributes) {
      product.attributes.forEach((attr) => {
        if (attr.items && attr.items.length > 0) {
          selectedAttributes[attr.id] = attr.items[0].id;
        }
      });
    }

    addToCart({
      ...product,
      selectedAttributes,
    });
  };

  return (
    <div>
      <h1 className="mb-28 text-5xl uppercase">{name}</h1>
      <div className="grid grid-cols-3 gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            className="group relative cursor-pointer bg-white p-4 transition-transform duration-300 hover:scale-[1.03] hover:shadow-custom"
            to={`/products/${product.id}`}
            data-testid={`product-${toKebabCase(product.name)}`}
          >
            <div className="relative mb-6 h-96 w-full">
              <img
                src={
                  Array.isArray(product.images) &&
                  product.images.length > 0 &&
                  product.images[0].url
                    ? product.images[0].url
                    : "/placeholder.jpg"
                }
                alt="Main Image"
                className={twJoin(
                  "h-[330px] w-full object-contain",
                  !product.inStock && "opacity-50",
                )}
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-secondary text-lg font-medium">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              {product.inStock && (
                <div className="absolute bottom-6 right-6 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div
                    className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-green"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <img src="/whiteCartIcon.svg" alt="Cart Icon" />
                  </div>
                </div>
              )}
            </div>

            <p className="text-lg font-extralight">{product.name}</p>
            <p
              className={twJoin(
                "text-lg",
                !product.inStock && "text-textSecondary",
              )}
            >
              {product.price.currency.symbol} {product.price.amount}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;

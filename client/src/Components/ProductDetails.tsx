import React, { useState } from "react";
import parse from "html-react-parser";
import { useCartStore } from "../store/cartStore";
import { toKebabCase } from "../utils/stringUtils";
import { twMerge } from "tailwind-merge";
import type { Product } from "../types";

export interface SelectedAttribute {
  [type: string]: string;
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selected, setSelected] = useState<SelectedAttribute>({});
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const setIsOverlayOpen = useCartStore((state) => state.setIsOverlayOpen);

  const allSelected =
    product.attributes.length === 0 ||
    product.attributes.every((attr) => selected[attr.id]);

  const handleSelect = (attrId: string, value: string) => {
    setSelected((prev) => ({ ...prev, [attrId]: value }));
  };

  const handleAddToCart = () => {
    if (!allSelected) return;

    addToCart({
      ...product,
      selectedAttributes: selected,
    });
    setIsCartOpen(true);
    setIsOverlayOpen(true);
  };

  return (
    <div className="flex w-2/5 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{product.brand}</h1>
        <h2 className="text-3xl">{product.name}</h2>
      </div>
      {product.attributes.map((attribute) => (
        <div
          key={attribute.name}
          data-testid={`product-attribute-${toKebabCase(attribute.name)}`}
        >
          <h3 className="font-roboto text-lg font-bold">
            {attribute.name.toUpperCase()}:
          </h3>
          <div className="flex gap-3">
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {attribute.items.map(({ __typename, ...item }) => {
              const isSelected = selected[attribute.id] === item.id;

              return (
                <div key={item.value}>
                  <button
                    type="button"
                    data-testid={`product-attribute-${toKebabCase(attribute.name)}-${item.displayValue}`}
                    className={twMerge(
                      "h-11 w-16 border duration-300",
                      attribute.type === "text" && [
                        "border-black transition-colors hover:bg-black hover:text-white",
                        isSelected && "bg-black text-white",
                      ],
                      attribute.type === "swatch" && [
                        "ring-green hover:border-green hover:ring-2",
                        isSelected && "border-green ring-2 ring-green",
                      ],
                    )}
                    style={
                      attribute.type === "swatch"
                        ? { backgroundColor: item.value }
                        : {}
                    }
                    onClick={() => handleSelect(attribute.id, item.id)}
                  >
                    {attribute.type === "text" && (
                      <div className="flex size-full items-center justify-center">
                        {item.value}
                      </div>
                    )}
                    {attribute.type === "swatch" && (
                      <span className="sr-only">{item.value}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div>
        <h3 className="font-roboto text-lg font-bold">PRICE:</h3>
        <p className="text-2xl font-bold">
          {product.price.currency.symbol} {product.price.amount}
        </p>
      </div>

      <button
        disabled={!product.inStock || !allSelected}
        className="h-14 w-full bg-green font-semibold text-white disabled:opacity-50"
        onClick={handleAddToCart}
        data-testid="add-to-cart"
      >
        ADD TO CART
      </button>

      <div className="font-roboto" data-testid="product-description">
        {parse(product.description)}{" "}
      </div>
    </div>
  );
};

export default ProductDetails;

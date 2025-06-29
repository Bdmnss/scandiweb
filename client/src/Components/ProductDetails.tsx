import React, { useState } from "react";
import parse from "html-react-parser";
import { useCartStore, type AttributeItem } from "../store/cartStore";
import { toKebabCase } from "../utils/stringUtils";
import { twMerge } from "tailwind-merge";

export interface CartItemAttribute extends AttributeItem {
  attributeId: string;
}

interface ProductDetailsProps {
  product: {
    id: string;
    brand: string;
    name: string;
    attributes: Array<{
      id: string;
      name: string;
      type: string;
      items: Array<AttributeItem>;
    }>;
    price: {
      currency: { label: string; symbol: string };
      amount: number;
    };
    inStock: boolean;
    description: string;
    images?: { url: string }[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selected, setSelected] = useState<Record<string, CartItemAttribute>>(
    {},
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const setIsOverlayOpen = useCartStore((state) => state.setIsOverlayOpen);

  const allSelected =
    product.attributes.length === 0 ||
    product.attributes.every((attr) => selected[attr.name]);

  const handleSelect = (attrName: string, value: CartItemAttribute) => {
    setSelected((prev) => ({ ...prev, [attrName]: value }));
  };

  const handleAddToCart = () => {
    if (!allSelected) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      attributes: product.attributes.map((attr) => ({
        id: attr.id ?? attr.name,
        name: attr.name,
        type: attr.type,
        items: attr.items.map((item) => ({
          id: item.id ?? item.value,
          value: item.value,
          attributeId: attr.id,
          displayValue: item.displayValue ?? item.value,
        })),
      })),
      selectedAttributes: Object.values(selected),
      images: product.images || [],
      ...(product.brand && { brand: product.brand }),
      ...(product.description && { description: product.description }),
      ...(typeof product.inStock !== "undefined" && {
        inStock: product.inStock,
      }),
    });
    setIsCartOpen(true);
    setIsOverlayOpen(true);
  };

  return (
    <div className="flex w-1/4 flex-col gap-8">
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
              const isSelected = selected[attribute.name]?.id === item.id;

              return (
                <div key={item.value}>
                  <button
                    type="button"
                    className={twMerge(
                      "h-11 w-16 duration-300",
                      attribute.type === "text" &&
                        (isSelected
                          ? "border border-black bg-black text-white transition-colors"
                          : "border border-black transition-colors hover:bg-black hover:text-white"),
                      attribute.type === "swatch" &&
                        (isSelected
                          ? "border border-green ring-2 ring-green"
                          : "border ring-green hover:border-green hover:ring-2"),
                    )}
                    style={
                      attribute.type === "swatch"
                        ? { backgroundColor: item.value }
                        : {}
                    }
                    onClick={() =>
                      handleSelect(attribute.name, {
                        ...item,
                        attributeId: attribute.id,
                      })
                    }
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

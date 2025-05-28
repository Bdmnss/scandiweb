import React, { useState } from "react";
import parse from "html-react-parser";
import { useCartStore } from "../store/cartStore";

interface ProductDetailsProps {
  product: {
    id: string;
    brand: string;
    name: string;
    attributes: Array<{
      id?: string;
      name: string;
      type: string;
      items: Array<{ id?: string; value: string; displayValue?: string }>;
    }>;
    prices: Array<{
      currency: { symbol: string };
      amount: number;
    }>;
    inStock: boolean;
    description: string;
    images?: { url: string }[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const setIsOverlayOpen = useCartStore((state) => state.setIsOverlayOpen);

  // Use attribute.name as key for selection
  const allSelected =
    product.attributes.length === 0 ||
    product.attributes.every((attr) => selected[attr.name]);

  const handleSelect = (attrName: string, value: string) => {
    setSelected((prev) => ({ ...prev, [attrName]: value }));
  };

  const handleAddToCart = () => {
    if (!allSelected) return;
    addToCart({
      id: product.id,
      name: product.name,
      prices: product.prices.map((price) => ({
        currency: price.currency.symbol,
        amount: price.amount,
      })),
      attributes: product.attributes.map((attr) => ({
        id: attr.id ?? attr.name, // fallback to name if id is undefined
        name: attr.name,
        type: attr.type,
        items: attr.items.map((item) => ({
          id: item.id ?? item.value, // fallback to value if id is undefined
          value: item.value,
          displayValue: item.displayValue ?? item.value, // ensure displayValue is always a string
        })),
      })),
      selectedAttributes: selected,
      images: product.images || [],
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
        <div key={attribute.name}>
          <h3 className="font-roboto text-lg font-bold">
            {attribute.name.toUpperCase()}:
          </h3>
          <div className="flex gap-3">
            {attribute.items.map((item) => {
              const isSelected = selected[attribute.name] === item.value;
              return (
                <div key={item.value}>
                  <button
                    type="button"
                    className={`h-11 w-16 duration-300 ${
                      attribute.type === "text" &&
                      `border transition-colors ${
                        isSelected
                          ? "border-textPrimary bg-textPrimary text-white"
                          : "border-textPrimary hover:bg-textPrimary hover:text-white"
                      }`
                    } ${
                      attribute.type === "swatch" &&
                      `border ${
                        isSelected
                          ? "border-primary ring-2 ring-primary"
                          : "ring-primary hover:border-primary hover:ring-2"
                      }`
                    } `}
                    style={
                      attribute.type === "swatch"
                        ? { backgroundColor: item.value }
                        : {}
                    }
                    onClick={() => handleSelect(attribute.name, item.value)}
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
      {product.prices.map((price) => (
        <div key={price.currency.symbol}>
          <h3 className="font-roboto text-lg font-bold">PRICE:</h3>
          <p className="text-2xl font-bold">
            {price.currency.symbol} {price.amount}
          </p>
        </div>
      ))}

      <button
        disabled={!product.inStock || !allSelected}
        className="h-14 w-full bg-primary font-semibold text-white disabled:opacity-50"
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>

      <div className="font-roboto">{parse(product.description)} </div>
    </div>
  );
};

export default ProductDetails;

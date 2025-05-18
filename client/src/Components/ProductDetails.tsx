import React from "react";

interface ProductDetailsProps {
  product: {
    brand: string;
    name: string;
    attributes: Array<{
      name: string;
      type: string;
      items: Array<{ value: string }>;
    }>;
    prices: Array<{
      currency: { symbol: string };
      amount: number;
    }>;
    inStock: boolean;
    description: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="flex w-1/4 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{product.brand}</h1>
        <h2 className="text-3xl">{product.name}</h2>
      </div>
      {product.attributes.map((attribute) => (
        <div key={attribute.name}>
          <h3 className="text-lg font-bold">{attribute.name}:</h3>
          <div className="flex gap-3">
            {attribute.items.map((item) => (
              <div key={item.value}>
                <button
                  className={`h-11 w-16 duration-300 ${
                    attribute.type === "text" &&
                    "border-textPrimary hover:bg-textPrimary border transition-colors hover:text-white"
                  } ${
                    attribute.type === "swatch" &&
                    "hover:border-primary hover:border hover:p-0.5"
                  }`}
                >
                  {attribute.type === "swatch" && (
                    <div
                      className="size-full"
                      style={{ backgroundColor: item.value }}
                    ></div>
                  )}
                  {attribute.type === "text" && (
                    <div className="flex size-full items-center justify-center">
                      {item.value}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {product.prices.map((price) => (
        <div key={price.currency.symbol}>
          <h3 className="text-lg font-bold">PRICE:</h3>
          <p className="text-2xl font-bold">
            {price.currency.symbol} {price.amount}
          </p>
        </div>
      ))}

      <button
        disabled={!product.inStock}
        className="bg-primary h-14 w-full font-semibold text-white disabled:opacity-50"
      >
        ADD TO CART
      </button>

      <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
    </div>
  );
};

export default ProductDetails;

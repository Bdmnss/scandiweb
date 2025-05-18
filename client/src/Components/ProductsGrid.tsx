import React from "react";

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: { currency: { label: string; symbol: string }; amount: number }[];
}

interface ProductsGridProps {
  data: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ data }) => {
  return (
    <div>
      <h1 className="mb-28 text-5xl">ALL</h1>
      <div className="grid grid-cols-3 gap-10">
        {data.map((product) => (
          <div
            key={product.id}
            className="group relative cursor-pointer bg-white p-4 transition-transform duration-300 hover:scale-[1.03] hover:shadow-custom"
          >
            <div className="relative mb-6 h-96 w-full">
              <img
                src={product.gallery[0]}
                alt="Main Image"
                className={`h-[330px] w-full object-cover ${!product.inStock && "opacity-50"}`}
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
                  <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary">
                    <img src="/whiteCartIcon.svg" alt="Cart Icon" />
                  </div>
                </div>
              )}
            </div>

            <p className="text-lg font-extralight">{product.name}</p>
            {(Array.isArray(product.prices) ? product.prices : []).map(
              (price) => (
                <p
                  key={price.currency.label}
                  className={`text-lg ${!product.inStock && "text-textSecondary"}`}
                >
                  {price.currency.symbol} {price.amount}
                </p>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;

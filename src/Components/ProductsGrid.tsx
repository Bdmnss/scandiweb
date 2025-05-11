import data from "../../data.json";

const ProductsGrid = () => {
  return (
    <div>
      <h1 className="mb-28 text-5xl">ALL</h1>
      <div className="grid grid-cols-3 gap-10">
        {data.data.products.map((product) => (
          <div
            key={product.id}
            className="hover:shadow-custom group relative cursor-pointer bg-white p-4 transition-transform duration-300 hover:scale-[1.03]"
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
                  <div className="bg-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full">
                    <img src="/whiteCartIcon.svg" alt="Cart Icon" />
                  </div>
                </div>
              )}
            </div>

            <p className="text-lg font-extralight">{product.name}</p>
            {product.prices.map((price) => (
              <p
                key={price.currency.label}
                className={`text-lg ${!product.inStock && "text-textSecondary"}`}
              >
                {price.currency.symbol} {price.amount}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;

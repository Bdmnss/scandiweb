import React from "react";
import data from "../../../data.json";

const Cart: React.FC = () => {
  return (
    <div
      className="absolute right-0 top-8 z-50 flex h-[628px] w-96 overflow-scroll bg-white px-4 py-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="font-bold">
          My Bag, <span className="font-medium">3 items</span>
        </p>

        <div className="flex flex-col gap-10">
          {data.data.products.map((product) => (
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-lg font-light">{product.name}</p>
                <p>
                  {product.prices.map((price) => (
                    <span key={price.currency.symbol}>
                      {price.currency.symbol}
                      {price.amount}
                    </span>
                  ))}
                </p>
                <div className="flex flex-col gap-2">
                  {product.attributes.map((attribute) => (
                    <div key={attribute.name}>
                      <h3 className="text-sm">{attribute.name}:</h3>
                      <div className="flex gap-3">
                        {attribute.items.map((item) => (
                          <div key={item.value}>
                            <button
                              className={`px-2 py-1 duration-300 ${
                                attribute.type === "text" &&
                                "border border-textPrimary transition-colors hover:bg-textPrimary hover:text-white"
                              } ${
                                attribute.type === "swatch" &&
                                "px-0 py-0 hover:border hover:border-primary"
                              }`}
                            >
                              {attribute.type === "swatch" && (
                                <div
                                  className="h-6 w-6 border"
                                  style={{
                                    backgroundColor: item.value,
                                  }}
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
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-9 flex h-full flex-col items-center justify-between">
                  <button className="flex size-6 items-center justify-center border border-textPrimary text-2xl transition-colors hover:bg-textPrimary hover:text-white">
                    +
                  </button>
                  <p>1</p>
                  <button className="flex size-6 items-center justify-center border border-textPrimary text-2xl transition-colors hover:bg-textPrimary hover:text-white">
                    -
                  </button>
                </div>

                <img
                  src={product.gallery[0]}
                  alt={product.name}
                  className="h-full w-32"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">Total</p>
          <p className="font-bold">$200.00</p>
        </div>
        <div className="w-full pb-8">
          <button className="w-full bg-primary py-3 text-white">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

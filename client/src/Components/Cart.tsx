import React from "react";
import { useCartStore } from "../store/cartStore";

const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  return (
    <div
      className="absolute right-0 top-8 z-50 flex max-h-[628px] w-96 overflow-scroll bg-white px-4 py-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="font-bold">
          My Bag,{" "}
          <span className="font-medium">
            {items.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </p>

        <div className="flex flex-col gap-10">
          {items.map((product, idx) => (
            <div className="flex w-full justify-between" key={product.id + idx}>
              <div className="flex flex-col gap-3">
                <p className="text-lg font-light">{product.name}</p>
                <p>
                  {product.prices.map((price) => (
                    <span key={price.currency}>
                      {price.currency}
                      {price.amount}
                    </span>
                  ))}
                </p>
                <div className="flex flex-col gap-2">
                  {product.attributes.map((attribute) => (
                    <div key={attribute.name}>
                      <h3 className="text-sm">{attribute.name}:</h3>
                      <div className="flex gap-3">
                        {attribute.items.map((item) => {
                          const selectedItem =
                            product.selectedAttributes?.[attribute.name];
                          const isSelected = selectedItem === item.value;

                          return (
                            <div key={item.value}>
                              <button
                                className={`duration-300 ${
                                  attribute.type === "text" &&
                                  `border border-textPrimary px-2 py-1 ${isSelected ? "bg-textPrimary text-white" : ""}`
                                } ${
                                  attribute.type === "swatch" &&
                                  `${isSelected && "border-primary ring-2 ring-primary"}`
                                }`}
                                disabled
                                tabIndex={-1}
                              >
                                {attribute.type === "swatch" && (
                                  <div
                                    className="h-6 w-6"
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
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-9 flex h-full flex-col items-center justify-between">
                  <button
                    className="flex size-6 items-center justify-center border border-textPrimary text-2xl transition-colors hover:bg-textPrimary hover:text-white"
                    onClick={() => increment(idx)}
                  >
                    +
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    className="flex size-6 items-center justify-center border border-textPrimary text-2xl transition-colors hover:bg-textPrimary hover:text-white"
                    onClick={() => decrement(idx)}
                  >
                    -
                  </button>
                </div>

                <img
                  src={
                    product.images && product.images[0]?.url
                      ? product.images[0].url
                      : "/placeholder.jpg"
                  }
                  alt={product.name}
                  className="h-full w-32"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">Total</p>
          <p className="font-bold">
            $
            {items
              .reduce(
                (sum, item) =>
                  sum + (item.prices[0]?.amount || 0) * item.quantity,
                0,
              )
              .toFixed(2)}
          </p>
        </div>
        <div className="w-full pb-8">
          <button
            className="w-full bg-primary py-3 text-white disabled:opacity-50"
            disabled={items.length === 0}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { useCartStore } from "../store/cartStore";
import { useAddOrder } from "../lib/graphql/hooks";
import { toKebabCase } from "../utils/stringUtils";
import { twMerge } from "tailwind-merge";
import { twJoin } from "tailwind-merge";

const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const { addOrder, loading } = useAddOrder();

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    await addOrder(items);
  };

  return (
    <div
      className="absolute -right-6 top-12 z-50 flex max-h-[628px] w-96 overflow-scroll bg-white px-4 py-8"
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
            <div
              className="flex w-full justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-b-0 last:pb-0"
              key={product.id + idx}
            >
              <div className="flex flex-col gap-3">
                <p className="text-lg font-light">{product.name}</p>
                <p>
                  {product.price.currency.symbol} {product.price.amount}
                </p>
                <div className="flex flex-col gap-2">
                  {product.attributes.map((attribute) => (
                    <div
                      key={attribute.name}
                      data-testid={`cart-item-attribute-${toKebabCase(
                        attribute.name,
                      )}`}
                    >
                      <h3 className="text-sm">{attribute.name}:</h3>
                      <div className="flex gap-3">
                        {attribute.items.map((item) => {
                          const selectedItem = product.selectedAttributes.find(
                            (selectedItem) => selectedItem.id === item.id,
                          );
                          const isSelected = selectedItem?.value === item.value;
                          const attrKebab = toKebabCase(attribute.name);

                          return (
                            <div key={item.value}>
                              <button
                                className={twMerge(
                                  "duration-300",
                                  attribute.type === "text" &&
                                    twJoin(
                                      "border border-black px-2 py-1",
                                      isSelected && "bg-black text-white",
                                    ),
                                  attribute.type === "swatch" &&
                                    twJoin(
                                      isSelected &&
                                        "border-green ring-2 ring-green",
                                    ),
                                )}
                                disabled
                                tabIndex={-1}
                                data-testid={
                                  isSelected
                                    ? `cart-item-attribute-${attrKebab}-${attrKebab}-selected`
                                    : `cart-item-attribute-${attrKebab}-${attrKebab}`
                                }
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
                    className="flex size-6 items-center justify-center border border-black text-2xl transition-colors hover:bg-black hover:text-white"
                    onClick={() => increment(idx)}
                    data-testid="cart-item-amount-increase"
                  >
                    +
                  </button>
                  <p data-testid="cart-item-amount">{product.quantity}</p>
                  <button
                    className="flex size-6 items-center justify-center border border-black text-2xl transition-colors hover:bg-black hover:text-white"
                    onClick={() => decrement(idx)}
                    data-testid="cart-item-amount-decrease"
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

        <div
          className="flex items-center justify-between"
          data-testid="cart-total"
        >
          <p className="font-roboto font-medium">Total</p>
          <p className="font-bold">
            $
            {items
              .reduce(
                (sum, item) => sum + (item.price.amount || 0) * item.quantity,
                0,
              )
              .toFixed(2)}
          </p>
        </div>
        <div className={twMerge("w-full", items.length > 1 && "pb-8")}>
          <button
            className="w-full bg-green py-3 text-white disabled:opacity-50"
            disabled={items.length === 0 || loading}
            onClick={handlePlaceOrder}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

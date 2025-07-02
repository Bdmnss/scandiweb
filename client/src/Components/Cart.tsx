import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useAddOrder } from "../lib/graphql/hooks";
import { toKebabCase } from "../utils/stringUtils";
import { twJoin, twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const { items, totalItems, getCartItemsForOrder } = useCartStore(
    (state) => state,
  );
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const { addOrder, loading, data, error } = useAddOrder();

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    await addOrder(getCartItemsForOrder());
  };

  useEffect(() => {
    if (data && data.createOrder) {
      toast.success(data.createOrder);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const backendMessage =
        error.graphQLErrors?.[0]?.message ||
        // @ts-expect-error: custom backend error property
        error.networkError?.result?.error ||
        error.message;

      toast.error(backendMessage);
    }
  }, [error]);

  return (
    <div
      className="absolute -right-6 top-12 z-50 flex max-h-[628px] w-96 overflow-scroll bg-white px-4 py-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex w-full flex-col gap-8">
        <p className="font-bold">
          My Bag,{" "}
          <span className="font-medium">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </p>

        <div className="flex flex-col gap-10">
          {items.map((product) => (
            <div
              className="flex w-full justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-b-0 last:pb-0"
              key={product.id}
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
                      <p className="mb-2 text-sm capitalize">
                        {attribute.name}:
                      </p>
                      <div className="flex gap-3">
                        {attribute.items.map((item) => {
                          const isSelected =
                            product.selectedAttributes[attribute.id] ===
                            item.id;
                          const attrKebab = toKebabCase(attribute.name);

                          return (
                            <div
                              key={item.value}
                              className={twMerge(
                                attribute.type === "text" && [
                                  "border border-black px-2 py-1",
                                  isSelected && "bg-black text-white",
                                ],
                                attribute.type === "swatch" &&
                                  isSelected &&
                                  "border-green ring-2 ring-green",
                              )}
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
                    onClick={() =>
                      increment(product.id, product.selectedAttributes)
                    }
                    data-testid="cart-item-amount-increase"
                  >
                    +
                  </button>
                  <p data-testid="cart-item-amount">{product.quantity}</p>
                  <button
                    className="flex size-6 items-center justify-center border border-black text-2xl transition-colors hover:bg-black hover:text-white"
                    onClick={() =>
                      decrement(product.id, product.selectedAttributes)
                    }
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
        <div className={twJoin("w-full", items.length > 1 && "pb-8")}>
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

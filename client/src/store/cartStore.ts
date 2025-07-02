import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "../types";
import type { SelectedAttribute } from "../Components/ProductDetails";

interface StoreCartItem extends Product {
  selectedAttributes: SelectedAttribute;
  quantity: number;
}

type CartState = {
  items: StoreCartItem[];
  totalItems: number;
  isCartOpen: boolean;
  isOverlayOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsOverlayOpen: (open: boolean) => void;
  addToCart: (item: Omit<StoreCartItem, "quantity">) => void;
  increment: (productId: string, selectedAttributes: SelectedAttribute) => void;
  decrement: (productId: string, selectedAttributes: SelectedAttribute) => void;
  clearCart: () => void;
  getCartItemsForOrder: () => CartItem[];
  getSelectedCartItem: (
    productId: string,
    selectedAttributes: SelectedAttribute,
  ) => StoreCartItem | undefined;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      isCartOpen: false,
      isOverlayOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      setIsOverlayOpen: (open) => set({ isOverlayOpen: open }),
      getSelectedCartItem: (
        productId: string,
        selectedAttributes: SelectedAttribute,
      ) => {
        const items = get().items;
        return items.find(
          (i) =>
            i.id === productId &&
            JSON.stringify(i.selectedAttributes) ===
              JSON.stringify(selectedAttributes),
        );
      },
      addToCart: (item) => {
        const items = get().items;
        const selectedCartItem = get().getSelectedCartItem(
          item.id,
          item.selectedAttributes,
        );
        if (selectedCartItem) {
          selectedCartItem.quantity += 1;
          set({
            items: [...items.filter((i) => i.id !== item.id), selectedCartItem],
            totalItems: get().totalItems + 1,
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
            totalItems: get().totalItems + 1,
          });
        }
      },
      increment: (productId, selectedAttributes) => {
        const items = get().items;

        const updatedItems = items.map((item) => {
          if (
            item.id === productId &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(selectedAttributes)
          ) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        set({ items: updatedItems, totalItems: get().totalItems + 1 });
      },
      decrement: (productId, selectedAttributes) => {
        const items = get().items;
        const selectedCartItem = get().getSelectedCartItem(
          productId,
          selectedAttributes,
        );

        if (selectedCartItem) {
          if (selectedCartItem.quantity > 1) {
            const updatedItems = items.map((item) => {
              if (
                item.id === productId &&
                JSON.stringify(item.selectedAttributes) ===
                  JSON.stringify(selectedAttributes)
              ) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            });
            set({ items: updatedItems, totalItems: get().totalItems - 1 });
          } else {
            set({
              items: items.filter(
                (i) =>
                  !(
                    i.id === productId &&
                    JSON.stringify(i.selectedAttributes) ===
                      JSON.stringify(selectedAttributes)
                  ),
              ),
              totalItems: get().totalItems - 1,
            });
          }
        }
      },
      clearCart: () => set({ items: [], totalItems: 0 }),
      getCartItemsForOrder: () => {
        const items = get().items;
        return items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          selectedAttributes: Object.entries(item.selectedAttributes).map(
            ([attributeId, value]) => ({
              attributeId,
              value,
            }),
          ),
        }));
      },
    }),
    { name: "cart-storage" },
  ),
);

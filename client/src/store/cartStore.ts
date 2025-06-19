import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemAttribute } from "../Components/ProductDetails";

export interface AttributeItem {
  __typename?: string;
  id: string;
  value: string;
  displayValue: string;
}

type Attribute = {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
};

type CartItem = {
  id: string;
  name: string;
  price: { currency: { label: string; symbol: string }; amount: number };
  attributes: Attribute[];
  selectedAttributes: CartItemAttribute[];
  quantity: number;
  images: { url: string }[];
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  isOverlayOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsOverlayOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increment: (index: number) => void;
  decrement: (index: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isOverlayOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      setIsOverlayOpen: (open) => set({ isOverlayOpen: open }),
      addToCart: (item) => {
        const items = get().items;
        const idx = items.findIndex(
          (i) =>
            i.id === item.id &&
            JSON.stringify(i.selectedAttributes) ===
              JSON.stringify(item.selectedAttributes),
        );
        if (idx > -1) {
          const updated = [...items];
          updated[idx].quantity += 1;
          set({ items: updated });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      increment: (index) => {
        const items = [...get().items];
        items[index].quantity += 1;
        set({ items });
      },
      decrement: (index) => {
        const items = [...get().items];
        if (items[index].quantity > 1) {
          items[index].quantity -= 1;
        } else {
          items.splice(index, 1);
        }
        set({ items });
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" },
  ),
);

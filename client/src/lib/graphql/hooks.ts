import { useQuery, useMutation } from "@apollo/client";
import {
  GetAllCategories,
  GetAllProducts,
  GetProduct,
  CreateOrder,
} from "./queries";
import { useCartStore as useCartStoreBase } from "../../store/cartStore";

export function useCategories() {
  const { data, loading, error } = useQuery(GetAllCategories);
  return { data, loading, error: Boolean(error) };
}

export function useProducts(category?: string) {
  const { data, loading, error } = useQuery(GetAllProducts, {
    variables: category ? { category } : {},
    skip: category === undefined,
  });
  return { data, loading, error: Boolean(error) };
}

export function useProduct(id: string) {
  const { data, loading, error } = useQuery(GetProduct, {
    variables: { id },
    skip: !id,
  });
  return { data, loading, error: Boolean(error) };
}

export const useCartStore = useCartStoreBase;

export function useAddOrder() {
  const [createOrder, { data, loading, error }] = useMutation(CreateOrder);
  const clearCart = useCartStoreBase((state) => state.clearCart);

  type CartItem = {
    id: string;
    name: string;
    selectedAttributes: Record<string, unknown>;
    quantity: number;
    prices: { amount: number; currency: string }[];
  };

  const addOrder = async (items: CartItem[]) => {
    const itemsForMutation = items.map((item) =>
      JSON.stringify({
        productId: item.id,
        productName: item.name,
        attributeValues: JSON.stringify(item.selectedAttributes),
        quantity: item.quantity,
        paidAmount: item.prices[0]?.amount ?? 0,
        paidCurrency: item.prices[0]?.currency ?? "USD",
      }),
    );
    await createOrder({ variables: { items: itemsForMutation } });
    clearCart();
  };

  return { addOrder, data, loading, error };
}

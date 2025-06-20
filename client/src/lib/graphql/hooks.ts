import { useQuery, useMutation } from "@apollo/client";
import {
  GetAllCategories,
  GetAllProducts,
  GetProduct,
  CreateOrder,
} from "./queries";
import { useCartStore as useCartStoreBase } from "../../store/cartStore";
import type {
  CategoriesResponse,
  ProductResponse,
  ProductsResponse,
  CartItem,
  AddOrderResponse,
} from "../../types";

export function useCategories() {
  const { data, loading, error } =
    useQuery<CategoriesResponse>(GetAllCategories);
  return { data, loading, error: Boolean(error) };
}

export function useProducts(category?: string) {
  const { data, loading, error } = useQuery<ProductsResponse>(GetAllProducts, {
    variables: category ? { category } : {},
    skip: category === undefined,
  });
  return { data, loading, error: Boolean(error) };
}

export function useProduct(id: string) {
  const { data, loading, error } = useQuery<ProductResponse>(GetProduct, {
    variables: { id },
    skip: !id,
  });
  return { data, loading, error: Boolean(error) };
}

export const useCartStore = useCartStoreBase;

export function useAddOrder() {
  const [createOrder, { data, loading, error }] =
    useMutation<AddOrderResponse>(CreateOrder);
  const clearCart = useCartStoreBase((state) => state.clearCart);

  const addOrder = async (items: CartItem[]) => {
    const itemsForMutation = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      attributeValues: item.selectedAttributes.map((attribute) => ({
        id: attribute.attributeId,
        value: attribute.value,
      })),
    }));

    await createOrder({ variables: { items: itemsForMutation } });
    clearCart();
  };

  return { addOrder, data, loading, error };
}

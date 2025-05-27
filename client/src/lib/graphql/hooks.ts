import { useQuery } from "@apollo/client";
import { GetAllCategories, GetAllProducts, GetProduct } from "./queries";

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

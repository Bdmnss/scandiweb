import { useQuery } from "@apollo/client";
import { GetAllCategories, GetPricesByProductId } from "./queries";

export function useCategories() {
  const { data, loading, error } = useQuery(GetAllCategories);
  return { data, loading, error: Boolean(error) };
}

export function usePrices(productId: string) {
  const { data, loading, error } = useQuery(GetPricesByProductId, {
    variables: { productId },
    skip: !productId,
  });
  return { data, loading, error: Boolean(error) };
}

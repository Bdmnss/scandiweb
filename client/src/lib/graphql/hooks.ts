import { useQuery } from "@apollo/client";
import {
  GetAllCategories,
  GetPricesByProductId,
  GetImagesByProductId,
  GetAttributesByProductId,
} from "./queries";

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

export function useImages(productId: string) {
  const { data, loading, error } = useQuery(GetImagesByProductId, {
    variables: { productId },
    skip: !productId,
  });
  return { data, loading, error: Boolean(error) };
}

export function useAttributes(productId: string) {
  const { data, loading, error } = useQuery(GetAttributesByProductId, {
    variables: { productId },
    skip: !productId,
  });
  return { data, loading, error: Boolean(error) };
}

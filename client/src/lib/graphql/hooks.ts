import { useQuery } from "@apollo/client";
import { GetAllCategories } from "./queries";

export function useCategories() {
  const { data, loading, error } = useQuery(GetAllCategories);
  return { data, loading, error: Boolean(error) };
}

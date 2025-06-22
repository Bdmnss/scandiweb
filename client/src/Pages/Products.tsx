import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";
import CustomError from "../Components/CustomError";
import { useProducts } from "../lib/graphql/hooks";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Products = () => {
  const { category = "all" } = useParams<{ category: string }>();
  const { data, loading, error } = useProducts(category);
  const { products } = data || { products: [] };

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    const backendMessage =
      error.graphQLErrors?.[0]?.message ||
      // @ts-expect-error: custom backend error property
      error.networkError?.result?.error ||
      error.message;

    return <CustomError message={backendMessage} />;
  }

  return <ProductsGrid products={products} name={category} />;
};

export default Products;

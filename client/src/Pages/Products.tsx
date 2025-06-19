import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";
import CustomError from "../Components/CustomError";
import { useProducts } from "../lib/graphql/hooks";
import { useParams } from "react-router-dom";

const Products = () => {
  const { category = "all" } = useParams<{ category: string }>();
  const { data, loading, error } = useProducts(category);
  const { products } = data || { products: [] };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <CustomError message={(error as unknown as Error).message} />;
  }

  return <ProductsGrid products={products} name={category} />;
};

export default Products;

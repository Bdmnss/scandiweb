import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";
import CustomError from "../Components/CustomError";
import { useProducts } from "../lib/graphql/hooks";

const Clothes = () => {
  const { data, loading, error } = useProducts("clothes");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <CustomError message={(error as unknown as Error).message} />;
  }

  return <ProductsGrid data={data.products} name="CLOTHES" />;
};

export default Clothes;

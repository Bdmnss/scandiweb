import { useQuery } from "@tanstack/react-query";
import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";
import CustomError from "../Components/CustomError";

const fetchAllProducts = async () => {
  const response = await fetch("http://localhost/scandiweb/getAll.php");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <CustomError message={(error as Error).message} />;
  }

  return <ProductsGrid data={data} name="ALL" />;
};

export default Home;

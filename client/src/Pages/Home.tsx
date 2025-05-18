import { useQuery } from "@tanstack/react-query";
import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";

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
    return <div>Error: {(error as Error).message}</div>;
  }

  return <ProductsGrid data={data} name="ALL" />;
};

export default Home;

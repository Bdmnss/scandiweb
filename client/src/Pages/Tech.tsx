import { useQuery } from "@tanstack/react-query";
import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";

const fetchTech = async () => {
  const response = await fetch("http://localhost/scandiweb/getTech.php");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Tech = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tech"],
    queryFn: fetchTech,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <ProductsGrid data={data} name="TECH" />;
};

export default Tech;

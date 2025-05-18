import { useQuery } from "@tanstack/react-query";
import ProductsGrid from "../Components/ProductsGrid";

const fetchClothes = async () => {
  const response = await fetch("http://localhost/scandiweb/getClothes.php");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Clothes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["clothes"],
    queryFn: fetchClothes,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <ProductsGrid data={data} name="CLOTHES" />;
};

export default Clothes;

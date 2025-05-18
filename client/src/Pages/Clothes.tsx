import { useQuery } from "@tanstack/react-query";
import ProductsGrid from "../Components/ProductsGrid";
import Loader from "../Components/Loader";
import CustomError from "../Components/CustomError";

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
    return <Loader />;
  }

  if (isError) {
    return <CustomError message={(error as Error).message} />;
  }

  return <ProductsGrid data={data} name="CLOTHES" />;
};

export default Clothes;

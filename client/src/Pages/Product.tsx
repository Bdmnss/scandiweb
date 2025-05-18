import { useParams } from "react-router-dom";
import ProductGallery from "../Components/ProductGallery";
import ProductDetails from "../Components/ProductDetails";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import { useEffect } from "react";
import CustomError from "../Components/CustomError";

const fetchProduct = async (id: string) => {
  const response = await fetch(
    `http://localhost/scandiweb/getProduct.php?id=${id}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <CustomError message={(error as Error).message} />;
  }

  return (
    <div className="flex gap-28">
      <ProductGallery product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;

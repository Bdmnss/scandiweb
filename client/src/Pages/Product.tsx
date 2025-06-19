import { useParams } from "react-router-dom";
import ProductGallery from "../Components/ProductGallery";
import ProductDetails from "../Components/ProductDetails";
import Loader from "../Components/Loader";
import { useEffect } from "react";
import CustomError from "../Components/CustomError";
import { useProduct } from "../lib/graphql/hooks";

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useProduct(id!);
  const { product } = data || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <CustomError message={(error as unknown as Error).message} />;
  }

  if (!product) {
    return <CustomError message="Product not found" />;
  }

  return (
    <div className="flex gap-28">
      <ProductGallery product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;

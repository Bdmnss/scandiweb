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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <CustomError message={(error as unknown as Error).message} />;
  }

  return (
    <div className="flex gap-28">
      <ProductGallery product={data.product} />
      <ProductDetails product={data.product} />
    </div>
  );
};

export default Product;

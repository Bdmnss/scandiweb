import { useParams } from "react-router-dom";
import data from "../../data.json";
import ProductGallery from "../Components/ProductGallery";
import ProductDetails from "../Components/ProductDetails";
import { useEffect } from "react";

const Product = () => {
  const { id } = useParams();
  const product = data.data.products.find((product) => product.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="flex gap-28">
      <ProductGallery product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;

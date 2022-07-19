import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../services/productServices";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [variant, setVariant] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const data = await getDetail(productId);
      setProduct(data);
      setVariant(data.variants[0]);
    };

    getProduct();
  }, [productId]);

  console.log(product);

  return (
    <div className="md:grid md:grid-cols-3 md:grid-rows-4">
      <div>
        <ul className="w-[100vw] flex overflow-x-auto snap-x snap-mandatory">
          {variant.images &&
            variant.images.map(({ id, url }) => (
              <li
                key={id}
                className="snap-start pt-[125%] min-w-[400px] bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${url})` }}
              ></li>
            ))}
        </ul>
      </div>
      <div className="lg:col-end-4 lg:row-start-1 md:h-[100%]"></div>
      <div className="lg:col-end-3 lg:col-span-2"></div>
    </div>
  );
};

export default ProductDetails;

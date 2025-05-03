import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useParams } from "react-router-dom";
import ProductImage from "../../components/product/ProductImage";
import ProductVariation from "../../components/product/ProductVariation";
import DeliveryInfo from "../../components/product/DeliveryInfo";
import PDS from "../../components/common/utils/ProductDetails/PDS";
import ProductSpecList from "../../components/product/ProductSpecList";

const Product = () => {
  const [singleProduct, setSingleProduct] = useState(null);

  const { fetchProductById } = useProductContext();
  const { title } = useParams();

  const match = title?.match(/-(\d+)$/);
  const id = match ? parseInt(match[1], 10) : null;

  const fetchSingleProduct = async () => {
    const product = await fetchProductById(id);
    setSingleProduct(product);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);
  console.log(singleProduct);

  if (!singleProduct) return <div>Loading...</div>;

  // Get the first variation (assuming there's at least one)
  const variation = singleProduct.variation[0];

  return (
    <div>
      <div className="flex flex-col items-start w-full mx-auto">
        {/* ... (keep the existing header section) ... */}

        <section className="my-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row justify-between h-auto items-start gap-6">
          <ProductImage
            thumbnails={[variation.image]} // You might need to adjust this based on actual image data
            mainImage={variation.image}
          />

          <ProductVariation
            title={singleProduct.title}
            sku={variation.sku_code}
            rating={variation.rating}
            totalRatings={variation.total_ratings}
            currentPrice={variation.offer_price}
            originalPrice={variation.regular_price}
            description={variation.product_details}
            features={variation.features}
          />

          <DeliveryInfo
            product={singleProduct}
            imageId={variation.image.id} 
            price={variation.offer_price}
            originalPrice={variation.regular_price}
            stock={variation.stock}
            sku={variation.sku_code}
          />
        </section>

        <section className="my-10 max-w-7xl w-full mx-auto shadow-sm rounded-2xl bg-white border-2 border-[#F8F9FB]">
          <div className="bg-[#F8F9FB] px-4 sm:px-10 py-5 rounded-tl-2xl rounded-tr-2xl flex flex-wrap gap-2">
            <PDS title="Key Features" />
            <PDS title="Product Details" />
            <PDS title="Product Information" />
          </div>

          <div className="text-[16px] leading-6 w-2xs text-[#182B55] font-medium space-y-1 p-10">
            <ProductSpecList />
          </div>
        </section>

        {/* <section className="my-10 bg-[#F8F9FB] w-full py-16 px-4 md:px-12 flex justify-center items-center gap-6 flex-wrap">
          {ProDetails.map((item, index) => (
            <CardComponent
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </section> */}

        {/* <MostViewedSection title={"Products related to this items"} /> */}
      </div>
    </div>
  );
};

export default Product;

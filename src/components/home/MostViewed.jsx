import ProductCard from "../common/utils/cards/ProductCard";
import { useProductContext } from "../../context/ProductContext";
import defaultImage from "../../assets/default.webp";

const MostViewedSection = ({ title }) => {
  const { products } = useProductContext();

  return (
    <section className="max-w-7xl w-full mx-auto px-4 py-10">
      <h1 className="text-[#182B55] font-semibold text-2xl md:text-5xl text-center mb-10">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(-8).map((product) => {
          // Get the first variation (or handle cases where variation might not exist)
          const variation = product.variation?.[0] || {};
          const imageId = variation?.image?.id || defaultImage;
          
          return (
            <ProductCard
              key={`${product.id}-${variation.id || '0'}`}
              productId={product.id}
              variationId={variation.id}
              variation_name={variation.variation_name}
              stock={variation.stock}
              sku={variation.sku_code}
              image={imageId}
              category={
                product.product_category?.sub_category?.parent_category?.category_name || 
                product.category_name ||
                ""
              }
              title={`${product.title}${variation.variation_name ? ` - ${variation.variation_name}` : ''}`}
              price={variation.offer_price > 0 ? variation.offer_price : variation.regular_price}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MostViewedSection;
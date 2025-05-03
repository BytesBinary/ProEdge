
import ProductCard from "../common/utils/cards/ProductCard";
import { useProductContext } from "../../context/ProductContext";


const MostViewedSection = ({ title }) => {
  const {products}=useProductContext()
  console.log(products, "Most Viewed Products");  


  return (
    <section className="max-w-7xl w-full mx-auto px-4 py-10">
      <h1 className="text-[#182B55] font-semibold text-2xl md:text-5xl text-center mb-10">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item, idx) => {
        const variation = item.variation[0];

        return (
          <ProductCard
            key={idx}
            id={item.id}
            image={variation.image.id}
            category={item.product_category?.sub_category?.parent_category?.category_name}
            title={item.title}
            price={variation.offer_price || variation.regular_price}
          />
        );
      })}
      </div>
    </section>
  );
};

export default MostViewedSection;

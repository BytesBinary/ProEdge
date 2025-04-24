// MostViewedSection.jsx
import React from "react";
import ProductCard from "../common/utils/ProductCard";
import product1 from "../../assets/images/products/product.png"
import product2 from "../../assets/images/products/motor.png"

const products = [
  {
    image: product1,
    category: "Electric Motors & Motor Controls",
    title:
      "MAGNETIC STARTER FOR 7.5HP SINGLE PHASE 230V ELECTRIC MOTORS (40 AMP) – WEG",
    price: 234.0,
  },
  {
    image: product2,
    category: "Power Tools",
    title: "HEAVY DUTY DRILL 1000W - INDUSTRIAL PERFORMANCE",
    price: 199.99,
  },
];

const MostViewedSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-[#182B55] font-semibold text-5xl text-center mb-10">
        Most Viewed
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, idx) => (
          <ProductCard
            key={idx}
            image={item.image}
            category={item.category}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default MostViewedSection;

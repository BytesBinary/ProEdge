import React from "react";
import ProductCard from "../common/utils/cards/ProductCard";

const Card = ({ title, price, image, category }) => {
  return (
    <section>
      <div>
        <ProductCard
          image={image}
          category={category}
          title={title}
          price={price}
        />
      </div>
    </section>
  );
};

export default Card;

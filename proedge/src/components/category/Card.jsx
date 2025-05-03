import React from "react";
import ProductCard from "../common/utils/cards/ProductCard";

const Card = ({ id,title, price, image, category,variation }) => {
  return (
    <section>
      <div>
        <ProductCard
        id={id}
          image={image}
          category={category}
          title={title}
          price={price}
         variation={variation}
        />
      </div>
    </section>
  );
};

export default Card;

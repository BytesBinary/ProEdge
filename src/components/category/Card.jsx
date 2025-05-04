import React from "react";
import ProductCard from "../common/utils/cards/ProductCard";

const Card = ({ productId,title,variationId,variation_name,stock,sku, price, image, category,variation }) => {
  return (
    <section>
      <div>
        <ProductCard
          productId={productId}
          variationId={variationId}
          variation_name={variation_name} 
          image={image}
          category={category}
          title={title}
          stock={stock}
          price={price}
          sku={sku}
          variation={variation}
        />
      </div>
    </section>
  );
};

export default Card;

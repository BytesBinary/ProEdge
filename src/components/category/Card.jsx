import React from "react";
import ProductCard from "../common/utils/cards/ProductCard";

const Card = ({ productId,title,variationId,variation_name,stock,sku, price, image,made_in, category,variation,length }) => {
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
          made_in={made_in} 
          price={price}
          sku={sku}
          variation={variation}
          length={length} 
        />
      </div>
    </section>
  );
};

export default Card;

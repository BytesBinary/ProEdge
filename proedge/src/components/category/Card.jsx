
import React from "react";
import product1 from "../../assets/images/products/product.png"
import ProductCard from "../common/utils/cards/ProductCard";
const products = [
    {
        image: product1,
        category: "Electric Motors & Motor Controls",
        title:
            "MAGNETIC STARTER FOR 7.5HP SINGLE PHASE 230V ELECTRIC MOTORS (40 AMP) – WEG",
        price: 234.0,
    }
];

const Card = ({ title }) => {
    return (
        <section>
            <h1 className="text-[#182B55] font-semibold text-2xl md:text-5xl text-center mb-10">
                {title}
            </h1>
            <div>
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

export default Card;

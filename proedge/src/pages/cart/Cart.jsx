import React from "react";
import SubPageHeader from '../../components/common/utils/banner/SubPageHeader'
import bgImage from "../../assets/images/cart.png";
import products from "../../data/cart/cartProduct";
import ProductCardTiles from '../../components/common/utils/cards/ProductCardTiles'
import OrderSummaryCard from "../../components/common/utils/cards/OrderSummary";
import MostViewedSection from "../../components/home/MostViewed";
import OrderSummary from "../../data/cart/OrderSummary"

const Cart = () => {
  return (
    <>
      <SubPageHeader
        title="Cart"
        currentPage="cart"
        bgImage={bgImage}
        breadcrumbs={[{ label: "Home", link: "/" }, { label: "Cart" }]}
      />

      <section className="max-w-7xl w-full mx-auto my-16 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#182B55] mb-4">
            Shopping Cart (3 Items)
          </h1>
          {products.map((product) => (
            <ProductCardTiles key={product.id} product={product} />
          ))}
        </div>

        <OrderSummaryCard cart={OrderSummary} />

        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#182B55] my-5">
            Shopping Later (3 Items)
          </h1>
          {products.map((product) => (
            <ProductCardTiles key={product.id} product={product} />
          ))}
        </div>
      </section>
      <MostViewedSection title={"Products related to this items"} />
    </>
  );
};

export default Cart;

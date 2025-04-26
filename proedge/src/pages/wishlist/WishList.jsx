import React from "react";
import SubPageHeader from "../../components/common/utils/SubPageHeader.jsx";
import bgImage from "../../assets/images/cart.png";
import WishCard from "../../components/wishlist/WishCard.jsx";
import DemoCardList from "../../data/wishlist/WishData.js";
import MostViewedSection from "../../components/home/MostViewed.jsx";

const WishList = () => {
  return (
    <>
      <SubPageHeader
        title="My Wish List"
        currentPage="wish-list"
        bgImage={bgImage}
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Wish List" },
        ]}
      />

      <section className="my-10 container mx-auto px-2 md:px-12 lg:px-20">
        <h1 className="text-3xl text-[#182B55] font-bold">
          Wish List ({DemoCardList.length} Items)
        </h1>

        <div className="flex flex-col gap-6 mt-6">
          {DemoCardList.map((item) => {
            const [dollars, cents] = item.price.toFixed(2).split(".");

            return (
              <WishCard
                key={item.id}
                image={item.image}
                title={item.name}
                priceDollars={dollars}
                priceCents={`.${cents}`}
                inStock={item.inStock}
                sku={`SKU-${item.id}`}
                shippingInfo="Free Shipping"
                onAddToCart={() => alert(`Added ${item.name} to cart`)}
                onRemove={() => alert(`Removed ${item.name} from wishlist`)}
              />
            );
          })}
        </div>
      </section>

      <MostViewedSection title={"Products related to this items"} />
    </>
  );
};

export default WishList;

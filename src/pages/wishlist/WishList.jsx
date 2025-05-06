import React, { useContext } from "react";
import SubPageHeader from "../../components/common/utils/banner/SubPageHeader.jsx";
import bgImage from "../../assets/images/cart.png";
import WishCard from "../../components/wishlist/WishCard.jsx";
import MostViewedSection from "../../components/home/MostViewed.jsx";
import { CartContext } from "../../context/CartContext.jsx";

const WishList = () => {
  const { wishlistItems, removeFromWishlist, addToCart } =
    useContext(CartContext);

  return (
    <>
      <SubPageHeader
        title="My Wish List"
        currentPage="wish-list"
        bgImage={bgImage}
        breadcrumbs={[{ label: "Home", link: "/" }, { label: "Wish List" }]}
      />
      <section className="my-10 max-w-7xl w-full mx-auto px-2 md:px-12 lg:px-20">
        <h1 className="text-3xl text-[#182B55] font-bold">
          Wish List ({wishlistItems.length} Items)
        </h1>

        <div className="flex flex-col gap-6 mt-6">
          {wishlistItems.map((item, index) => {
            const [dollars, cents] = item.price.toFixed(2).split(".");

            return (
              <WishCard
                key={index}
                image={item.image}
                title={item.title}
                priceDollars={dollars}
                priceCents={`.${cents}`}
                onAddToCart={() => {
                  addToCart(item);
                  removeFromWishlist(item);
                }}
                inStock={item.stock}
                sku={`SKU-${item.sku}`}
                shippingInfo="Free Shipping"
                onRemove={() => removeFromWishlist(item)}
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

import React, { useContext } from "react";
import SubPageHeader from '../../components/common/utils/banner/SubPageHeader';
import bgImage from "../../assets/images/cart.png";
import ProductCardTiles from '../../components/common/utils/cards/ProductCardTiles';
import OrderSummaryCard from "../../components/common/utils/cards/OrderSummary";
import MostViewedSection from "../../components/home/MostViewed";
import { CartContext } from "../../context/CartContext";
import WishCard from "../../components/wishlist/WishCard";

const Cart = () => {
  const { 
    cartItems, 
    wishlistItems, 
    removeFromCart, 
    removeFromWishlist,
    getCartTotal,
    addToCart,
  } = useContext(CartContext);

  // Calculate order summary data dynamically
  const orderSummary = {
    subtotal: getCartTotal(),
    shipping: 0, // You can add shipping calculation logic here
    tax: 0,     // You can add tax calculation logic here
    total: getCartTotal(), // You might want to add shipping and tax to this
    discount: 0  // You can add discount logic here
  };

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
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'})
          </h1>
          {cartItems.length > 0 ? (
            cartItems.map((product, index) => (
              <ProductCardTiles 
                key={index} 
                product={product} 
                onRemove={() => removeFromCart(product)}
              />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        <OrderSummaryCard cart={orderSummary} />

        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#182B55] my-5">
            Shopping Later ({wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'})
          </h1>
          {wishlistItems.length > 0 ? (
            wishlistItems.map((product, index) => {
              const [dollars, cents] = product.price.toFixed(2).split(".");

              return (
                <WishCard
                  key={index}
                  image={product.image}
                  title={product.variation_name}
                  priceDollars={dollars}
                  priceCents={`.${cents}`}
                  onAddToCart={() => {
                    addToCart(product);
                    removeFromWishlist(product);
                  }}
                  inStock={product.stock}
                  sku={`SKU-${product.sku}`}
                  shippingInfo="Free Shipping"
                  onRemove={() => removeFromWishlist(product)}
                />
              );
            })
          ) : (
            <p className="text-gray-500">Your wishlist is empty</p>
          )}
        </div>
      </section>
      <MostViewedSection title={"Products related to this items"} />
    </>
  );
};

export default Cart;
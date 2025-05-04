import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
<<<<<<< HEAD
import Price from "./deliveryInfo/Price";
import ShippingInfo from "./deliveryInfo/ShippingInfo";
import DeliveryInfocard from "./deliveryInfo/DeliveryInfocard";
import StockQuantity from "./deliveryInfo/StockQuantity";
import InfoItem from "./deliveryInfo/InfoItem";

const DeliveryInfo = ({
  product,
  imageId,
  price,
  originalPrice,
  stock,
  sku,
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
=======
import { useNavigate } from "react-router-dom";

const DeliveryInfo = ({
  product,
  productId,
  variationId,
  imageId,
  variation_name,
  offer_price,
  originalPrice,
  stock,
  sku,
}) => {
  const {
    cartItems,
    addToCart,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    quantity,
    setQuantity,
  } = useContext(CartContext);

>>>>>>> origin/feature/productpage
  const [isInCart, setIsInCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const navigate=useNavigate();

  // Check if product is in cart and get its quantity
  useEffect(() => {
<<<<<<< HEAD
    const cartItem = cartItems.find((item) => item.id === product.id);
    setIsInCart(!!cartItem);
    setCartQuantity(cartItem?.quantity || 0);
  }, [cartItems, product.id]);

  // Ensure we have proper numeric values
  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, ""))
      : Number(price);

  const numericOriginalPrice = originalPrice
    ? typeof originalPrice === "string"
      ? parseFloat(originalPrice.replace(/[^0-9.]/g, ""))
      : Number(originalPrice)
    : null;
=======
    const item = cartItems.find((item) => item.variationId === variationId);
    setIsInCart(!!item);
    setCartItem(item);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItems, variationId]);
>>>>>>> origin/feature/productpage

  const handleAddToCart = () => {
    const itemToAdd = {
      productId,
      variationId,
      title: product.title,
      variation_name,
      offer_price: parseFloat(offer_price),
      price: originalPrice ? parseFloat(originalPrice) : null,
      quantity,
      sku,
      image: imageId,
<<<<<<< HEAD
      stock: stock,
=======
      stock,
>>>>>>> origin/feature/productpage
    };
    addToCart(itemToAdd);
  };

  

  const handleQuantityChange = (newQuantity) => {
<<<<<<< HEAD
    setQuantity(newQuantity);

    if (isInCart) {
      const updatedItem = {
        id: product.id,
        title: product.title,
        price: numericPrice,
        regular_price: numericOriginalPrice,
        quantity: newQuantity,
        sku: sku,
        image: imageId,
        stock: stock,
=======
    const numQuantity = parseInt(newQuantity);
    if (isNaN(numQuantity)) return;

    setQuantity(numQuantity);

    if (isInCart) {
      const updatedItem = {
        ...cartItem,
        quantity: numQuantity,
>>>>>>> origin/feature/productpage
      };
      addToCart(updatedItem);
    }
  };

<<<<<<< HEAD
  // Button Component
  const Button = ({
    text,
    bgColor,
    hoverColor,
    textColor,
    onClick,
    disabled,
  }) => {
    return (
      <button
        className={`${bgColor} ${hoverColor} ${textColor} py-2 rounded-full w-full transition-colors`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  };

  // Prepare data for components
  const buttons = [
    {
      text: isInCart ? "Remove from Cart" : "Add to Cart",
      bgColor: isInCart ? "bg-red-500" : "bg-[#FCD700]",
      hoverColor: isInCart ? "hover:bg-red-600" : "hover:bg-[#FCD700]/70",
      textColor: isInCart ? "text-white" : "text-[#182B55]",
      onClick: isInCart ? handleRemoveFromCart : handleAddToCart,
      disabled: stock <= 0,
    },
    {
      text: "Buy Now",
      bgColor: "bg-[#3F66BC]",
      hoverColor: "hover:bg-[#3F66BC]/80",
      textColor: "text-white",
      disabled: stock <= 0,
    },
  ];
=======
  const toggleWishlist = () => {
    const item = {
      productId,
      variationId,
      title: product.title,
      variation_name,
      offer_price: parseFloat(offer_price),
      price: originalPrice ? parseFloat(originalPrice) : null,
      image: imageId,
      sku,
    };

    if (isInWishlist(variationId)) {
      removeFromWishlist(item);
    } else {
      addToWishlist(item);
    }
  };

  const StockQuantity = () => {
    const stockData = {
      status: stock > 0 ? "In Stock" : "Out of Stock",
      quantities: [...Array(Math.min(stock, 5))].map((_, i) => i + 1),
      selectedQuantity: isInCart ? cartItem?.quantity || quantity : quantity,
      onQuantityChange: handleQuantityChange,
      disabled: stock <= 0,
    };

    return (
      <div>
        <p
          className={`${
            stockData.status === "In Stock" ? "text-[#3F66BC]" : "text-red-500"
          } font-medium`}
        >
          {stockData.status}
        </p>
        {stockData.status === "In Stock" && stockData.quantities.length > 0 && (
          <select
            className="mt-2 border rounded p-1 w-full"
            value={stockData.selectedQuantity}
            onChange={(e) =>
              stockData.onQuantityChange(parseInt(e.target.value))
            }
            disabled={stockData.disabled}
          >
            {stockData.quantities.map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  const PriceDisplay = () => {
    const totalPrice = (offer_price * quantity).toFixed(2);
    const totalOriginalPrice = originalPrice
      ? (originalPrice * quantity).toFixed(2)
      : null;

    return (
      <div className="flex items-center justify-start text-base leading-4 text-[#182B55]">
        <span>$</span>&nbsp;
        <h1 className="text-3xl font-medium">{totalPrice.split(".")[0]}</h1>
        <span>.{totalPrice.split(".")[1]}</span>
        {totalOriginalPrice && (
          <span className="ml-2 text-sm line-through text-gray-500">
            ${totalOriginalPrice}
          </span>
        )}
      </div>
    );
  };

  const StockStatus = () => (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          stock > 0 ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      <span className="text-sm text-[#5D6576]">
        {stock > 0 ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  );

  const ActionButtons = () => (
    <div className="flex flex-col gap-2 mt-4">
      {isInCart ? (
        <>
          <button
            onClick={()=>{
              navigate("/cart");  
            }}
            className="w-full bg-[#182B55] text-white py-2 rounded  transition-colors"
          >
            View Cart
          </button>
          <button
            onClick={() => {navigate("/cart/checkout");}}  
            className="w-full bg-[#3F66BC] text-white py-2 rounded hover:bg-[#3F66BC]/80 transition-colors"
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`w-full py-2 rounded transition-colors ${
            stock > 0
              ? "bg-[#FCD700] hover:bg-[#FCD700]/70 text-[#182B55]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      )}
    </div>
  );
>>>>>>> origin/feature/productpage

  const WishlistButton = () => (
    <button
      onClick={toggleWishlist}
      className="flex items-center justify-center gap-2 text-sm text-[#3F66BC] mt-2"
    >
      {isInWishlist(variationId) ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          Remove from Wishlist
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          Add to Wishlist
        </>
      )}
    </button>
  );

  const priceData = {
    dollar: "$",
    whole: Math.floor(numericPrice * quantity),
    cents: (numericPrice * quantity).toFixed(2).split(".")[1],
    originalPrice: numericOriginalPrice
      ? (numericOriginalPrice * quantity).toFixed(2)
      : null,
  };

  const shippingInfo = {
    title: "Get Fast,",
    description: "Free Shipping on Orders Over $500.",
  };

  const deliveryInfo = {
    title: "Delivery",
    date: "Thursday, April 3",
    location: "Deliver to New York 10001",
  };

  const stockData = {
    status: stock > 0 ? "In Stock" : "Out of Stock",
    quantities: [...Array(Math.min(stock, 5))].map((_, i) => i + 1),
    selectedQuantity: isInCart ? cartQuantity : quantity,
    onQuantityChange: handleQuantityChange,
    disabled: stock <= 0,
  };

  return (
<<<<<<< HEAD
    <div className="max-w-xs w-full rounded-xl border-2 border-[#ECF0F9] bg-[#F8F9FB] p-4 space-y-4">
    {/* Price Section */}
    <Price priceData={priceData} />
  
    {/* Shipping Information */}
    <ShippingInfo shippingInfo={shippingInfo} />
  
    {/* Delivery Information */}
    <DeliveryInfocard deliveryInfo={deliveryInfo} />
  
    {/* Stock and Quantity Selector */}
    <StockQuantity stockData={stockData} />
  
    {/* Cart Quantity Indicator */}
    {isInCart && (
      <div className="text-center text-sm text-green-600">
        {cartQuantity} in cart
=======
    <div className="w-full max-w-xs border-2 border-[#ECF0F9] rounded-xl bg-[#F8F9FB] p-4">
      <div className="flex flex-col gap-4">
        {/* Price Display */}
        <PriceDisplay />

        {/* Stock Status */}
        <StockStatus />

        {/* Quantity Selector */}
        {stock > 0 && <StockQuantity />}

        {/* Action Buttons */}
        <ActionButtons />

        {/* Wishlist Button */}
        <WishlistButton />

        {/* Additional Info */}
        <div className="text-xs text-[#5D6576] space-y-1 mt-4">
          <p>
            <span className="font-medium">SKU:</span> {sku}
          </p>
          <p>
            <span className="font-medium">Ships from:</span> Controls Pro
          </p>
          <p>
            <span className="font-medium">Returns:</span> 30-day
            refund/replacement
          </p>
          <p>
            <span className="font-medium">Payment:</span> Secure transaction
          </p>
        </div>
>>>>>>> origin/feature/productpage
      </div>
    )}
  
    {/* Action Buttons */}
    <div className="space-y-2">
      {buttons.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </div>
  
    {/* Additional Info Items */}
    <div className="text-xs text-[#5D6576] space-y-1">
      {infoItems.map((item, index) => (
        <InfoItem key={index} label={item.label} value={item.value} />
      ))}
    </div>
  </div>
  
  );
};

export default DeliveryInfo;

import React, { useContext, useState, useEffect, use } from "react";
import { CartContext } from "../../context/CartContext";
import Price from "./deliveryInfo/Price";
import ShippingInfo from "./deliveryInfo/ShippingInfo";
import DeliveryInfocard from "./deliveryInfo/DeliveryInfocard";
import StockQuantity from "./deliveryInfo/StockQuantity";
import InfoItem from "./deliveryInfo/InfoItem";
import { useLocation, useNavigate } from "react-router-dom";

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

  const [isInCart, setIsInCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const navigate=useNavigate();

  const location = useLocation();

  useEffect(() => {
    const item = cartItems.find((item) => item.variationId === variationId);
    setIsInCart(!!item);
    setCartItem(item);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItems, variationId]);

  const numericPrice =
  typeof offer_price === "string"
    ? parseFloat(offer_price.replace(/[^0-9.]/g, ""))
    : Number(offer_price);

  const numericOriginalPrice = originalPrice
  ? typeof originalPrice === "string"
    ? parseFloat(originalPrice.replace(/[^0-9.]/g, ""))
    : Number(originalPrice)
  : null;

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
      stock,
    };
    addToCart(itemToAdd);
  };

  const infoItems = [
    { label: "Ships from", value: "Controls Pro" },
    { label: "SKU", value: sku },
    { label: "Returns", value: "30-day refund/replacement" },
    { label: "Payment", value: "Secure transaction" },
  ];

  const handleQuantityChange = (newQuantity) => {
    const numQuantity = parseInt(newQuantity);
    if (isNaN(numQuantity)) return;

    setQuantity(numQuantity);

    if (isInCart) {
      const updatedItem = {
        ...cartItem,
        quantity: numQuantity,
      };
      addToCart(updatedItem);
    }
  };


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
      text: isInCart ? "View Cart" : stock > 0 ? "Add to Cart" : "Out of Stock",
      bgColor: isInCart ? "bg-[#FCD700]" : stock > 0 ? "bg-[#FCD700]" : "bg-red-500",
      hoverColor: isInCart ? "hover:bg-[#FCD700]/60" : stock > 0 ? "hover:bg-[#FCD700]" : "hover:bg-red-500",
      textColor: isInCart ? "text-[#182B255]" : stock > 0 ? "text-[#182B55]" : "text-white",
      onClick: isInCart ? () => navigate("/cart") : handleAddToCart,
      disabled: stock <= 0,
    },
    {
      text: "Proceed To Checkout",
      bgColor: "bg-[#3F66BC]",
      hoverColor: "hover:bg-[#3F66BC]/80",
      textColor: "text-white",
      onClick: cartItems.length > 0 ? () => navigate("/cart/checkout") : null,
    },
  ];

  const StockQuantity = ({ stockData }) => {
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

  const priceData = {
    dollar: "$",
    whole: Math.floor(numericPrice),
    cents: (numericPrice).toFixed(2).split(".")[1],
    originalPrice: numericOriginalPrice
      ? (numericOriginalPrice).toFixed(2)
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
    quantities: [...Array(Math.min(stock, 15))].map((_, i) => i + 1),
    selectedQuantity: quantity,
    onQuantityChange: handleQuantityChange,
    disabled: stock <= 0,
  };

  return (
    <div className="max-w-xs w-full rounded-xl border-2 border-[#ECF0F9] bg-[#F8F9FB] p-4 space-y-4">
    {/* Price Section */}
    <Price priceData={priceData} />
  
    {/* Shipping Information */}
    <ShippingInfo shippingInfo={shippingInfo} />
  
    {/* Delivery Information */}
    <DeliveryInfocard deliveryInfo={deliveryInfo} />
  
    {/* Stock and Quantity Selector */}
    {stock > 0 && <StockQuantity  stockData={stockData} /> }
  
    {/* Cart Quantity Indicator */}
    {isInCart && (
      <div className="text-center text-sm text-green-600">
        {quantity} in cart
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

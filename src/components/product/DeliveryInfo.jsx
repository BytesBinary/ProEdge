import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
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
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Check if product is in cart and get its quantity
  useEffect(() => {
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

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: numericPrice,
      regular_price: numericOriginalPrice,
      quantity: quantity,
      sku: sku,
      image: imageId,
      stock: stock,
    };
    addToCart(itemToAdd);
  };

  const handleRemoveFromCart = () => {
    removeFromCart({ id: product.id });
  };

  // Update quantity if product is already in cart
  const handleQuantityChange = (newQuantity) => {
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

  const infoItems = [
    { label: "Ships from", value: "Controls Pro" },
    { label: "SKU", value: sku },
    { label: "Returns", value: "30-day refund/replacement" },
    { label: "Payment", value: "Secure transaction" },
  ];

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

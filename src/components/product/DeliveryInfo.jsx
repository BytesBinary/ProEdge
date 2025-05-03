import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';

const DeliveryInfo = ({ product, imageId, price, originalPrice, stock, sku }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Check if product is in cart and get its quantity
  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === product.id);
    setIsInCart(!!cartItem);
    setCartQuantity(cartItem?.quantity || 0);
  }, [cartItems, product.id]);

  // Ensure we have proper numeric values
  const numericPrice = typeof price === 'string' ? 
    parseFloat(price.replace(/[^0-9.]/g, '')) : 
    Number(price);
  
  const numericOriginalPrice = originalPrice ? 
    (typeof originalPrice === 'string' ? 
      parseFloat(originalPrice.replace(/[^0-9.]/g, '')) : 
      Number(originalPrice)) : 
    null;

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: numericPrice,
      regular_price: numericOriginalPrice,
      quantity: quantity,
      sku: sku,
      image: imageId,
      stock: stock
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
        stock: stock
      };
      addToCart(updatedItem);
    }
  };

  // Price Component
  const PriceDisplay = () => {
    const priceData = {
      dollar: "$",
      whole: Math.floor(numericPrice * quantity),
      cents: (numericPrice * quantity).toFixed(2).split('.')[1],
      originalPrice: numericOriginalPrice ? (numericOriginalPrice * quantity).toFixed(2) : null
    };

    return (
      <div className="flex items-center justify-start text-base leading-4 text-[#182B55]">
        <span>{priceData.dollar}</span>&nbsp;
        <h1 className="text-3xl font-medium">{priceData.whole}</h1>
        {priceData.cents && <span>.{priceData.cents}</span>}
        {priceData.originalPrice && (
          <span className="ml-2 text-sm line-through text-gray-500">
            ${priceData.originalPrice}
          </span>
        )}
      </div>
    );
  };

  // ShippingInfo Component
  const ShippingInfo = () => {
    const shippingInfo = {
      title: "Get Fast,",
      description: "Free Shipping on Orders Over $500.",
      details: "Details",
    };

    return (
      <div>
        <p className="text-sm">
          <span className="text-[#5D6576]">{shippingInfo.title} </span>
          <span className="font-medium text-[#182B55]">
            {shippingInfo.description}
          </span>
        </p>
      </div>
    );
  };

  // DeliveryInfoCard Component
  const DeliveryInfoCard = () => {
    const deliveryInfo = {
      title: "Delivery",
      date: "Thursday, April 3",
      location: "Deliver to New York 10001",
    };

    return (
      <div className="flex items-start justify-start gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6666 5H3.33329C2.41282 5 1.66663 5.74619 1.66663 6.66667V13.3333C1.66663 14.2538 2.41282 15 3.33329 15H16.6666C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6666 5Z"
            stroke="#3F66BC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.66663 8.33333H18.3333"
            stroke="#3F66BC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.16663 5V3.33333C4.16663 2.8731 4.53972 2.5 4.99996 2.5H8.33329C8.79353 2.5 9.16663 2.8731 9.16663 3.33333V5"
            stroke="#3F66BC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <h3 className="text-sm font-medium text-[#182B55]">
            {deliveryInfo.title}
          </h3>
          <p className="text-xs text-[#5D6576]">{deliveryInfo.date}</p>
          <p className="text-xs text-[#5D6576]">{deliveryInfo.location}</p>
        </div>
      </div>
    );
  };

  // StockQuantity Component
  const StockQuantity = () => {
    const stockData = {
      status: stock > 0 ? "In Stock" : "Out of Stock",
      quantities: [...Array(Math.min(stock, 5))].map((_, i) => i + 1),
      selectedQuantity: isInCart ? cartQuantity : quantity,
      onQuantityChange: handleQuantityChange,
      disabled: stock <= 0
    };

    return (
      <div>
        <p className={`${stockData.status === "In Stock" ? "text-[#3F66BC]" : "text-red-500"} font-medium`}>
          {stockData.status}
        </p>
        {stockData.status === "In Stock" && stockData.quantities.length > 0 && (
          <select 
            className="mt-2 border rounded p-1 w-full"
            value={stockData.selectedQuantity}
            onChange={(e) => stockData.onQuantityChange(parseInt(e.target.value))}
            disabled={stockData.disabled}
          >
            {stockData.quantities.map((qty) => (
              <option key={qty} value={qty}>{qty}</option>
            ))}
          </select>
        )}
      </div>
    );
  };

  // Button Component
  const Button = ({ text, bgColor, hoverColor, textColor, onClick, disabled }) => {
    return (
      <button 
        className={`${bgColor} ${hoverColor} ${textColor} py-2 rounded w-full transition-colors`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  };

  // InfoItem Component
  const InfoItem = ({ label, value }) => {
    return (
      <p>
        <span className="font-medium">{label}:</span> {value}
      </p>
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
      disabled: stock <= 0
    },
    {
      text: "Buy Now",
      bgColor: "bg-[#3F66BC]",
      hoverColor: "hover:bg-[#3F66BC]/80",
      textColor: "text-white",
      disabled: stock <= 0
    }
  ];

  const infoItems = [
    { label: "Ships from", value: "Controls Pro" },
    { label: "SKU", value: sku },
    { label: "Returns", value: "30-day refund/replacement" },
    { label: "Payment", value: "Secure transaction" },
  ];

  return (
    <div className="h-auto max-w-xs rounded-xl border-2 bg-[#F8F9FB] border-[#ECF0F9] py-4 px-3 mx-auto lg:mx-0">
      <div className="w-full max-w-xs md:max-w-[180px] flex flex-col justify-between space-y-4">
        {/* Price */}
        <PriceDisplay />

        {/* Shipping Info */}
        <ShippingInfo />

        {/* Delivery Info */}
        <DeliveryInfoCard />

        {/* Stock and Quantity */}
        <StockQuantity />

        {/* Show quantity in cart if product is in cart */}
        {isInCart && (
          <div className="text-center text-sm text-green-600">
            {cartQuantity} in cart
          </div>
        )}

        {/* Buttons */}
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}

        {/* Info Items */}
        <div className="text-xs w-full text-[#5D6576] font-normal space-y-1 p-2">
          {infoItems.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
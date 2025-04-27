import React from "react";
import Price from "./deliveryInfo/Price";
import ShippingInfo from "./deliveryInfo/ShippingInfo";
import DeliveryInfocard from "./deliveryInfo/DeliveryInfocard";
import StockQuantity from "./deliveryInfo/StockQuantity";
import Button from "./deliveryInfo/Button";
import InfoItem from "./deliveryInfo/InfoItem";

const DeliveryInfo = () => {
  // Price data
  const priceData = {
    dollar: "$",
    whole: "230",
    cents: "45",
  };

  // Shipping info data
  const shippingInfo = {
    title: "Get Fast,",
    description: "Free Shipping on Orders Over $500.",
    details: "Details",
  };

  // Delivery info data
  const deliveryInfo = {
    title: "Delivery",
    date: "Thursday, April 3",
    location: "Deliver to New York 10001",
  };

  // Stock and quantity data
  const stockData = {
    status: "In Stock",
    quantities: [2, 3, 4, 5, 6],
  };

  // Button data
  const buttons = [
    {
      text: "Add to Cart",
      bgColor: "bg-[#FCD700]",
      hoverColor: "hover:bg-[#FCD700]/70",
      textColor: "text-[#182B55]",
    },
    {
      text: "Buy Now",
      bgColor: "bg-[#3F66BC]",
      hoverColor: "hover:bg-[#3F66BC]/80",
      textColor: "text-white",
    },
  ];

  // Info items data
  const infoItems = [
    { label: "Ships from", value: "Controls Pro" },
    { label: "Sold by", value: "FMhotu" },
    { label: "Returns", value: "30-day refund/replacement" },
    { label: "Payment", value: "Secure transaction" },
  ];

  return (
    <div className="h-[496px] max-w-[204px] rounded-xl border-2 bg-[#F8F9FB] border-[#ECF0F9] py-4 px-3 mx-auto lg:mx-0">
      <div className="w-full max-w-[180px] h-[464px] flex flex-col justify-between space-y-4">
        {/* Price */}
        <Price priceData={priceData} />

        {/* Shipping Info */}
        <ShippingInfo shippingInfo={shippingInfo} />

        {/* Delivery Info */}
        <DeliveryInfocard deliveryInfo={deliveryInfo} />

        {/* Stock and Quantity */}
        <StockQuantity stockData={stockData} />

        {/* Buttons */}
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}

        {/* Info Items */}
        <div className="text-[10px] w-full text-[#5D6576] font-normal space-y-1 p-2">
          {infoItems.map((item, index) => (
            <InfoItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;

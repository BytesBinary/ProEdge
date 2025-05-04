import React from "react";

const Price = ({ priceData }) => {
  return (
    <div className="flex flex-col items-start w-full text-[12px] leading-[18px] text-[#182B55]">
      <div className="flex items-center">
        <span>{priceData.dollar}</span>&nbsp;
        <h1 className="text-2xl font-semibold leading-8">{priceData.whole}</h1>
        &nbsp;
        {priceData.cents && <span>.{priceData.cents}</span>}
      </div>
      {priceData.originalPrice && (
        <span className="text-sm line-through text-gray-500">
          ${priceData.originalPrice}
        </span>
      )}
    </div>
  );
};

export default Price;

import React from "react";

const Price = ({ priceData }) => {
  return (
    <div className="flex items-center w-full text-[12px] leading-[18px] text-[#182B55]">
      <span>{priceData.dollar}</span>&nbsp;
      <h1 className="text-2xl font-semibold leading-8">{priceData.whole}</h1>
      &nbsp;
      <span>{priceData.cents}</span>
    </div>
  );
};

export default Price;

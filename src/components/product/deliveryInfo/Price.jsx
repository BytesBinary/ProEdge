import React from "react";
import { formatNumberWithCommas } from "../../../helper/localPrice/localeprice";
import { BsCurrencyDollar } from "react-icons/bs";

const Price = ({ priceData }) => {
  return (
    <div className="flex flex-col items-start w-full text-[12px] leading-[18px] text-[#182B55]">
      <div className="flex items-center">
        <span>{formatNumberWithCommas(priceData.dollar)}</span>&nbsp;
        <h1 className="text-2xl font-semibold leading-8">{formatNumberWithCommas(priceData.whole)}</h1>
        &nbsp;
        {priceData.cents && <span>.{formatNumberWithCommas(priceData.cents)}</span>}
      </div>
      {priceData.originalPrice && (
        <span className="text-sm line-through text-gray-500">
          <BsCurrencyDollar/>{formatNumberWithCommas(priceData.originalPrice)}
        </span>
      )}
    </div>
  );
};

export default Price;

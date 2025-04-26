import React from "react";

const PriceCard = ({ title, price, originalPrice }) => {
  return (
    <div className="w-[134px] h-[98px] bg-[#F8F9FB] hover:bg-[#3F66BC] p-3 cursor-pointer rounded-[12px] border border-[#F8F9FB] hover:border-[#F8F9FB] group transition-all duration-300">
      <div className="w-full h-[74px] flex flex-col justify-between text-[#182B55] group-hover:text-white">
        <div className="h-[36px] relative">
          <h1 className="font-semibold pb-2 text-sm leading-[18px] border-b border-[#3F66BC]/10 group-hover:border-white/25 border-dashed text-[#3F66BC] group-hover:text-white transition-all duration-300">
            {title}
          </h1>
        </div>
        <div className="h-[36px] flex flex-col justify-between text-[12px] leading-4 font-medium">
          <h1 className="group-hover:text-white">${price}</h1>
          <h1 className="text-[#5D6576] line-through group-hover:text-white">${originalPrice}</h1>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;

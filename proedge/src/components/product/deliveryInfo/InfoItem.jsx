import React from "react";

const InfoItem = ({ item }) => {
  return (
    <div className="flex gap-2">
      <p className="whitespace-nowrap w-[70px]">{item.label}</p>
      <p className="text-[#3F66BC] font-medium text-left w-[100px]">
        {item.value}
      </p>
    </div>
  );
};

export default InfoItem;

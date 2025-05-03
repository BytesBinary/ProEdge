import React from "react";

const VariationCard = ({ 
  title, 
  price, 
  originalPrice, 
  onClick, 
  isSelected 
}) => {
  return (
    <div 
      className={`w-32 h-24 ${isSelected ? 'bg-[#3F66BC]' : 'bg-[#F8F9FB]'} hover:bg-[#3F66BC] p-3 cursor-pointer rounded-lg border ${isSelected ? 'border-[#F8F9FB]' : 'border-[#F8F9FB]'} hover:border-[#F8F9FB] group transition-all duration-300`}
      onClick={onClick}
    > 
      <div className={`w-full h-20 flex flex-col justify-between ${isSelected ? 'text-white' : 'text-[#182B55]'} group-hover:text-white`}> 
        <div className="h-9 relative"> 
          <h1 className={`font-semibold pb-2 text-sm leading-5 border-b ${isSelected ? 'border-white/25' : 'border-[#3F66BC]/10'} group-hover:border-white/25 border-dashed ${isSelected ? 'text-white' : 'text-[#3F66BC]'} group-hover:text-white transition-all duration-300`}>
            {title} 
          </h1> 
        </div> 
        <div className="h-9 flex flex-col justify-between text-xs leading-4 font-medium"> 
          <h1 className="group-hover:text-white">${price}</h1> 
          <h1 className={`${isSelected ? 'text-white' : 'text-[#5D6576]'} line-through group-hover:text-white`}>
            ${originalPrice}
          </h1> 
        </div> 
      </div> 
    </div>
  );
};

export default VariationCard;
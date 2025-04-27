import React from "react";

const ProductImage = ({ thumbnails, mainImage }) => {
  return (
    <div className="w-full md:max-w-[384px] flex flex-col md:flex-row justify-around md:h-[398px]">
      
      {/* Thumbnails */}
      <div className="flex md:flex-col items-center md:items-start justify-center gap-3 md:gap-0">
        {thumbnails.map((thumb, index) => (
          <div
            key={index}
            className="w-[78px] cursor-pointer hover:border-2 hover:border-[#3F66BC] h-[91px] md:mb-3 rounded-[6px] bg-[#F8F9FB] flex items-center justify-center"
          >
            <img src={thumb} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="w-full md:w-[294px] h-[200px] md:h-[398px] mt-4 md:mt-0 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
        <img src={mainImage} alt="Main Product" className="max-w-full max-h-full" />
      </div>

    </div>
  );
};

export default ProductImage;

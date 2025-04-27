import React from "react";

const ProductImage = ({ thumbnails, mainImage }) => {
  return (
    <div className="w-full md:max-w-sm flex flex-col md:flex-row justify-around md:h-auto">
      {/* Thumbnails */}
      <div className="flex md:flex-col items-center md:items-start justify-center gap-3 md:gap-0">
        {thumbnails.map((thumb, index) => (
          <div
            key={index}
            className="w-20 cursor-pointer hover:border-2 hover:border-[#3F66BC] h-24 md:mb-3 rounded-md bg-[#F8F9FB] flex items-center justify-center"
          >
            <img src={thumb} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Main Image */}

      <div className="w-full md:w-2xs h-[200px] md:h-[398px] mt-4 md:mt-0 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
        <img src={mainImage} alt="Main Product" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

export default ProductImage;
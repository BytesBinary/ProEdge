import React from "react";
import banner from "../../assets/images/stockBanner.png"

const StockBanner = ({
  backgroundImage = banner,
  altText = "Warehouse storage shelves with products",
  tagText = "Free shipping over $500",
  heading = "Stock Up & Save",
  ctaText = "Shop Now",
  ctaLink = "#"
}) => {
  return (
    <section className="relative h-[300px] overflow-hidden md:h-[400px] mt-10">
      {/* Background Image */}
      <img src={backgroundImage} alt={altText} className="h-full w-full object-cover" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#F8F9FB] before:via-[#F8F9FB]/30 before:to-[#F8F9FB]/0"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center mx-auto px-8 md:px-5 max-w-7xl ">
        <div className="relative space-y-4 text-left">
          <p className="text-[#3F66BC] text-lg font-semibold md:text-xl">{tagText}</p>
          <h1 className="text-[#182B55] text-4xl font-bold md:text-5xl">{heading}</h1>
          <a
            href={ctaLink}
            className="inline-block bg-[#3F66BC] text-white rounded-full py-3 px-8 mt-5 font-medium text-lg transition-transform hover:scale-105"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default StockBanner;

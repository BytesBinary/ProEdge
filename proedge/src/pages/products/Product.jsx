import React from "react";

import bgImage from "../../assets/images/productDetails/bg.jpeg";
import greater from "../../assets/images/productDetails/greater.png";
import m1 from "../../assets/images/productDetails/motor/m1.png";
import m2 from "../../assets/images/productDetails/motor/m2.png";

import ProductImage from "../../components/product/ProductImage";
import DeliveryInfo from "../../components/product/DeliveryInfo";
import ProductInfo from "../../components/product/ProductInfo";

import PDS from "../../components/common/utils/ProductDetails/PDS";
import ProductSpecList from "../../components/product/ProductSpecList";
import ProDetails from "../../data/ProDetails/ProDetails";
import MostViewedSection from "../../components/home/MostViewed";
import CardComponent from "../../components/product/CardComponent";

const Product = () => {
  return (
    <div>
      <div className="flex flex-col items-start w-full mx-auto">
        <section className="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">
          <img
            src={bgImage}
            alt="A man using a grinder on wood"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/60 bg-opacity-60"></div>

          <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Products Details
            </h1>
            <nav className="mt-2 text-sm md:text-base flex items-center gap-2">
              <a href="/" className="hover:underline">
                Home
              </a>
              <img
                src={greater}
                alt="An icon pointing to the right"
                className="w-6 h-6"
              />
              <a href="#" className="hover:underline">
                Products
              </a>
              <img
                src={greater}
                alt="An icon pointing to the right"
                className="w-6 h-6"
              />
              <span className="text-gray-300">Product Details</span>
            </nav>
          </div>
        </section>

        <section className="my-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between w-full h-auto items-start gap-6">
          <ProductImage thumbnails={[m1, m1, m1, m1]} mainImage={m2} />
          <ProductInfo />
          <DeliveryInfo />
        </section>

        <section className="my-10 max-w-7xl mx-auto shadow-sm w-full rounded-[14px] bg-white border-2 border-[#F8F9FB]">
          <div className="bg-[#F8F9FB] px-4 sm:px-10 py-5 rounded-tl-[14px] rounded-tr-[14px] flex flex-wrap gap-2">
            <PDS title="Key Features" />
            <PDS title="Product Details" />
            <PDS title="Product Information" />
          </div>

          <div className="text-[16px] leading-6 w-[280px] text-[#182B55] font-medium space-y-1  p-10">
            <ProductSpecList />
          </div>
        </section>

        <section className=" my-10 bg-[#F8F9FB] w-full py-16 px-4 md:px-12 flex justify-center items-center gap-6 flex-wrap">
          {ProDetails.map((item, index) => (
            <CardComponent
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </section>

        <MostViewedSection title={"Products related to this items"} />
      </div>
    </div>
  );
};

export default Product;

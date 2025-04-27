import React from 'react';

import bgImage from '../../assets/images/productDetails/bg.jpeg';
import greater from '../../assets/images/productDetails/greater.png';
import m1 from '../../assets/images/productDetails/motor/m1.png';
import m2 from '../../assets/images/productDetails/motor/m2.png';

import ProductImage from '../../components/product/ProductImage';
import DeliveryInfo from '../../components/product/DeliveryInfo';
import ProductInfo from '../../components/product/ProductInfo';

import PDS from '../../components/common/utils/ProductDetails/PDS';
import ProductSpecList from '../../components/product/ProductSpecList';
import CardComponent from '../../components/product/CardComponent';
import ProDetails from '../../data/ProDetails/ProDetails';
import MostViewedSection from '../../components/home/MostViewed';

const Product = () => {
  return (
    <div>
      <div className="flex flex-col items-start max-w-full w-full mx-auto">
        {/* Hero Section */}
        <section className="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">
          <img
            src={bgImage}
            alt="A man using a grinder on wood"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">
            <h1 className="text-3xl md:text-4xl font-semibold">Products Details</h1>
            <nav className="mt-2 text-sm md:text-base flex items-center gap-2">
              <a href="/" className="hover:underline">
                Home
              </a>
              <img src={greater} alt="An icon pointing to the right" className="w-6 h-6" />
              <a href="#" className="hover:underline">
                Products
              </a>
              <img src={greater} alt="An icon pointing to the right" className="w-6 h-6" />
              <span className="text-gray-300">Product Details</span>
            </nav>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="my-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between w-full items-start gap-6">
          <ProductImage m1={m1} m2={m2} />
          <ProductInfo />
          <DeliveryInfo />
        </section>

        {/* Product Specifications Section */}
        <section className="my-10 max-w-7xl mx-auto shadow-sm w-full rounded-lg bg-white border-2 border-gray-200">
          <div className="bg-gray-100 px-4 sm:px-10 py-5 rounded-t-lg flex flex-wrap gap-2">
            <PDS title="Key Features" />
            <PDS title="Product Details" />
            <PDS title="Product Information" />
          </div>
          <div className="text-base leading-6 text-blue-900 font-medium space-y-1 p-10">
            <ProductSpecList />
          </div>
        </section>

        {/* Related Products Section */}
        <section className="my-10 bg-gray-100 w-full py-16 px-4 md:px-12 lg:px-28 flex justify-center items-center gap-6 flex-wrap">
          {ProDetails.map((item, index) => (
            <CardComponent key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} />
          ))}
        </section>

        {/* Most Viewed Section */}
        <section className="max-w-7xl mx-auto">
          <MostViewedSection title="Products related to this item" />
        </section>
      </div>
    </div>
  );
};

export default Product;
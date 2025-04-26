import React from 'react'

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
      <div class=" flex flex-col items-start max-w-full w-full mx-auto">

        <section class="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">

          <img src={bgImage} alt="A man using a grinder on wood"
            class="absolute inset-0 w-full h-full object-cover object-center" />


          <div class="absolute inset-0 bg-black/60 bg-opacity-60"></div>


          <div
            class="relative  mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">
            <h1 class="text-3xl md:text-4xl font-semibold">Products Details</h1>
            <nav class="mt-2 text-sm md:text-base flex items-center gap-2">
              <a href="/" class="hover:underline">Home</a>
              <img src={greater} alt="An icon pointing to the right" class="w-6 h-6" />
              <a href="#" class="hover:underline">Products</a>
              <img src={greater} alt="An icon pointing to the right" class="w-6 h-6" />
              <span class="text-gray-300">Product Details</span>
            </nav>
          </div>
        </section>


        <section class="my-10 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between w-full h-auto items-start gap-6">
          <ProductImage m1={m1} m2={m2} />
          <ProductInfo />
          <DeliveryInfo />         
        </section>


        <section class="my-10  max-w-[1200px]  mx-auto shadow-sm w-full rounded-[14px] bg-white border-2 border-[#F8F9FB]">

          <div class="bg-[#F8F9FB] px-4 sm:px-10 py-5 rounded-tl-[14px] rounded-tr-[14px] flex flex-wrap gap-2">
            <PDS title="Key Features" />
            <PDS title="Product Details" />
            <PDS title="Product Information" />      
          </div>

          <div class="text-[16px] leading-6 w-[280px] text-[#182B55] font-medium space-y-1  p-10">
            <ProductSpecList />           
          </div>
        </section>


        <section
          class=" my-10 bg-[#F8F9FB] w-full py-16 px-4 md:px-12 lg:px-[120px] flex justify-center items-center gap-6 flex-wrap">
           {ProDetails.map((item, index) => (
            <CardComponent key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} />
          ))}      
        </section>

          <section className='max-w-[1200px] mx-auto'>
            <MostViewedSection title={"Products related to this items"} />
          </section>

        <div>

        </div>


      </div>
    </div>
  )
}

export default Product

import React, { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { formatCategoryName } from "../../helper/slugifier/slugify";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const CategoryItem = ({ id, image, label, alt, category_name }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center group min-w-[140px]">
      <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white p-2 mb-3"
        onClick={() =>
          navigate(`/products?parent_category=${formatCategoryName(category_name + " " + id)}`)
        }
      >
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/assets/${image}`}
          alt={alt}
          className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          onClick={() =>
            navigate(`/products?parent_category=${formatCategoryName(category_name + " " + id)}`)
          }
          className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-[#3F66BCAB] rounded-full transition-opacity cursor-pointer"
        >
          <span className="text-md md:text-lg font-semibold text-white">Shop All</span>
        </div>
      </div>
      <span className="w-full text-sm md:text-md lg:text-base leading-tight text-white text-center">
        {label}
      </span>
    </div>
  );
};

const ShopCategorySection = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <section aria-labelledby="shop-category-heading" className="overflow-hidden">
      <div className="bg-[#182B55] py-16 md:py-28 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold">Shop by Category</h1>
      </div>

      <div className="bg-[#3F66BC] py-16 md:py-28 relative">
        <div className="w-full max-w-7xl md:absolute md:bottom-20 md:left-1/2 md:-translate-x-1/2 px-6">
          {categories.length > 7 ? (
            <Swiper
              slidesPerView={2}
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: '.desktop-pagination',
              }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
              modules={[Autoplay, Pagination]}
              className="w-full"
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <CategoryItem
                    id={category.id}
                    image={category.image.id}
                    label={category.category_name}
                    alt={category.category_name}
                    category_name={category.category_name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:flex md:gap-6 md:overflow-x-auto py-2 custom-scrollbar-hide">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  id={category.id}
                  image={category.image.id}
                  label={category.category_name}
                  alt={category.category_name}
                  category_name={category.category_name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .custom-scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .custom-scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};


export default ShopCategorySection;

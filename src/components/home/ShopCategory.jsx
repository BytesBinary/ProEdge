import React, { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { formatCategoryName } from "../../helper/slugifier/slugify";


const CategoryItem = ({ id, image, label, alt, category_name }) => {
  const navigate = useNavigate();

  return (
  <div className="flex flex-col items-center group">
    <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white p-2 mb-3">
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/assets/${image}`}
        alt={alt}
        className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        onClick={() => navigate(`/products?parent_category=${formatCategoryName(category_name+' '+id)}`)}
        className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-[#3F66BCAB] rounded-full transition-opacity"
      >
        <span className="text-md md:text-lg font-semibold">Shop All</span>
      </div>
    </div>
    <span className="w-full text-sm md:text-md lg:text-base leading-tight">
      {label}
    </span>
  </div>
  );
}


const ShopCategorySection = () => {
  const { categories } = useContext(CategoryContext);
  console.log(categories);

  return (
    <section aria-labelledby="shop-category-heading" className="overflow-hidden">
      <div className="bg-[#182B55] py-16 md:py-28 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold">Shop by Category</h1>
      </div>

      <div className="bg-[#3F66BC] py-16 md:py-28 relative">
        <div className="w-full max-w-7xl md:absolute md:bottom-20 md:left-1/2 md:-translate-x-1/2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 px-6 text-white text-center">
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
        </div>
      </div>
    </section>
  );
};

export default ShopCategorySection;

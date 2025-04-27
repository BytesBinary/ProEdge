import React from "react";
import { Link } from "react-router-dom";
import subcategories from "../../../../data/browseProducts/BrowseProducts";
import CategoryItem from "./browseProduct/CategoryItem";
import SubcategoryList from "./browseProduct/SubCategoryList";
import MenuIcon from "./browseProduct/icons/MenuIcons";
import DropdownArrowIcon from "./browseProduct/icons/DropDownArrow";
import categories from "../../../../data/browseProducts/BrowseCategory"



// Main BrowseProduct Component
const BrowseProduct = () => {
  const handleCategoryClick = (categoryId) => {
    // Handle category click logic here
    console.log(`Category ${categoryId} clicked`);
  };

  return (
    <div className="relative group w-full md:w-full lg:w-[434px]">
      {/* Button Trigger */}
      <button className="w-full px-5 py-4 bg-[#182B55] text-white rounded-full flex justify-between items-center gap-2">
        <MenuIcon />
        <span className="text-md md:text-lg font-semibold">
          Browse Products
        </span>
        <DropdownArrowIcon />
      </button>

      {/* Dropdown Bridge */}
      <div className="absolute top-full left-0 w-full h-2 md:h-7 z-40"></div>

      {/* Dropdown Content */}
      <div className="absolute top-full -translate-x-5 mt-2 md:mt-7 w-5xl z-50 opacity-0 pointer-events-none  group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
        <div className="bg-white rounded-xl shadow-xl py-6 pr-6">
          <div className="flex flex-col lg:flex-row min-h-[400px]">
            {/* Left Panel - Categories */}
            <div className="lg:w-3/7 border-r border-gray-200">
              <h3 className="text-3xl p-6 font-bold text-[#182B55]">
                Shop Categories
              </h3>
              <nav className="space-y-2 overflow-y-auto">
                {categories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    icon={category.icon}
                    title={category.title}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                ))}
              </nav>
            </div>

            {/* Right Panel - Subcategories */}
            <div className="lg:w-4/7 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#182B55]">
                  Electric Motors & Motor Controls
                </h2>
                <Link
                  to="/shop-all"
                  className="text-[#3F66BC] text-md hover:text-[#2E4A8E] transition-colors"
                >
                  Shop All
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
                {subcategories.map((subcategory, index) => (
                  <SubcategoryList
                    key={index}
                    title={subcategory.title}
                    items={subcategory.items}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProduct;
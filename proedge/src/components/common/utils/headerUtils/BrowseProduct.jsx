import React from "react";
import MenuIcon from "./browseProduct/icons/MenuIcons";
import DropdownArrowIcon from "./browseProduct/icons/DropDownArrow";
import LeftPanel from "./browseProduct/LeftPanel";
import RightPanel from "./browseProduct/RightPanel";



const BrowseProduct = () => {
  const handleCategoryClick = (categoryId) => {
    // Handle category click logic here
    console.log(`Category ${categoryId} clicked`);
  };

  return (
    <div className="relative group w-full md:w-full max-w-2xs">
      {/* Button Trigger */}
      <button className="w-full px-5 py-4 bg-[#182B55] text-white rounded-full flex justify-between items-center gap-2">
        <MenuIcon />
        <span className="text-xs md:text-lg font-semibold">
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
            <LeftPanel />
            <RightPanel />  
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProduct;
import React, { useState, useEffect, useRef, useContext } from "react";
import MenuIcon from "./browseProduct/icons/MenuIcons";
import DropdownArrowIcon from "./browseProduct/icons/DropDownArrow";
import LeftPanel from "./browseProduct/LeftPanel";
import RightPanel from "./browseProduct/RightPanel";
import { CategoryContext } from "../../../../context/CategoryContext";

const BrowseProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dropdownRef = useRef(null);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(true); 
  };

  const handleHover = (state) => {
    if (window.innerWidth > 768) {
      setIsOpen(state);
      if (state && categories.length > 0 && !selectedCategory) {
        setSelectedCategory(categories[0]); 
      }
    }
  };

  return (
    <div
      className="relative group w-full max-w-2xs"
      ref={dropdownRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!selectedCategory && categories.length > 0) {
            setSelectedCategory(categories[0]); // auto-select on click if none
          }
        }}
        className="w-full px-5 py-4 bg-[#182B55] text-white rounded-full flex justify-between items-center gap-2 transition-all"
      >
        <MenuIcon />
        <span className="text-md md:text-lg font-medium">Browse Products</span>
        <DropdownArrowIcon className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className="absolute top-full left-0 w-full h-2 md:h-7 z-40"></div>

      <div
        className={`absolute top-full -translate-x-5 mt-2 md:mt-7 md:w-4xl z-50 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } transition-all duration-300`}
      >
        <div className="bg-white rounded-xl shadow-xl py-6 pr-6">
          <div className="flex flex-col lg:flex-row min-h-[400px]">
            <LeftPanel onCategoryClick={handleCategoryClick} />
            <RightPanel selectedCategory={selectedCategory} handleHover={handleHover}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default BrowseProduct;

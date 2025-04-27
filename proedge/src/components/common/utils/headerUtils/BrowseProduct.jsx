import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "./browseProduct/icons/MenuIcons";
import DropdownArrowIcon from "./browseProduct/icons/DropDownArrow";
import LeftPanel from "./browseProduct/LeftPanel";
import RightPanel from "./browseProduct/RightPanel";

const BrowseProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle hover logic
  const handleHover = (state) => {
    if (window.innerWidth > 768) { // Desktop only
      setIsOpen(state);
    }
  };

  const handleCategoryClick = (categoryId) => {
    console.log(`Category ${categoryId} clicked`);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div 
      className="relative group w-full max-w-2xs"
      ref={dropdownRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 bg-[#182B55] text-white rounded-full flex justify-between items-center gap-2 transition-all"
      >
        <MenuIcon />
        <span className="text-xs md:text-lg font-semibold">
          Browse Products
        </span>
        <DropdownArrowIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Bridge */}
      <div className="absolute top-full left-0 w-full h-2 md:h-7 z-40"></div>

      {/* Dropdown Content */}
      <div className={`absolute top-full -translate-x-5 mt-2 md:mt-7 md:w-5xl z-50 
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        transition-all duration-300`}
      >
        <div className="bg-white rounded-xl shadow-xl py-6 pr-6">
          <div className="flex flex-col lg:flex-row min-h-[400px]">
            <LeftPanel onCategoryClick={handleCategoryClick} />
            <RightPanel />
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" 
             onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default BrowseProduct;
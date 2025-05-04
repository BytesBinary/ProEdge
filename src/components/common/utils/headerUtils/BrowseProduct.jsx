import React, { useState, useEffect, useRef, useContext } from "react";
import MenuIcon from "./browseProduct/icons/MenuIcons";
import DropdownArrowIcon from "./browseProduct/icons/DropDownArrow";
import LeftPanel from "./browseProduct/LeftPanel";
import RightPanel from "./browseProduct/RightPanel";
import { CategoryContext } from "../../../../context/CategoryContext";
import RightArrowIcon from "./browseProduct/icons/RightArrowIcon";

const BrowseProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const dropdownRef = useRef(null);
  const { categories } = useContext(CategoryContext);
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    if (mobileView) {
      setIsOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  const handleHover = (state) => {
    if (!mobileView) {
      // Only apply hover effects on desktop
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
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MenuIcon />
        <span className="text-md md:text-lg font-medium">Browse Products</span>
        <DropdownArrowIcon
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div className="absolute top-full left-0 w-full h-2 md:h-7 z-40"></div>

      {/* Mobile Full-screen Panel */}
      {mobileView && (
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="h-full flex flex-col overflow-hidden">
            {/* Header with back button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-gray-100"
                aria-label="Close menu"
              >
                <RightArrowIcon/>
              </button>
              <h2 className="text-xl font-bold text-[#182B55]">
                Browse Products
              </h2>
              <div className="w-10"></div> {/* Spacer for balance */}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col lg:flex-row h-full">
                <LeftPanel
                  onCategoryClick={handleCategoryClick}
                  mobileView={mobileView}
                />
                {selectedCategory && (
                  <RightPanel
                    selectedCategory={selectedCategory}
                    onBack={() => setSelectedCategory(null)}
                    mobileView={mobileView}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop View  */}

      {!mobileView && (
        <div
          className={`absolute top-full -translate-x-5 mt-2 md:mt-7 md:w-4xl z-50 ${isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
            } transition-all duration-300`}
        >
          <div className="bg-white rounded-xl shadow-xl py-6 pr-6">
            <div className="flex flex-col lg:flex-row min-h-[400px]">
              <LeftPanel onCategoryClick={handleCategoryClick} />
              <RightPanel
                selectedCategory={selectedCategory}
                handleHover={handleHover}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseProduct;

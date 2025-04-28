import React, { useState } from "react";

// Reusable ToggleSection Component
const ToggleSection = ({ title, children, isOpen, setIsOpen }) => {
  return (
    <div className="w-full bg-[#F8F9FB] border-[1.5px] border-[#ECF0F9] rounded-lg p-4 text-sm text-[#182B55] font-medium space-y-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <h2 className="text-lg font-medium text-[#182B55] leading-6">{title}</h2>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && <div className="space-y-4 pt-3 border-t-2 border-[#ECF0F9]">{children}</div>}
    </div>
  );
};

// Reusable Checkbox Component
const Checkbox = ({ id, label, defaultChecked = false }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="peer form-checkbox text-[#3F66BC]"
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:text-[#3F66BC] text-[16px] leading-6 text-[#182B55] font-medium peer-checked:font-medium transition-colors"
      >
        {label}
      </label>
    </div>
  );
};

// Reusable PriceRange Component
const PriceRange = ({ isOpen, setIsOpen }) => {
  return (
    <div className="w-[282px] p-4 bg-[#F8F9FB] border-[1.5px] border-[#ECF0F9] rounded-[8px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer border-b-2 border-[#ECF0F9] pb-4"
      >
        <h2 className="text-[18px] leading-6 text-[#182B55] font-medium">Price</h2>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-3">
          <div className="w-full flex items-center justify-between space-x-2 text-[16px] leading-5 text-[#182B55] font-medium">
            <div>
              <p>Min Price</p>
              <input
                type="text"
                placeholder="$0 min"
                className="w-full px-4 py-2 text-[#5D6576] text-[16px] leading-6 font-medium border rounded-[8px] border-[#ECF0F9] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <span className="text-[#3F66BC] h-[2px] w-[10px]">–</span>
            <div>
              <p>Max Price</p>
              <input
                type="text"
                placeholder="$990 max"
                className="w-full px-4 py-2 text-[#5D6576] text-[16px] leading-6 font-medium border rounded-[8px] border-[#ECF0F9] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="range"
              min="0"
              max="990"
              defaultValue="0"
              className="w-full accent-blue-500"
            />
          </div>
          <p className="text-[#5D6576] text-[16px] leading-6 font-medium">Price: $0 – $990</p>
        </div>
      )}
    </div>
  );
};

const Filter = ({ onClose }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isElectricMotorsOpen, setIsElectricMotorsOpen] = useState(true);
  const [isMadeInUSAOpen, setIsMadeInUSAOpen] = useState(true);
  const [isItemOpen, setIsItemOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  return (
    <>
      <div className="w-[282px] bg-white space-y-6 h-screen lg:h-auto overflow-y-auto">
        {/* Filter Header with Close Button */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-[#182B55] leading-8 px-5 md:px-0 pt-5 md:pt-0">Filter</h2>
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden text-4xl text-[#182B55] hover:text-gray-600 px-5"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Fast Shipping Checkbox */}
        <div className="border border-[#ECF0F9] rounded-[8px] px-3 py-[14px] flex items-center space-x-2 bg-[#F8F9FB]">
          <input type="checkbox" defaultChecked className="bg-[#3F66BC] w-4 h-4" />
          <label className="text-[16px] leading-5 text-[#182B55] font-medium cursor-pointer">
            Fast Shipping
          </label>
        </div>

        {/* Categories Section */}
        <ToggleSection
          title="Categories"
          isOpen={isCategoriesOpen}
          setIsOpen={setIsCategoriesOpen}
        >
          <a href="#" className="hover:underline">
            Electric Motors & Motor Controls
          </a>
        </ToggleSection>

        {/* Electric Motors Section */}
        <ToggleSection
          title="Electric Motors & Motor Controls"
          isOpen={isElectricMotorsOpen}
          setIsOpen={setIsElectricMotorsOpen}
        >
          <Checkbox id="electric-motors" label="Electric Motors" defaultChecked />
          <div className="ml-6 mt-2 space-y-2">
            <Checkbox id="single-phase" label="Single Phase (23)" defaultChecked />
            <Checkbox id="three-phase" label="Three Phase (6)" />
          </div>
        </ToggleSection>

        {/* Price Section */}
        <PriceRange isOpen={isPriceOpen} setIsOpen={setIsPriceOpen} />

        {/* Made in the USA Section */}
        <ToggleSection
          title="Made in the USA"
          isOpen={isMadeInUSAOpen}
          setIsOpen={setIsMadeInUSAOpen}
        >
          <Checkbox id="usa" label="NO (64)" />
        </ToggleSection>

        {/* Item Section */}
        <ToggleSection title="Item" isOpen={isItemOpen} setIsOpen={setIsItemOpen}>
          <Checkbox id="reducing_bushing" label="Reducing Bushing (9)" />
          <Checkbox id="bushing" label="Bushing (5)" />
          <Checkbox id="reducer" label="Reducer Bushing (2)" />
        </ToggleSection>
      </div>
    </>
  );
};

export default Filter;
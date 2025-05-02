import React, { useContext, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { formatCategoryName } from "../../helper/slugifier/slugify";
import { useLocation } from "react-router-dom";

// Reusable ToggleSection
const ToggleSection = ({ title, children, isOpen, setIsOpen }) => (
  <div className="w-full bg-[#F8F9FB] border-[1.5px] border-[#ECF0F9] rounded-lg p-4 text-sm text-[#182B55] font-medium space-y-4">
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-between cursor-pointer select-none"
    >
      <h2 className="text-lg font-medium text-[#182B55] leading-6">{title}</h2>
      <svg
        className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    {isOpen && <div className="space-y-4 pt-3 border-t-2 border-[#ECF0F9]">{children}</div>}
  </div>
);

// Reusable Checkbox with proper state management
const Checkbox = ({ id, label, defaultChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="peer form-checkbox text-[#3F66BC]"
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:text-[#3F66BC] text-[16px] leading-6 text-[#182B55] font-medium transition-colors"
      >
        {label}
      </label>
    </div>
  );
};

// Reusable Price Range with state management
const PriceRange = ({ isOpen, setIsOpen }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(990);
  const [priceRange, setPriceRange] = useState(0);

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    setMaxPrice(value);
  };

  return (
    <div className="w-[282px] p-4 bg-[#F8F9FB] border-[1.5px] border-[#ECF0F9] rounded-[8px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer border-b-2 border-[#ECF0F9] pb-4"
      >
        <h2 className="text-[18px] leading-6 text-[#182B55] font-medium">Price</h2>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-3">
          <div className="w-full flex items-center justify-between space-x-2 text-[16px] leading-5 text-[#182B55] font-medium">
            <div>
              <p>Min Price</p>
              <input
                type="number"
                placeholder="$0 min"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 text-[#5D6576] text-[16px] leading-6 font-medium border rounded-[8px] border-[#ECF0F9] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <span className="text-[#3F66BC] h-[2px] w-[10px]">–</span>
            <div>
              <p>Max Price</p>
              <input
                type="number"
                placeholder="$990 max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value) || 990)}
                className="w-full px-4 py-2 text-[#5D6576] text-[16px] leading-6 font-medium border rounded-[8px] border-[#ECF0F9] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="range"
              min={minPrice}
              max="990"
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full accent-blue-500"
            />
          </div>
          <p className="text-[#5D6576] text-[16px] leading-6 font-medium">
            Price: ${minPrice} – ${maxPrice}
          </p>
        </div>
      )}
    </div>
  );
};

const Filter = ({ onClose }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isMadeInUSAOpen, setIsMadeInUSAOpen] = useState(true);
  const [isItemOpen, setIsItemOpen] = useState(true);
  const [fastShipping, setFastShipping] = useState(true);

  const categories = useContext(CategoryContext);
  const query = new URLSearchParams(useLocation().search);
  const parent_slug_category = query.get("parent_category");
  const sub_slug_category = query.get("sub_category");
  const child_slug_category = query.get("child_category");

  const selectedParentSlug = parent_slug_category;
  const selectedSubSlug = sub_slug_category;
  const selectedChildSlug = child_slug_category;
  console.log(selectedParentSlug,"selectedParentSlug");
  console.log(selectedSubSlug,"selectedSubSlug");
  console.log(selectedChildSlug,"selectedChildSlug");
  console.log(categories, "categories");

  return (
    <div className="w-[282px] bg-white space-y-6 h-screen lg:h-auto overflow-y-auto">
      {/* Filter Header */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl text-[#182B55] leading-8 px-5 md:px-0 pt-5 md:pt-0">
            Filter
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden text-4xl text-[#182B55] hover:text-gray-600 px-5"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Fast Shipping */}
      <div className="border border-[#ECF0F9] rounded-[8px] px-3 py-[14px] flex items-center space-x-2 bg-[#F8F9FB]">
        <input 
          type="checkbox" 
          checked={fastShipping} 
          onChange={(e) => setFastShipping(e.target.checked)}
          className="bg-[#3F66BC] w-4 h-4" 
        />
        <label className="text-[16px] leading-5 text-[#182B55] font-medium cursor-pointer">
          Fast Shipping
        </label>
      </div>

      {/* Categories */}
      <ToggleSection title="Categories" isOpen={isCategoriesOpen} setIsOpen={setIsCategoriesOpen}>
        {categories?.categories?.map((parent) => {
          const parentSlugId = formatCategoryName(parent.category_name ? parent.category_name:"nvnnv") + "-" + parent.id;
          const isParentChecked = selectedParentSlug === parentSlugId;

          return (
            <div key={parent.id}>
              <Checkbox
                id={`parent-${parent.id}`}
                label={parent.category_name}
                defaultChecked={isParentChecked}
              />
              {parent.sub_category?.map((sub) => {
                const subSlugId = `${formatCategoryName(sub.sub_category_name?sub.sub_category_name:"vfvnnv")}-${sub.id}`;
                const isSubChecked =
                  selectedSubSlug === subSlugId ||
                  selectedChildSlug?.startsWith(formatCategoryName(sub.sub_category_name));

                return (
                  <div key={sub.id} className="ml-4 mt-2">
                    <Checkbox
                      id={`sub-${sub.id}`}
                      label={sub.sub_category_name}
                      defaultChecked={isSubChecked}
                    />
                    <div className="ml-4 mt-2 space-y-2">
                      {sub.child_category?.map((child) => {
                        const childSlugId = `${formatCategoryName(child.child_category_name?child.child_category_name:"rnvnnv")}-${child.id}`;
                        const isChildChecked = selectedChildSlug === childSlugId;

                        return (
                          <Checkbox
                            key={child.id}
                            id={`child-${child.id}`}
                            label={`${child.child_category_name} (${child.total_stock})`}
                            defaultChecked={isChildChecked}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </ToggleSection>

      {/* Price Filter */}
      <PriceRange isOpen={isPriceOpen} setIsOpen={setIsPriceOpen} />

      {/* Made in USA */}
      <ToggleSection title="Made in the USA" isOpen={isMadeInUSAOpen} setIsOpen={setIsMadeInUSAOpen}>
        <Checkbox id="usa" label="NO (64)" />
      </ToggleSection>

      {/* Item Type */}
      <ToggleSection title="Item" isOpen={isItemOpen} setIsOpen={setIsItemOpen}>
        <Checkbox id="reducing_bushing" label="Reducing Bushing (9)" />
        <Checkbox id="bushing" label="Bushing (5)" />
        <Checkbox id="reducer" label="Reducer Bushing (2)" />
      </ToggleSection>
    </div>
  );
};

export default Filter;
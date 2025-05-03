import React, { useContext, useEffect, useState } from "react";
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
const Checkbox = ({ id, label, toggle, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="peer form-checkbox text-[#3F66BC]"
        checked={toggle}  // Fully controlled by parent
        onChange={onChange}  // Directly use parent's onChange
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
  const { categories,singleCategory, setSingleCategory} = useContext(CategoryContext); 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  useEffect(() => {
    const parentSlug = queryParams.get("parent_category");
    const subSlug = queryParams.get("sub_category");
    const childSlug = queryParams.get("child_category");

    const formatCategories = (categories) => {
      const processCategory = (category) => {
        const name =
          category.category_name ||
          category.child_category_name ||
          category.subcategory_name ||
          "";
        const slug = `${formatCategoryName(name)}-${category.id}`;
        const newCategory = {
          ...category,
          slug,
          toggle: false,
        };
        if (category.sub_category) {
          newCategory.sub_category = category.sub_category.map(processCategory);
        }
        if (category.child_category) {
          newCategory.child_category = category.child_category.map(processCategory);
        }
        return newCategory;
      };
      return categories.map(processCategory);
    };

    const formatted = formatCategories(categories || []);

    formatted.forEach((parent) => {
      let parentHasMatch = false;

      if (parentSlug) {
        parent.toggle = parent.slug === parentSlug;
        parentHasMatch = parent.toggle;
      }

      parent.sub_category?.forEach((sub) => {
        let subHasMatch = false;

        if (subSlug) {
          sub.toggle = sub.slug === subSlug;
          subHasMatch = sub.toggle;
        }

        if (childSlug) {
          sub.child_category?.forEach((child) => {
            if (child.slug === childSlug) {
              child.toggle = true;
              subHasMatch = true;
              parentHasMatch = true;
            } else {
              child.toggle = false;
            }
          });
        }

        if (subSlug) {
          sub.toggle = sub.slug === subSlug;
          if (sub.toggle) parentHasMatch = true;
        } else {
          sub.toggle = subHasMatch;
        }
      });

      if (parentSlug) {
        parent.toggle = parent.slug === parentSlug;
      } else {
        parent.toggle = parentHasMatch;
      }
    });

    const matched = formatted.find((p) => p.toggle);
    setSingleCategory(matched || null);
  }, [location.search, categories, setSingleCategory]);

  const handleCategoryToggle = (level, id, parentId = null) => {
    setSingleCategory(prev => {
      // Create deep copy of the category object
      const updatedCategory = JSON.parse(JSON.stringify(prev));
      
      if (level === 'parent') {
        // Toggle only the parent category
        updatedCategory.toggle = !updatedCategory.toggle;
        
        // If parent is being unchecked, uncheck all children
        if (!updatedCategory.toggle) {
          updatedCategory.sub_category?.forEach(sub => {
            sub.toggle = false;
            sub.child_category?.forEach(child => {
              child.toggle = false;
            });
          });
        }
      } 
      else if (level === 'sub') {
        // Find and toggle the sub-category
        const subIndex = updatedCategory.sub_category?.findIndex(sub => sub.id === id);
        if (subIndex !== -1 && subIndex !== undefined) {
          updatedCategory.sub_category[subIndex].toggle = 
            !updatedCategory.sub_category[subIndex].toggle;
          
          // If sub-category is being unchecked, uncheck its children
          if (!updatedCategory.sub_category[subIndex].toggle) {
            updatedCategory.sub_category[subIndex].child_category?.forEach(child => {
              child.toggle = false;
            });
          }
          // If sub-category is being checked, ensure parent is checked
          else {
            updatedCategory.toggle = true;
          }
        }
      } 
      else if (level === 'child') {
        // Find and toggle the child category
        for (const sub of updatedCategory.sub_category || []) {
          const childIndex = sub.child_category?.findIndex(child => child.id === id);
          if (childIndex !== -1 && childIndex !== undefined) {
            sub.child_category[childIndex].toggle = 
              !sub.child_category[childIndex].toggle;
            
            // If child is being checked, ensure sub and parent are checked
            if (sub.child_category[childIndex].toggle) {
              sub.toggle = true;
              updatedCategory.toggle = true;
            }
            break;
          }
        }
      }
      
      return updatedCategory;
    });
  };

  // Calculate total stock for parent category by summing all sub-category stocks
  const parentTotalStock = singleCategory?.sub_category?.reduce((sum, sub) => {
    return sum + (sub.total_stock || 0);
  }, 0) || 0;

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

      {/* Fast Shipping Toggle */}
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

      {/* Categories Section */}
      <ToggleSection 
        title="Categories" 
        isOpen={isCategoriesOpen} 
        setIsOpen={setIsCategoriesOpen}
      ><p className="text-2xl leading-5 text-[#1748b1] font-medium cursor-pointer">  
        {singleCategory?.category_name}
        
          </p>
      </ToggleSection>
      <ToggleSection 
        title="Categories" 
        isOpen={isCategoriesOpen} 
        setIsOpen={setIsCategoriesOpen}
      >
        {singleCategory && (
          <div key={singleCategory.id}>
            {/* Parent Category Checkbox */}
            <Checkbox
              id={`parent-${singleCategory.id}`}
              label={`${singleCategory.category_name} (${parentTotalStock})`}
              toggle={singleCategory.toggle}
              onChange={() => handleCategoryToggle('parent', singleCategory.id)}
            />
            
            {/* Sub Categories */}
            {singleCategory.sub_category?.map((sub) => (
              <div key={sub.id} className="ml-4 mt-2">
                {/* Sub-category Checkbox */}
                <Checkbox
                  id={`sub-${sub.id}`}
                  label={`${sub.subcategory_name} (${sub.total_stock || 0})`}
                  toggle={sub.toggle}
                  onChange={() => handleCategoryToggle('sub', sub.id)}
                />
                
                {/* Child Categories */}
                <div className="ml-4 mt-2 space-y-2">
                  {sub.child_category?.map((child) => (
                    <Checkbox
                      key={child.id}
                      id={`child-${child.id}`}
                      label={`${child.child_category_name} (${child.total_stock || 0})`}
                      toggle={child.toggle}
                      onChange={() => handleCategoryToggle('child', child.id, sub.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ToggleSection>

      {/* Price Range Filter */}
      <PriceRange isOpen={isPriceOpen} setIsOpen={setIsPriceOpen} />

      {/* Made in USA Filter */}
      <ToggleSection title="Made in the USA" isOpen={isMadeInUSAOpen} setIsOpen={setIsMadeInUSAOpen}>
        <Checkbox id="usa" label="NO (64)" />
      </ToggleSection>

      {/* Item Type Filter */}
      <ToggleSection title="Item" isOpen={isItemOpen} setIsOpen={setIsItemOpen}>
        <Checkbox id="reducing_bushing" label="Reducing Bushing (9)" />
        <Checkbox id="bushing" label="Bushing (5)" />
        <Checkbox id="reducer" label="Reducer Bushing (2)" />
      </ToggleSection>
    </div>
  );
};

export default Filter;
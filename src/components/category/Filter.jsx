import React, { useContext, useEffect, useState, useRef } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { formatCategoryName } from "../../helper/slugifier/slugify";
import { useLocation, useSearchParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";

// Reusable ToggleSection
const ToggleSection = ({ title, children, isOpen, setIsOpen }) => (
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
    {isOpen && (
      <div className="space-y-4 pt-3 border-t-2 border-[#ECF0F9]">
        {children}
      </div>
    )}
  </div>
);

// Reusable Checkbox with proper state management
const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="peer form-checkbox text-[#3F66BC]"
        checked={checked}
        onChange={onChange}
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

const CheckboxUsa = ({ id, label }) => {
  const { isMadeUsa, setIsMadeUsa } = useProductContext();

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="peer form-checkbox text-[#3F66BC]"
        checked={isMadeUsa}
        onChange={() => setIsMadeUsa(!isMadeUsa)}
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

const PriceRange = ({ isOpen, setIsOpen }) => {
  const [activeThumb, setActiveThumb] = useState(null);
  const containerRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

  const { minPrice, setMinPrice, maxPrice, setMaxPrice, maxRangeLimit } =
    useProductContext();

  useEffect(() => {
    setMaxPrice(maxRangeLimit);
  }, [maxRangeLimit, setMaxPrice]);

  const handleMouseDown = (thumb) => {
    setActiveThumb(thumb);
  };

  const calculateValue = (clientX) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    return Math.round((percentage / 100) * maxRangeLimit);
  };

  const handleMouseMove = (e) => {
    if (!activeThumb || !containerRef.current) return;

    const newValue = calculateValue(e.clientX);

    if (activeThumb === "min") {
      const clampedValue = Math.min(newValue, maxPrice - 1);
      setMinPrice(clampedValue);
    } else {
      const clampedValue = Math.max(newValue, minPrice + 1);
      setMaxPrice(clampedValue);
    }
  };

  const handleMouseUp = () => {
    setActiveThumb(null);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMouseMove(e.touches[0]);
    }
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    const newValue = Math.min(Math.max(0, value), maxPrice - 1);
    setMinPrice(newValue);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    const newValue = Math.max(Math.min(maxRangeLimit, value), minPrice + 1);
    setMaxPrice(newValue);
  };

  const minPosition = (minPrice / maxRangeLimit) * 100;
  const maxPosition = (maxPrice / maxRangeLimit) * 100;

  return (
    <div className="p-4 w-64 bg-[#F8F9FB] border-[1.5px] border-[#ECF0F9] rounded-[8px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <h2 className="text-lg font-medium text-[#182B55] leading-6">
          Price Range
        </h2>
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
        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm text-[#182B55] font-medium mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={handleMinChange}
                className="w-full px-3 py-2 border border-[#ECF0F9] rounded-md text-[#5D6576]"
                min={0}
                max={maxPrice - 1}
              />
            </div>
            <div className="flex items-end text-[#3F66BC]">–</div>
            <div className="flex-1">
              <label className="block text-sm text-[#182B55] font-medium mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxChange}
                className="w-full px-3 py-2 border border-[#ECF0F9] rounded-md text-[#5D6576]"
                min={minPrice + 1}
                max={maxRangeLimit}
              />
            </div>
          </div>

          <div
            className="relative h-10"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#ECF0F9] rounded-full -translate-y-1/2" />

            <div
              className="absolute top-1/2 h-1 bg-blue-500 rounded-full -translate-y-1/2"
              style={{
                left: `${minPosition}%`,
                width: `${maxPosition - minPosition}%`,
              }}
            />

            <div
              ref={minThumbRef}
              className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 cursor-pointer shadow-sm"
              style={{ left: `${minPosition}%` }}
              onMouseDown={() => handleMouseDown("min")}
              onTouchStart={() => handleMouseDown("min")}
            />

            <div
              ref={maxThumbRef}
              className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 cursor-pointer shadow-sm"
              style={{ left: `${maxPosition}%` }}
              onMouseDown={() => handleMouseDown("max")}
              onTouchStart={() => handleMouseDown("max")}
            />
          </div>

          <p className="text-[#5D6576] text-[16px] font-medium">
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
  const [fastShipping, setFastShipping] = useState(false);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const { categories, singleCategory, setSingleCategory } =
    useContext(CategoryContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const parentSlug = searchParams.get("parent_category");
  const subSlug = searchParams.get("sub_category");
  const childSlug = searchParams.get("child_category");

  // Format categories with slugs and toggle states
  const formatCategories = (categories) => {
    const processCategory = (category) => {
      const name =
        category.category_name ||
        category.child_category_name ||
        category.subcategory_name ||
        "";
      const slug = `${formatCategoryName(name)}-${category.id}`;
      return {
        ...category,
        slug,
        toggle: false,
        sub_category: category.sub_category?.map(processCategory),
        child_category: category.child_category?.map(processCategory),
      };
    };
    return categories.map(processCategory);
  };

  // Initialize categories with proper toggle states based on URL params
  useEffect(() => {
    if (!categories) return;

    const formatted = formatCategories(categories);
    const withToggles = setInitialToggleStates(formatted, parentSlug, subSlug, childSlug);
    setFormattedCategories(withToggles);

    // Set the single category that matches the current selection
    const matchedParent = withToggles.find(
      (cat) => cat.slug === parentSlug || cat.sub_category?.some(sub => sub.slug === subSlug)
    );
    setSingleCategory(matchedParent || null);
  }, [categories, parentSlug, subSlug, childSlug, setSingleCategory]);

  // Set initial toggle states based on URL params
  const setInitialToggleStates = (categories, parentSlug, subSlug, childSlug) => {
    return categories.map(category => {
      // Check if this category matches parent slug
      const isParentMatch = category.slug === parentSlug;
      
      // Process sub categories
      const subCategories = category.sub_category?.map(sub => {
        const isSubMatch = sub.slug === subSlug;
        
        // Process child categories
        const childCategories = sub.child_category?.map(child => {
          return {
            ...child,
            toggle: child.slug === childSlug
          };
        });
        
        return {
          ...sub,
          toggle: isSubMatch,
          child_category: childCategories
        };
      });
      
      return {
        ...category,
        toggle: isParentMatch,
        sub_category: subCategories
      };
    });
  };

  // Handle category selection
  const handleCategorySelect = (level, category, parentCategory = null, subCategory = null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Clear all relevant params first
    if (level === "parent") {
      newSearchParams.delete("parent_category");
      newSearchParams.delete("sub_category");
      newSearchParams.delete("child_category");
    } else if (level === "sub") {
      newSearchParams.delete("sub_category");
      newSearchParams.delete("child_category");
    } else if (level === "child") {
      newSearchParams.delete("child_category");
    }

    // Set the new param if not already selected
    const currentParam = 
      level === "parent" ? newSearchParams.get("parent_category") :
      level === "sub" ? newSearchParams.get("sub_category") :
      newSearchParams.get("child_category");

    if (currentParam !== category.slug) {
      if (level === "parent") {
        newSearchParams.set("parent_category", category.slug);
      } else if (level === "sub" && parentCategory) {
        newSearchParams.set("parent_category", parentCategory.slug);
        newSearchParams.set("sub_category", category.slug);
      } else if (level === "child" && parentCategory && subCategory) {
        newSearchParams.set("parent_category", parentCategory.slug);
        newSearchParams.set("sub_category", subCategory.slug);
        newSearchParams.set("child_category", category.slug);
      }
    }

    setSearchParams(newSearchParams);
  };

  // Clear all category filters
  const clearAllFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("parent_category");
    newSearchParams.delete("sub_category");
    newSearchParams.delete("child_category");
    setSearchParams(newSearchParams);
    setSingleCategory(null);
  };

  // Remove a specific filter
  const removeFilter = (type) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (type === "parent_category") {
      newSearchParams.delete("parent_category");
      newSearchParams.delete("sub_category");
      newSearchParams.delete("child_category");
    } else if (type === "sub_category") {
      newSearchParams.delete("sub_category");
      newSearchParams.delete("child_category");
    } else if (type === "child_category") {
      newSearchParams.delete("child_category");
    }
    
    setSearchParams(newSearchParams);
  };

  // Check if a category is currently selected
  const isCategorySelected = (level, slug) => {
    return (
      (level === "parent" && parentSlug === slug) ||
      (level === "sub" && subSlug === slug) ||
      (level === "child" && childSlug === slug)
    );
  };

  return (
    <div className="w-[282px] bg-white space-y-6 h-screen lg:h-auto overflow-y-auto">
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
      
      {/* Active filters display */}
      <div className="flex flex-wrap gap-2 font-medium w-full max-w-md">
        {parentSlug && (
          <span className="flex items-center bg-[#F8F9FB] text-[#182B55] text-[12px] leading-[16px] px-3 py-2 rounded-[40px] max-w-full">
            <span className="truncate max-w-[100px]">{parentSlug}</span>
            <button
              onClick={() => removeFilter("parent_category")}
              className="ml-2 text-[#182B55] font-bold"
              aria-label="Remove parent category"
            >
              &times;
            </button>
          </span>
        )}
        {subSlug && (
          <span className="flex items-center bg-[#F8F9FB] text-[#182B55] text-[12px] leading-[16px] px-3 py-2 rounded-[40px] max-w-full">
            <span className="truncate max-w-[100px]">{subSlug}</span>
            <button
              onClick={() => removeFilter("sub_category")}
              className="ml-2 text-[#182B55] font-bold"
              aria-label="Remove sub category"
            >
              &times;
            </button>
          </span>
        )}
        {childSlug && (
          <span className="flex items-center bg-[#F8F9FB] text-[#182B55] text-[12px] leading-[16px] px-3 py-2 rounded-[40px] max-w-full">
            <span className="truncate max-w-[100px]">{childSlug}</span>
            <button
              onClick={() => removeFilter("child_category")}
              className="ml-2 text-[#182B55] font-bold"
              aria-label="Remove child category"
            >
              &times;
            </button>
          </span>
        )}
        {(parentSlug || subSlug || childSlug) && (
          <button
            onClick={clearAllFilters}
            className="text-[14px] leading-6 text-[#3F66BC] hover:underline cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

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

      {/* Parent Categories */}
      <ToggleSection
        title="Parent Categories"
        isOpen={isCategoriesOpen}
        setIsOpen={setIsCategoriesOpen}
      >
        <div className="text-[16px] leading-5 text-[#1748b1] font-medium cursor-pointer flex flex-col gap-y-4">
          {formattedCategories.map((category) => (
            <div key={category.id} className="cursor-pointer">
              <Checkbox
                id={`parent-${category.id}`}
                label={`${category.category_name} (${category.total_stock || 0})`}
                checked={isCategorySelected("parent", category.slug)}
                onChange={() => handleCategorySelect("parent", category)}
              />
            </div>
          ))}
        </div>
      </ToggleSection>

      {/* Sub Categories (only shown if a parent is selected) */}
      {parentSlug && (
        <ToggleSection
          title="Sub Categories"
          isOpen={isCategoriesOpen}
          setIsOpen={setIsCategoriesOpen}
        >
          <div className="space-y-4">
            {formattedCategories
              .find(cat => cat.slug === parentSlug)
              ?.sub_category?.map(sub => (
                <div key={sub.id} className="ml-4">
                  <Checkbox
                    id={`sub-${sub.id}`}
                    label={`${sub.subcategory_name} (${sub.total_stock || 0})`}
                    checked={isCategorySelected("sub", sub.slug)}
                    onChange={() => handleCategorySelect(
                      "sub", 
                      sub, 
                      formattedCategories.find(cat => cat.slug === parentSlug)
                    )}
                  />

                  {/* Child Categories (only shown if this sub is selected) */}
                  {subSlug === sub.slug && sub.child_category?.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {sub.child_category.map(child => (
                        <Checkbox
                          key={child.id}
                          id={`child-${child.id}`}
                          label={`${child.child_category_name} (${child.total_stock || 0})`}
                          checked={isCategorySelected("child", child.slug)}
                          onChange={() => handleCategorySelect(
                            "child", 
                            child,
                            formattedCategories.find(cat => cat.slug === parentSlug),
                            sub
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </ToggleSection>
      )}

      <ToggleSection
        title="Price"
        isOpen={isPriceOpen}
        setIsOpen={setIsPriceOpen}
      >
        <PriceRange isOpen={isPriceOpen} setIsOpen={setIsPriceOpen} />
      </ToggleSection>

      <ToggleSection
        title="Made in the USA"
        isOpen={isMadeInUSAOpen}
        setIsOpen={setIsMadeInUSAOpen}
      >
        <CheckboxUsa id="usa" label="Made in USA" />
      </ToggleSection>

      <ToggleSection title="Item" isOpen={isItemOpen} setIsOpen={setIsItemOpen}>
        <Checkbox
          id="reducing_bushing"
          label="Reducing Bushing (9)"
          checked={false}
          onChange={() => {}}
        />
        <Checkbox
          id="bushing"
          label="Bushing (5)"
          checked={false}
          onChange={() => {}}
        />
        <Checkbox
          id="reducer"
          label="Reducer Bushing (2)"
          checked={false}
          onChange={() => {}}
        />
      </ToggleSection>
    </div>
  );
};

export default Filter;
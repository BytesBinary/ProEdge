import React, { useContext, useEffect, useState, useRef } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { formatCategoryName } from "../../helper/slugifier/slugify";
import { useLocation } from "react-router-dom";
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
        className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""
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
        <h2 className="text-lg font-medium text-[#182B55] leading-6">Price Range</h2>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""
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

  const { categories, singleCategory, setSingleCategory } = useContext(CategoryContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const toggleMatchingCategories = (formatted) => {
    const parentSlug = queryParams.get("parent_category");
    const subSlug = queryParams.get("sub_category");
    const childSlug = queryParams.get("child_category");

    return formatted.map((parent) => {
      let parentHasMatch = false;

      if (parentSlug) {
        parent.toggle = parent.slug === parentSlug;
        parentHasMatch = parent.toggle;
      }

      const subCategories = parent.sub_category?.map((sub) => {
        let subHasMatch = false;

        if (subSlug) {
          sub.toggle = sub.slug === subSlug;
          subHasMatch = sub.toggle;
        }

        const childCategories = sub.child_category?.map((child) => {
          if (childSlug) {
            child.toggle = child.slug === childSlug;
            if (child.toggle) {
              subHasMatch = true;
              parentHasMatch = true;
            }
          } else {
            child.toggle = false;
          }
          return child;
        });

        if (subSlug) {
          sub.toggle = sub.slug === subSlug;
          if (sub.toggle) parentHasMatch = true;
        } else {
          sub.toggle = subHasMatch;
        }

        return {
          ...sub,
          child_category: childCategories,
          toggle: sub.toggle
        };
      });

      if (parentSlug) {
        parent.toggle = parent.slug === parentSlug;
      } else {
        parent.toggle = parentHasMatch;
      }

      return {
        ...parent,
        sub_category: subCategories,
        toggle: parent.toggle
      };
    });
  };

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

  useEffect(() => {
    if (!categories) return;

    const formatted = formatCategories(categories);
    const withToggles = toggleMatchingCategories(formatted);
    setFormattedCategories(withToggles);

    const matchedParent = withToggles.find((p) => p.toggle);
    setSingleCategory(matchedParent || null);
  }, [location.search, categories, setSingleCategory]);

  const handleCategoryToggle = (level, id, parentId = null) => {
    setFormattedCategories(prevCategories => {
      const updatedCategories = prevCategories.map(category => {
        // For parent level
        if (level === "parent") {
          const isToggled = category.id === id;
          return {
            ...category,
            toggle: isToggled,
            sub_category: category.sub_category?.map(sub => ({
              ...sub,
              toggle: false,
              child_category: sub.child_category?.map(child => ({
                ...child,
                toggle: false
              }))
            }))
          };
        }

        // For sub level
        if (level === "sub" && category.id === parentId) {
          return {
            ...category,
            sub_category: category.sub_category?.map(sub => ({
              ...sub,
              toggle: sub.id === id,
              child_category: sub.child_category?.map(child => ({
                ...child,
                toggle: false
              }))
            }))
          };
        }

        // For child level
        if (level === "child") {
          return {
            ...category,
            sub_category: category.sub_category?.map(sub => {
              if (sub.id === parentId) {
                return {
                  ...sub,
                  child_category: sub.child_category?.map(child => ({
                    ...child,
                    toggle: child.id === id
                  }))
                };
              }
              return sub;
            })
          };
        }

        return category;
      });

      // Find and set the single category that matches the toggled state
      const matchedParent = updatedCategories.find(cat => cat.toggle) ||
        updatedCategories.find(cat =>
          cat.sub_category?.some(sub => sub.toggle)
        );
      setSingleCategory(matchedParent || null);

      return updatedCategories;
    });
  };

  // Calculate total stock for parent category by summing all sub-category stocks
  const parentTotalStock = singleCategory?.sub_category?.reduce(
    (sum, sub) => sum + (sub.total_stock || 0),
    0
  ) || 0;

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
      {/* <div class="flex flex-wrap gap-2 w-[282px] font-medium">

        <span
          class="flex items-center text-[12px] leading-[16px] bg-[#F8F9FB] text-[#182B55] px-3 py-2 w-[131px] h-[32px] rounded-[40px]">
          Electric Motors
          <button class="ml-2 text-[#182B55]">&times;</button>
        </span>
        <span
          class="flex items-center text-[12px] leading-[16px] bg-[#F8F9FB] text-[#182B55] px-3 py-2 w-[131px] h-[32px] rounded-[40px]">
          Single Phase
          <button class="ml-2 text-[#182B55]">&times;</button>
        </span>
        <span
          class="flex items-center text-[12px] leading-[16px] bg-[#F8F9FB] text-[#182B55] px-3 py-2 w-[131px] h-[32px] rounded-[40px]">
          Fast Shipping
          <button class="ml-2 text-[#182B55]">&times;</button>
        </span>

        <button class="text-[16px] leading-6 text-[#3F66BC] hover:underline cursor-pointer">Clear All</button>
      </div> */}
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
                checked={category.toggle}
                onChange={() => {
                  handleCategoryToggle("parent", category.id);
                  const url = new URL(window.location.href);
                  if (category.toggle) {
                    url.searchParams.delete("parent_category");
                    url.searchParams.delete("sub_category");
                    url.searchParams.delete("child_category");
                  } else {
                    url.searchParams.set("parent_category", category.slug);
                    url.searchParams.delete("sub_category");
                    url.searchParams.delete("child_category");
                  }
                  window.history.pushState({}, "", url);
                }}
              />
            </div>
          ))}
        </div>
      </ToggleSection>

      {singleCategory && (
        <ToggleSection
          title="Sub Categories"
          isOpen={isCategoriesOpen}
          setIsOpen={setIsCategoriesOpen}
        >
          <div key={singleCategory.id}>
            {singleCategory.sub_category?.map((sub) => (
              <div key={sub.id} className="ml-4 mt-2">
                <Checkbox
                  id={`sub-${sub.id}`}
                  label={`${sub.subcategory_name} (${sub.total_stock || 0})`}
                  checked={sub.toggle}
                  onChange={() => {
                    handleCategoryToggle("sub", sub.id, singleCategory.id);
                    const url = new URL(window.location.href);
                    if (sub.toggle) {
                      url.searchParams.delete("sub_category");
                      url.searchParams.delete("child_category");
                    } else {
                      url.searchParams.set("parent_category", singleCategory.slug);
                      url.searchParams.set("sub_category", sub.slug);
                      url.searchParams.delete("child_category");
                    }
                    window.history.pushState({}, "", url);
                  }}
                />

                <div className="ml-4 mt-2 space-y-2">
                  {sub.child_category?.map((child) => (
                    <Checkbox
                      key={child.id}
                      id={`child-${child.id}`}
                      label={`${child.child_category_name} (${child.total_stock || 0
                        })`}
                      checked={child.toggle}
                      onChange={() => {
                        handleCategoryToggle("child", child.id, sub.id);
                        const url = new URL(window.location.href);
                        if (child.toggle) {
                          url.searchParams.delete("child_category");
                        } else {
                          url.searchParams.set("parent_category", singleCategory.slug);
                          url.searchParams.set("sub_category", sub.slug);
                          url.searchParams.set("child_category", child.slug);
                        }
                        window.history.pushState({}, "", url);
                      }}
                    />
                  ))}
                </div>
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
        <Checkbox id="reducing_bushing" label="Reducing Bushing (9)" checked={false} onChange={() => { }} />
        <Checkbox id="bushing" label="Bushing (5)" checked={false} onChange={() => { }} />
        <Checkbox id="reducer" label="Reducer Bushing (2)" checked={false} onChange={() => { }} />
      </ToggleSection>
    </div>
  );
};

export default Filter;
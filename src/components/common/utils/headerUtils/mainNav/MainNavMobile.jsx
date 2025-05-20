import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useProductContext } from "../../../../../context/ProductContext";

const MobileNav = ({ actionIcons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const { products } = useProductContext();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper: Levenshtein distance function
  const getLevenshteinDistance = (a = "", b = "") => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array(b.length + 1).fill(i === 0 ? 0 : i)
    );

    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] =
          a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j - 1] + 1, // replace
                matrix[i][j - 1] + 1, // insert
                matrix[i - 1][j] + 1 // delete
              );
      }
    }

    return matrix[a.length][b.length];
  };

  const performSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const results = [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const tokens = lowerCaseSearchTerm.split(/\s+/).filter(Boolean);

    products.forEach((product) => {
      const productTitle = product.title?.toLowerCase() || "";
      const childCategory =
        product.product_category?.child_category_name?.toLowerCase() || "";
      const subCategory =
        product.product_category?.subcategory_name?.toLowerCase() || "";
      const category =
        product.product_category?.category_name?.toLowerCase() || "";

      product.variation?.forEach((variation) => {
        const variationName = variation.variation_name?.toLowerCase() || "";
        const variationValue = variation.variation_value?.toLowerCase() || "";
        const skuCode = variation.sku_code?.toLowerCase() || "";
        const offerPrice = (
          variation.offer_price?.toString() || ""
        ).toLowerCase();

        const features = variation.features || [];
        const featureStrings = features.flatMap((f) => [
          f.feature_name?.toLowerCase() || "",
          f.feature_value?.toLowerCase() || "",
        ]);

        const allFields = [
          { type: "title", value: productTitle },
          { type: "child_category", value: childCategory },
          { type: "subcategory", value: subCategory },
          { type: "category", value: category },
          { type: "variation", value: variationName },
          { type: "variation_value", value: variationValue },
          { type: "sku_code", value: skuCode },
          { type: "offer_price", value: offerPrice },
          ...featureStrings.map((val) => ({ type: "feature", value: val })),
        ];

        let bestMatch = null;

        for (const token of tokens) {
          for (const field of allFields) {
            const index = field.value.indexOf(token);

            if (index !== -1) {
              bestMatch = {
                matchType: field.type,
                matchIndex: index,
                matchLength: token.length,
                token,
                fuzzy: false,
              };
              break;
            } else {
              let foundFuzzy = false;
              const maxFuzzyDistance = token.length >= 10 ? 3 : 2;

              // Make sure we attempt comparisons even if the token is longer than the field value
              const comparisonSlices =
                field.value.length >= token.length
                  ? [...Array(field.value.length - token.length + 2).keys()]
                  : [0]; // Only compare once when token is longer than field

              for (let i of comparisonSlices) {
                const substring = field.value.slice(i, i + token.length + 2); // Include some room for fuzzy matching
                const distance = getLevenshteinDistance(token, substring);

                if (distance <= maxFuzzyDistance) {
                  bestMatch = {
                    matchType: field.type,
                    matchIndex: i,
                    matchLength: token.length,
                    token,
                    fuzzy: true,
                  };
                  foundFuzzy = true;
                  break;
                }
              }

              if (foundFuzzy) break;
            }
          }
          if (bestMatch) break;
        }

        if (bestMatch) {
          results.push({
            productId: product.id,
            variationId: variation.id,
            productTitle: product.title,
            variationName: variation.variation_name,
            categoryName: product.product_category?.child_category_name,
            skuCode: variation.sku_code,
            image: variation.image || product.image,
            ...bestMatch,
          });
        }
      });
    });

    // Sort results: exact match > fuzzy match, then priority by field
    results.sort((a, b) => {
      if (a.fuzzy !== b.fuzzy) return a.fuzzy ? 1 : -1;

      const priority = [
        "variation",
        "title",
        "child_category",
        "subcategory",
        "category",
        "variation_value",
        "feature",
        "sku_code",
        "offer_price",
      ];

      const aPriority = priority.indexOf(a.matchType);
      const bPriority = priority.indexOf(b.matchType);

      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.matchIndex - b.matchIndex;
    });

    setSearchResults(results);
    setShowSearchDropdown(results.length > 0);
  };

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/auth/signin");
    setIsOpen(false);
  };

  // Navigation links data
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Products" },
    { to: "/videos", text: "Videos" },
    { to: "/tech-help", text: "TechHelp" },
    { to: "/contact-us", text: "Contact" },
  ];

  // User menu items
  const userMenuItems = [
    {
      icon: <FiUser className="w-5 h-5" />,
      text: "My Profile",
      action: () => navigate("/profile"),
    },
    {
      icon: <FiLogOut className="w-5 h-5" />,
      text: "Sign Out",
      action: handleSignOut,
    },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Nav Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
          aria-label="Menu"
        >
          {isOpen ? (
            <FiX className="w-5 h-5 text-white" />
          ) : (
            <FiMenu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#182B55]/95 backdrop-blur-sm">
          <div className="relative h-full w-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            {/* User Profile Button (Top Right) */}
            {storedUser && token && (
              <div className="absolute top-6 left-6" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {storedUser.first_name?.charAt(0)}
                    {storedUser.last_name?.charAt(0)}
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {storedUser.first_name} {storedUser.last_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {storedUser.email}
                      </p>
                    </div>
                    {userMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setIsUserMenuOpen(false);
                          setIsOpen(!isOpen);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        {item.icon}
                        {item.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Menu Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
              {/* Search Bar */}
              <form
                className="w-full max-w-md mb-8 relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  performSearch();
                }}
                ref={searchRef}
              >
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 pl-12 pr-6 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  >
                    <FiSearch className="w-5 h-5 text-white" />
                  </button>
                </div>
                {showSearchDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchResults.slice(0, 5).map((result, index) => (
                      <div
                        key={`${result.productId}-${result.variationId}-${index}`}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          const slug = result.variationName
                            ?.toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .trim()
                            .slice(0, 20)
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-");
                          navigate(
                            `/single-product/${slug}-${result.productId}`
                          );
                          setShowSearchDropdown(false);
                          setSearchTerm("");
                          setIsOpen(false);
                        }}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          {result.image && (
                            <img
                              src={`${import.meta.env.VITE_SERVER_URL}/assets/${
                                result.image.id
                              }`}
                              alt={result.variationName}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.variationName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {result.categoryName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>

              {/* Navigation Links */}
              <nav className="w-full max-w-md space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="block py-3 px-6 text-white hover:bg-white/10 rounded-full transition-colors text-center text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons - Only show if not logged in */}
              {!storedUser && !token && (
                <div className="mt-8 flex gap-4">
                  <Link
                    to="/auth/signin"
                    className="px-6 py-2 bg-white text-[#182B55] rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Footer with Cart & Fav Icons */}
            <div className="pb-8 flex flex-col items-center">
              <div className="flex gap-4 mb-4">
                {actionIcons?.map((icon, index) => (
                  <Link
                    key={index}
                    to={icon.path}
                    title={icon.alt}
                    aria-label={icon.alt}
                    className="relative w-12 h-12 flex justify-center items-center rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {icon.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold px-1.5 py-[1px] rounded-full min-w-[18px] text-center leading-none">
                        {icon.count > 99 ? "99+" : icon.count}
                      </span>
                    )}
                    {icon.icon === "cart" ? (
                      <FiShoppingCart className="w-6 h-6 text-white" />
                    ) : icon.icon === "heart" ? (
                      <FiHeart className="w-6 h-6 text-white" />
                    ) : (
                      <img src={icon.icon} alt={icon.alt} className="w-6 h-6" />
                    )}
                  </Link>
                ))}
              </div>
              <p className="text-center text-gray-300 text-sm">
                © {new Date().getFullYear()} ProEdge Tools
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;

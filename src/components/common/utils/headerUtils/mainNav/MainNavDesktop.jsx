import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import find from "../../../../../assets/icons/search.svg";
import { useProductContext } from "../../../../../context/ProductContext";

const authLinks = [
  { path: "/auth/signin", label: "Sign In" },
];

const DesktopNav = ({ actionIcons }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const { products } = useProductContext();

  const isAuthenticated = token && storedUser;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const results = [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    products.forEach((product) => {
      const productTitle = product.title?.toLowerCase() || "";
      const titleMatchIndex = productTitle.indexOf(lowerCaseSearchTerm);
      
      const categoryName = product.product_category?.child_category_name?.toLowerCase() || "";
      const categoryMatchIndex = categoryName.indexOf(lowerCaseSearchTerm);

      product.variation?.forEach((variation) => {
        const variationName = variation.variation_name?.toLowerCase() || "";
        const variationMatchIndex = variationName.indexOf(lowerCaseSearchTerm);

        let matchIndex = -1;
        if (variationMatchIndex !== -1) {
          matchIndex = variationMatchIndex;
        } else if (titleMatchIndex !== -1) {
          matchIndex = titleMatchIndex;
        } else if (categoryMatchIndex !== -1) {
          matchIndex = categoryMatchIndex;
        }

        if (matchIndex !== -1) {
          results.push({
            productId: product.id,
            variationId: variation.id,
            productTitle: product.title,
            variationName: variation.variation_name,
            categoryName: product.product_category?.child_category_name,
            image: variation.image || product.image,
            matchIndex,
            matchLength: searchTerm.length,
            matchType: variationMatchIndex !== -1 ? "variation" : 
                      titleMatchIndex !== -1 ? "title" : "category"
          });
        }
      });
    });

    results.sort((a, b) => {
      if (a.matchType === "variation" && b.matchType !== "variation") return -1;
      if (a.matchType !== "variation" && b.matchType === "variation") return 1;
      if (a.matchType === "title" && b.matchType === "category") return -1;
      if (a.matchType === "category" && b.matchType === "title") return 1;
      return a.matchIndex - b.matchIndex;
    });

    setSearchResults(results);
    setShowSearchDropdown(results.length > 0);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/products/${searchResults[0].productId}/variations/${searchResults[0].variationId}`);
    }
    setShowSearchDropdown(false);
  };

  const handleProductClick = (productId,variation_name) => {
    console.log(variation_name,"prod")
    const slug = variation_name
      ?.toLowerCase()
      .replace(/[^\w\s-]/g, "")     // Remove special characters
      .trim()                       // Trim leading/trailing spaces
      .slice(0, 20)                 // Take first 10 characters only
      .replace(/\s+/g, "-")         // Replace spaces with dashes
      .replace(/-+/g, "-");         // Replace multiple dashes with single dash
    navigate(`/single-product/${slug}-${productId}`);
    setShowSearchDropdown(false);
    setSearchTerm("");
  };

  const highlightMatch = (text, matchIndex, matchLength) => {
    if (!text || matchIndex === -1) return text;
    
    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + matchLength);
    const after = text.slice(matchIndex + matchLength);
    
    return (
      <>
        {before}
        <span className="text-blue-500 font-semibold">{match}</span>
        {after}
      </>
    );
  };

  const getMatchedText = (result) => {
    switch (result.matchType) {
      case "variation":
        return highlightMatch(
          result.variationName, 
          result.variationName.toLowerCase().indexOf(searchTerm.toLowerCase()),
          searchTerm.length
        );
      case "title":
        return highlightMatch(
          result.productTitle,
          result.productTitle.toLowerCase().indexOf(searchTerm.toLowerCase()),
          searchTerm.length
        );
      case "category":
        return highlightMatch(
          result.categoryName,
          result.categoryName.toLowerCase().indexOf(searchTerm.toLowerCase()),
          searchTerm.length
        );
      default:
        return result.variationName;
    }
  };


  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    navigate("/"); 
  };

  return (
    <>
      {/* Search Bar */}
      <form 
        role="search" 
        className="flex-1 max-w-md w-[90%] relative"
        onSubmit={handleSearchSubmit}
        ref={searchRef}
      >
        <div className="flex rounded-full bg-white overflow-hidden border border-transparent focus-within:border-blue-300">
          <input
            type="search"
            name="search"
            id="desktop-search"
            placeholder="Search products..."
            className="flex-1 px-6 py-3 text-gray-900 focus:outline-none text-base"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowSearchDropdown(true)}
          />
          <button
            type="submit"
            className="bg-[#182B55] text-white px-6 py-3 hover:bg-[#0F1F40] transition-colors flex items-center rounded-full gap-2"
          >
            <span className="hidden lg:inline">Search</span>
            <img src={find} alt="Search" className="w-6 h-6" />
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showSearchDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div
                key={`${result.productId}-${result.variationId}-${index}`}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleProductClick(result.productId, result.variationName)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  {result.image && (
                    <img 
                      src={`${import.meta.env.VITE_SERVER_URL}/assets/${result.image.id}`} 
                      alt={result.variationName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getMatchedText(result)}
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

      {/* Rest of the component remains the same */}
      {/* Auth and Icons */}
      <div className="cursor-pointer flex items-center gap-6 shrink-0">
        {isAuthenticated ? (
          <div className="relative cursor-pointer">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <span>{storedUser.first_name + " " + storedUser.last_name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Auth Links */}
            <div className="flex items-center gap-4">
              {authLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-blue-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                  {/* Add divider except after the last link */}
                  {index < authLinks.length - 1 && (
                    <div className="h-6 w-px bg-white/25"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          {actionIcons.map((icon, index) => (
            <Link
              key={index}
              to={icon.path}
              title={icon.alt}
              aria-label={icon.alt}
              className="relative w-12 h-12 flex justify-center items-center rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
            >
              {/* Notification Badge */}
              {icon.count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-sm font-semibold px-1.5 py-1 rounded-full leading-none min-w-[20px] text-center">
                  {icon.count > 99 ? "99+" : icon.count}
                </span>
              )}

              <img src={icon.icon} alt={icon.alt} className="w-6 h-6" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
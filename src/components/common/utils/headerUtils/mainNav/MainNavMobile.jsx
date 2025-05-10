import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import { useProductContext } from "../../../../../context/ProductContext";

const MobileNav = ({ actionIcons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const { products } = useProductContext();

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

  const handleProductClick = (productId, variationName) => {
    const slug = variationName
      ?.toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .slice(0, 20)
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
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

  // Navigation links data
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Products" },
    { to: "/videos", text: "Videos" },
    { to: "/tech-help", text: "TechHelp" },
    { to: "/contact-us", text: "Contact" },
  ];

  // Auth links data - conditionally show based on authentication
  const authLinks = storedUser && token
    ? []
    : [{ to: "/auth/signin", text: "Sign In" }];

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
            <FiX className="w-5 h-5" />
          ) : (
            <FiMenu className="w-5 h-5" />
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

            {/* Menu Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              {/* Search Bar */}
              <form 
                className="w-full max-w-md mb-8"
                onSubmit={handleSearchSubmit}
                ref={searchRef}
              >
                <div className="relative">
                  <input
                    type="search"
                    name="search"
                    id="mobile-search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => searchTerm && setShowSearchDropdown(true)}
                    className="w-full py-3 pl-12 pr-6 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                </div>
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
              {authLinks.length > 0 && (
                <div className="mt-8 flex gap-4">
                  {authLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={link.to}
                        className="px-6 py-2 text-white hover:text-blue-200 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.text}
                      </Link>
                      {index < authLinks.length - 1 && (
                        <div className="h-8 w-px bg-white/25"></div>
                      )}
                    </React.Fragment>
                  ))}
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
                    {/* Red Notification Bubble */}
                    {icon.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold px-1.5 py-[1px] rounded-full min-w-[18px] text-center leading-none">
                        {icon.count > 99 ? "99+" : icon.count}
                      </span>
                    )}

                    <img src={icon.icon} alt={icon.alt} className="w-6 h-6" />
                  </Link>
                ))}
              </div>
              <p className="text-center text-white/70 text-sm">
                © {new Date().getFullYear()} ProEdge Tools
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchAndAuth = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");

  // Conditionally show auth links based on authentication
  const authLinks = storedUser && token
    ? []
    : [
        { to: "/auth/signin", text: "Sign In" },
        { to: "/auth/signup", text: "Sign Up" },
      ];

  return (
    <div className="w-full lg:hidden">
      <form className="w-full mb-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full py-2 px-4 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-white"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </form>
      {authLinks.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          {authLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Link to={link.to} className="text-white hover:text-blue-200">
                {link.text}
              </Link>
              {index < authLinks.length - 1 && (
                <div className="h-6 w-px bg-white/25"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

MobileNav.SearchAndAuth = SearchAndAuth;

export default MobileNav;
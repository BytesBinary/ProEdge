import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Products" },
    { to: "/about", text: "About Us" },
    { to: "/videos", text: "Videos" },
    { to: "/tech-help", text: "TechHelp" },
    { to: "/contact-us", text: "Contact" },
  ];

  // Auth links data
  const authLinks = [
    { to: "/auth/signin", text: "Sign In" },
    { to: "/auth/signup", text: "Sign Up" },
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
              <form className="w-full max-w-md mb-8">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full py-3 pl-12 pr-6 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                </div>
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

              {/* Auth Buttons */}
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
            </div>

            {/* Footer with Cart & Fav Icons */}
            <div className="pb-8 flex flex-col items-center">
              <div className="flex gap-4 mb-4">
                <Link
                  to="/wish-list"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Wishlist"
                >
                  <FiHeart className="w-5 h-5 text-white" />
                </Link>
                <Link
                  to="/cart"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Cart"
                >
                  <FiShoppingCart className="w-5 h-5 text-white" />
                </Link>
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
  const authLinks = [
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
    </div>
  );
};

MobileNav.SearchAndAuth = SearchAndAuth;

export default MobileNav;

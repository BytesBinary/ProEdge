import React from "react";
import { Link } from "react-router-dom";
import find from "../../../../../assets/icons/search.svg"; // Updated import
import fav from "../../../../../assets/icons/favorite.svg"; // Updated import
import cart from "../../../../../assets/icons/cart.svg"; // Updated import


const authLinks = [
  { path: "/auth/signin", label: "Sign In" },
  { path: "/auth/signup", label: "Sign Up" },
];

const actionIcons = [
  { path: "/wish-list", icon: "./src/assets/icons/favorite.svg", alt: "Favorites", count: 5 },
  { path: "/cart", icon: "./src/assets/icons/cart.svg", alt: "Cart", count: 3 },
];

const DesktopNav = () => {
  return (
    <>
      {/* Search Bar */}
      <form role="search" className="flex-1 max-w-md w-[90%]">
        <div className="flex rounded-full bg-white overflow-hidden border border-transparent focus-within:border-blue-300">
          <input
            type="search"
            name="search"
            id="desktop-search"
            placeholder="Search products..."
            className="flex-1 px-6 py-3 text-gray-900 focus:outline-none text-base"
          />
          <button
            type="submit"
            className="bg-[#182B55] text-white px-6 py-3 hover:bg-[#0F1F40] transition-colors flex items-center rounded-full gap-2"
          >
            <span className="hidden lg:inline">Search</span>
            <img
              src={find}
              alt="Search"
              className="w-6 h-6"
            />
          </button>
        </div>
      </form>

      {/* Auth and Icons */}
      <div className="flex items-center gap-6 shrink-0">
        {/* Auth Links */}
        <div className="flex items-center gap-4">
          {authLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Link to={link.path} className="hover:text-blue-200 transition-colors">
                {link.label}
              </Link>
              {/* Add divider except after the last link */}
              {index < authLinks.length - 1 && (
                <div className="h-6 w-px bg-white/25"></div>
              )}
            </React.Fragment>
          ))}
        </div>

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

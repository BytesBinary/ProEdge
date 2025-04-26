
import React from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className="lg:hidden inline-block">
      <Link
        to="/wish-list"
        title="Favorites"
        aria-label="Favorites"
        className="w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
      >
        <img src="./src/assets/icons/favorite.svg" alt="Favorites" className="w-5 h-5" />
      </Link>
      <Link
        to="/cart"
        title="Cart"
        aria-label="Cart"
        className="w-10 h-10 flex justify-center items-center rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
      >
        <img src="./src/assets/icons/cart.svg" alt="Cart" className="w-5 h-5" />
      </Link>
    </div>
  );
};

const SearchAndAuth = () => {
  return (
    <>
      <form role="search" className="w-full mb-3">
        <div className="flex rounded-full bg-white overflow-hidden border border-transparent focus-within:border-blue-300">
          <input
            type="search"
            name="search"
            id="mobile-search"
            placeholder="Search products..."
            className="flex-1 px-5 py-2 text-gray-900 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-[#182B55] text-white px-4 py-2 rounded-full hover:bg-[#0F1F40] transition-colors flex items-center justify-center"
          >
            <span className="hidden lg:inline">Search</span>
            <img
              src="./src/assets/icons/search.svg"
              alt="Search"
              className="w-5 h-5 ml-2"
            />
          </button>
        </div>
      </form>
      <div className="flex items-center gap-4">
        <Link to="/auth/signin" className="hover:text-blue-200 transition-colors">
          Sign In
        </Link>
        <div className="h-6 w-px bg-white/25"></div>
        <Link to="/auth/signup" className="hover:text-blue-200 transition-colors">
          Sign Up
        </Link>
      </div>
    </>
  );
};

MobileNav.SearchAndAuth = SearchAndAuth;

export default MobileNav;

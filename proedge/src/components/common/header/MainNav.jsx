import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (

      <nav
        className="bg-[#182B55] text-white md:py-4"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-between gap-4 py-4 px-4 md:px-8">
          {/* <!-- Left: Logo & Mobile Icons --> */}
          <div className="flex w-full lg:w-auto justify-between items-center gap-2">
            {/* <!-- Logo --> */}
            <a href="/" className="flex items-center shrink-0">
              <img
                src="./src/assets/ProEdgeLogo.png"
                alt="ProEdge Logo"
                className="h-8 md:h-9 w-auto"
                loading="lazy"
              />
            </a>

            {/* <!-- Mobile Icons (Favorites, Cart) --> */}
            <div className="lg:hidden inline-block">
              <Link
                to="/wish-list"
                title="Favorites"
                aria-label="Favorites"
                className="w-10 h-10 flex justify-center items-center rounded-full mb-4 bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
              >
                <img
                  src="./src/assets/icons/favorite.svg"
                  alt="Favorites"
                  className="w-5 h-5"
                />
              </Link>
              <Link
                to="/cart"
                title="Cart"
                aria-label="Cart"
                className="w-10 h-10 flex justify-center items-center rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
              >
                <img
                  src="./src/assets/icons/cart.svg"
                  alt="Cart"
                  className="w-5 h-5"
                />
              </Link>
            </div>
          </div>

          {/* <!-- Search (Mobile) --> */}
          <div className="w-full lg:hidden">
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
            {/* <!-- Auth --> */}
            <div className="flex items-center gap-4">
              <Link to="/auth/signin" className="hover:text-blue-200 transition-colors">
                Sign In
              </Link>
              <div className="h-6 w-px bg-white/25"></div>
              <Link to="/auth/signup" className="hover:text-blue-200 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          {/* <!-- Desktop Content --> */}
          <div className="hidden lg:flex w-3/4 items-center justify-between gap-6">
            {/* <!-- Search Bar --> */}
            <form role="search" className="flex-1 max-w-2xl w-[90%]">
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
                    src="./src/assets/icons/search.svg"
                    alt="Search"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </form>

            {/* <!-- Auth & Actions --> */}
            <div className="flex items-center gap-6 shrink-0">
              {/* <!-- Auth --> */}
              <div className="flex items-center gap-4">
                <Link to="/auth/signin" className="hover:text-blue-200 transition-colors">
                  Sign In
                </Link>
                <div className="h-6 w-px bg-white/25"></div>
                <Link to="/auth/signup" className="hover:text-blue-200 transition-colors">
                  Sign Up
                </Link>
              </div>

              {/* <!-- Icons --> */}
              <div className="flex items-center gap-3">
                <Link
                  title="Favorites"
                  to="/wish-list"
                  aria-label="Favorites"
                  className="w-12 h-12 flex justify-center items-center rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
                >
                  <img
                    src="./src/assets/icons/favorite.svg"
                    alt="Favorites"
                    className="w-6 h-6"
                  />
                </Link>
                <Link
                  title="Cart"
                  to="/cart"
                  aria-label="Cart"
                  className="w-12 h-12 flex justify-center items-center rounded-full bg-[#23366B] hover:bg-[#1A2A55] transition-colors"
                >
                  <img
                    src="./src/assets/icons/cart.svg"
                    alt="Cart"
                    className="w-6 h-6"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default MainNav;

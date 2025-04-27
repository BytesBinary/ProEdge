import React from "react";
import MobileNav from "./mainNav/MainNavMobile"; // Updated import
import DesktopNav from "./mainNav/MainNavDesktop";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="bg-[#182B55] text-white md:py-4" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-between gap-4 py-4 px-4 md:px-8">
        {/* Logo and Mobile Icons */}
        <div className="flex w-full lg:w-auto justify-between items-center gap-2">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="./src/assets/ProEdgeLogo.png"
              alt="ProEdge Logo"
              className="h-8 w-auto"
              loading="lazy"
            />
          </Link>
          <MobileNav />
        </div>
        
        <div className="hidden lg:flex w-3/4 items-center justify-between gap-2">
          <DesktopNav />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
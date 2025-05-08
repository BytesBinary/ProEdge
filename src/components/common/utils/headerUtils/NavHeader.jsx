import React from "react";
import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <header className="p-4 bg-[#FFFFFF]">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between text-[#182B55] px-4 md:px-8 text-xs md:text-lg">
        <span>Welcome to Our Online Store!</span>
        <Link to="/tech-help" className="hidden md:block">
          Frequently Asked Questions?
        </Link>  
        <Link to="/tech-help" className="block md:hidden">
          FAQ?
        </Link>
      </div>
    </header>
  );
};

export default NavHeader;

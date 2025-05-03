import React from "react";
import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <header className="p-4 bg-[#FFFFFF]">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between text-[#182B55] px-8">
        <span>Welcome to Our Online Store!</span>
        <Link to="#" className="hidden md:block">
          Frequently Asked Questions?
        </Link>  
        <Link to="#" className="block md:hidden">
          FAQ?
        </Link>
      </div>
    </header>
  );
};

export default NavHeader;

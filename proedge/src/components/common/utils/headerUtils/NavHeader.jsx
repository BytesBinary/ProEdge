import React from "react";

const NavHeader = () => {
  return (
    <header className="p-4 bg-[#FFFFFF]">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between text-[#182B55] px-8">
        <span>Welcome to Our Online Store!</span>
        <a href="#" className="hidden md:block">
          Frequently Asked Questions?
        </a>  
        <a href="#" className="block md:hidden">
          FAQ?
        </a>
      </div>
    </header>
  );
};

export default NavHeader;

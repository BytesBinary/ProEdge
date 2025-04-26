import React from "react";
import { Link } from "react-router-dom";
const NavigationLink = () => {
  return (
    <ul className="flex justify-evenly items-center gap-5 md:gap-6 w-full text-sm md:text-lg lg:text-xl text-[#5D6576] font-semibold">
      <li>
        <Link
          to="/"
          className="relative hover:text-[#3F66BC] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#3F66BC] hover:after:w-full after:transition-all after:duration-300"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          className="relative hover:text-[#3F66BC] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#3F66BC] hover:after:w-full after:transition-all after:duration-300"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/videos"
          className="relative hover:text-[#3F66BC] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#3F66BC] hover:after:w-full after:transition-all after:duration-300"
        >
          Videos
        </Link>
      </li>
      <li>
        <Link
          to="/tech-help"
          className="relative hover:text-[#3F66BC] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#3F66BC] hover:after:w-full after:transition-all after:duration-300"
        >
          Tech Help
        </Link>
      </li>
      <li>
        <Link
          to="/contact-us"
          className="relative hover:text-[#3F66BC] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#3F66BC] hover:after:w-full after:transition-all after:duration-300"
        >
          Contact Us
        </Link>
      </li>
    </ul>
  );
};

export default NavigationLink;

import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/videos", label: "Videos" },
  { path: "/tech-help", label: "Tech Help" },
  { path: "/contact-us", label: "Contact Us" },
];

const NavigationLink = () => {
  return (
    <ul className="hidden lg:flex justify-evenly items-center gap-5 md:gap-6 w-full text-sm md:text-lg lg:text-xl text-[#5D6576] font-semibold">
      {navLinks.map((link, index) => (
        <li key={index}>
          <Link
            to={link.path}
            className="relative hover:text-[#3F66BC] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#3F66BC] hover:after:w-full after:transition-all after:duration-300"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationLink;

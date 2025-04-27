import React from "react";
import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import BrowseProduct from "./BrowseProduct";
import CallIcon from "../../../../assets/icons/CallIcon.jsx";

const Navfooter = () => {
  return (
    <nav aria-label="Secondary navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="flex flex-row items-center justify-between gap-4">

          {/* Left Section - Browse Products */}
          <BrowseProduct />

          {/* Center Section - Navigation Links */}
          <NavigationLink />
          
          {/* Right Section - Call Button */}
            <Link
              to="tel:2364612622"
              className="inline-flex items-center justify-center w-full max-w-xs gap-2 px-4 py-3 md:px-6 md:py-4 rounded-full bg-[#3F66BC] text-white hover:bg-[#182B55] transition-colors text-sm md:text-lg whitespace-nowrap"
              aria-label="Call us at 236-461-2622"
            >
              <CallIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>(236) 461-2622</span>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navfooter;

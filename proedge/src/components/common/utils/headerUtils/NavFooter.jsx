import React from "react";
import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import BrowseProduct from "./BrowseProduct";
import CallIcon from "../../../../assets/icons/CallIcon.jsx";

const Navfooter = () => {
  return (
    <nav aria-label="Secondary navigation">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-2 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">

          {/* Mobile Top Row - Browse + Call */}
          <div className="flex w-full md:w-auto items-center justify-between gap-2 md:hidden">
            <BrowseProduct />
            <Link
              to="tel:2364612622"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[#3F66BC] text-white hover:bg-[#182B55] transition-colors text-sm whitespace-nowrap"
              aria-label="Call us at 236-461-2622"
            >
              <CallIcon className="w-4 h-4" />
              <span className="sr-only md:not-sr-only">Call</span>
            </Link>
          </div>

          {/* Desktop Left Section - Browse Products */}
          <div className="hidden md:block">
            <BrowseProduct />
          </div>

          {/* Center Section - Navigation Links */}
          <div className="w-full md:w-auto">
            <NavigationLink />
          </div>
          
          {/* Desktop Right Section - Call Button */}
          <div className="hidden md:block">
            <Link
              to="tel:2364612622"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-full bg-[#3F66BC] text-white hover:bg-[#182B55] transition-colors text-sm md:text-lg whitespace-nowrap"
              aria-label="Call us at 236-461-2622"
            >
              <CallIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>(236) 461-2622</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navfooter;
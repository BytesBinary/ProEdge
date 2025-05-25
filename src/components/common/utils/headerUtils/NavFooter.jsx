import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import BrowseProduct from "./BrowseProduct";
import CallIcon from "../../../../assets/icons/CallIcon.jsx";
import axios from "axios";

const Navfooter = () => {
  const [footer, setFooter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ALL_FOOTER_QUERY = `
  query{
    footer{
  
      phone_no
  
    }
  }
  `;
  const fetchFooter = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: ALL_FOOTER_QUERY,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      setFooter(response.data.data.footer || []);
    } catch (error) {
      console.error("GraphQL fetch error:", error);
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const hasFetched = useRef(false);

  useEffect(() => {

  if (!hasFetched.current) {
    fetchFooter();
    hasFetched.current = true;
  }
}, []);
  // console.log(footer, 'fromfooter')

  return (
    <nav aria-label="Secondary navigation">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-2 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <div className="flex w-full md:w-auto items-center justify-between gap-2 md:hidden">
            <BrowseProduct />
            <Link
              to={`tel:${footer?.phone_no}`}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[#3F66BC] text-white hover:bg-[#182B55] transition-colors text-sm whitespace-nowrap"
              aria-label={`Call us at ${footer?.phone_no}`}
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
              to={`tel:${footer?.phone_no}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-full bg-[#3F66BC] text-white hover:bg-[#182B55] transition-colors text-sm md:text-lg whitespace-nowrap"
              aria-label={`Call us at ${footer?.phone_no}`}
            >
              <CallIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{footer?.phone_no}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navfooter;

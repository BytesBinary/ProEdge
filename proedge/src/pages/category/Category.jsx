import React from "react";
import { useState } from "react";
import Filter from "../../components/category/Filter";
import Card from "../../components/category/Card";
import Pagination from "../../components/category/Pagination";
import { IoFilterSharp } from "react-icons/io5";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto mt-3 md:mt-20 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Filter Section */}
        <div className="hidden lg:block">
          <Filter />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-around md:justify-between items-center">
            <div className=" md:hidden bg-[#F8F9FB] border border-[#F8F9FB] rounded-[42px] px-6 py-3 pr-8 text-md leading-4 font-medium text-[#182B55] inline-flex gap-2">
            <IoFilterSharp /> <span>Filter</span>
            </div>
            <h1 className="hidden md:block">Showing 23 items</h1>
            <div className="max-w-80 flex">
              <div className="bg-[#F8F9FB] hidden  border-2 border-[#ECF0F9] rounded-[42px] w-24 h-12 py-3 px-5 mx-auto lg:mx-0 md:flex items-center justify-around">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_448_4569)">
                    <path
                      d="M14.5796 1.59766C13.6412 1.61225 12.7233 1.8742 11.9185 2.35705C11.1138 2.8399 10.4507 3.52655 9.99622 4.34766C9.54175 3.52655 8.87867 2.8399 8.07392 2.35705C7.26917 1.8742 6.35126 1.61225 5.41289 1.59766C3.91701 1.66265 2.50764 2.31703 1.49271 3.41785C0.477771 4.51867 -0.060237 5.97643 -0.00377825 7.47266C-0.00377825 11.2618 3.98456 15.4002 7.32956 18.206C8.0764 18.8336 9.02068 19.1777 9.99622 19.1777C10.9718 19.1777 11.916 18.8336 12.6629 18.206C16.0079 15.4002 19.9962 11.2618 19.9962 7.47266C20.0527 5.97643 19.5147 4.51867 18.4997 3.41785C17.4848 2.31703 16.0754 1.66265 14.5796 1.59766Z"
                      fill="#EE2738"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_448_4569">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h2 className="text-[#182B55] font-medium text-xl leading-6">
                  10
                </h2>
              </div>
              <div className="relative inline-block">
                <select className="appearance-none bg-[#F8F9FB] border border-[#F8F9FB] rounded-[42px] px-6 py-3 pr-8 text-md md:text-lg leading-4 md:leading-6 font-medium text-[#182B55] focus:outline-none">
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Most Popular</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={9}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Category;
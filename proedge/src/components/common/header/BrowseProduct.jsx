import React from "react";
import { Link } from "react-router-dom";
const BrowseProduct = () => {
  return (
    <>
      <div className="relative group w-full md:w-full lg:w-[434px] ">
        {/* <!-- Hover Button --> */}
        <button className="w-full px-5 py-4 bg-[#182B55] text-white rounded-full flex justify-between items-center gap-2">
          {/* <!-- Left Icon --> */}
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_612_4015)">
              <path
                d="M0 3.5C0 2.67 0.67 2 1.5 2H17.5C18.33 2 19 2.67 19 3.5C19 4.33 18.33 5 17.5 5H1.5C0.67 5 0 4.33 0 3.5ZM17.5 18H1.5C0.67 18 0 18.67 0 19.5C0 20.33 0.67 21 1.5 21H17.5C18.33 21 19 20.33 19 19.5C19 18.67 18.33 18 17.5 18ZM22.5 10H6.5C5.67 10 5 10.67 5 11.5C5 12.33 5.67 13 6.5 13H22.5C23.33 13 24 12.33 24 11.5C24 10.67 23.33 10 22.5 10Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_612_4015">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          {/* <!-- Text --> */}
          <span className="text-md md:text-lg lg:text-xl font-semibold">
            Browse Products
          </span>

          {/* <!-- Down Arrow --> */}
          <svg
            width="18"
            height="9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.6262 0.371131C17.5067 0.253532 17.3645 0.160191 17.2078 0.0964931C17.0512 0.0327948 16.8831 0 16.7134 0C16.5437 0 16.3757 0.0327948 16.219 0.0964931C16.0624 0.160191 15.9202 0.253532 15.8007 0.371131L9.91275 6.11755C9.79324 6.23515 9.65106 6.32849 9.4944 6.39219C9.33774 6.45589 9.16971 6.48869 9 6.48869C8.83029 6.48869 8.66226 6.45589 8.5056 6.39219C8.34894 6.32849 8.20676 6.23515 8.08724 6.11755L2.19934 0.371131C2.07983 0.253532 1.93765 0.160191 1.78099 0.0964931C1.62433 0.0327948 1.4563 0 1.28659 0C1.11688 0 0.948846 0.0327948 0.792188 0.0964931C0.635529 0.160191 0.493344 0.253532 0.373834 0.371131C0.134395 0.606211 0 0.924211 0 1.25568C0 1.58715 0.134395 1.90515 0.373834 2.14023L6.27459 7.8992C6.99773 8.60408 7.97797 9 9 9C10.022 9 11.0023 8.60408 11.7254 7.8992L17.6262 2.14023C17.8656 1.90515 18 1.58715 18 1.25568C18 0.924211 17.8656 0.606211 17.6262 0.371131Z"
              fill="white"
            />
          </svg>
        </button>

        {/* <!-- Bridge --> */}
        <div className="absolute top-full left-0 w-full h-2 md:h-7 z-40"></div>
        {/* <!-- Dropdown --> */}
        <div className="absolute top-full -translate-x-5 mt-2 md:mt-7 w-full md:w-[800px] mt-2 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
          <div className="bg-white rounded-xl shadow-xl py-6 pr-6">
            <div className="flex flex-col lg:flex-row min-h-[400px]">
              {/* <!-- Left Panel --> */}
              <div className="lg:w-3/7 border-r border-gray-200">
                <h3 className="text-3xl p-6 font-bold text-[#182B55]">
                  Shop Categories
                </h3>
                <nav className="space-y-2">
                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group w-full">
                    <div className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="./src/assets/category/category1.png"
                            alt="Air Treatment Systems"
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="text-[#182B55] font-medium group-hover/item:text-white">
                            Air Treatment Systems
                          </span>
                        </div>
                        <svg
                          className="text-[#182B55] group-hover/item:text-white transition-colors"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1206 11.7108L14.4106 7.41079C14.7831 7.03607 14.9922 6.52916 14.9922 6.00079C14.9922 5.47242 14.7831 4.96552 14.4106 4.59079L10.1206 0.290792C9.93324 0.104541 9.67979 -2.32212e-07 9.4156 -2.4376e-07C9.15142 -2.55308e-07 8.89796 0.104541 8.7106 0.290792C8.61687 0.383755 8.54248 0.494356 8.49171 0.616215C8.44094 0.738075 8.4148 0.86878 8.4148 1.00079C8.4148 1.1328 8.44094 1.26351 8.49171 1.38537C8.54248 1.50723 8.61687 1.61783 8.7106 1.71079L12.0006 5.00079L1.0006 5.00079C0.735386 5.00079 0.481031 5.10615 0.293495 5.29369C0.105959 5.48122 0.000602471 5.73558 0.00060246 6.00079C0.000602448 6.26601 0.105959 6.52036 0.293495 6.7079C0.481031 6.89544 0.735386 7.00079 1.0006 7.00079L12.0006 7.00079L8.7106 10.2908C8.5223 10.4778 8.41598 10.7319 8.41505 10.9973C8.41411 11.2626 8.51862 11.5175 8.7056 11.7058C8.89258 11.8941 9.1467 12.0004 9.41207 12.0014C9.67743 12.0023 9.9323 11.8978 10.1206 11.7108Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Add other categories as needed --> */}
                </nav>
              </div>

              {/* <!-- Right Panel --> */}
              <div className="lg:w-4/7 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold w-[365px] text-[#182B55]">
                    Electric Motors & Motor Controls
                  </h2>
                  <a
                    href="#"
                    className="text-[#3F66BC] text-md w-[100px] hover:text-[#2E4A8E] transition-colors"
                  >
                    Shop All
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Contactors
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>Shop All</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>2-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>3-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(18)</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Contactors
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>Shop All</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>2-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>3-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(18)</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Contactors
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>Shop All</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>2-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>3-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(18)</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Contactors
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>Shop All</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>2-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(3)</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
                        >
                          <span>3-Pole</span>
                          <span className="text-[#3F66BC] text-sm">(18)</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Repeat similar blocks for Electric Motors, Magnetic Starters, Soft Starts, etc. --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseProduct;

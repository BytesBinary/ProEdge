import React from 'react';
import PriceCard from './PriceCard';

const ProductInfo = () => {
  return (
    <div className="w-full lg:max-w-lg flex flex-col justify-between items-start gap-6 lg:gap-0 p-2 lg:p-0">
      {/* Product Details */}
      <div className="text-lg leading-7 text-blue-600 font-medium flex flex-col justify-between gap-4 lg:gap-0">
        <h1 className="text-xl lg:text-2xl leading-7 lg:leading-9 text-blue-900">
          EMZ 3.7 HP Electric Motor, 56 Frame, 3450 RPM, 1-Phase, 230VAC
        </h1>
        <h3 className="text-base lg:text-lg">SKU: EM4</h3>
        <h3 className="text-base lg:text-lg">Visit the controls pro Store</h3>
        <div className="text-sm lg:text-base leading-6 flex flex-wrap justify-evenly lg:justify-between items-center gap-2">
          <p className="font-semibold">4.9</p>
          <div className="flex items-center">
            <span className="text-yellow-500">⭐</span>
            <span className="text-yellow-500">⭐</span>
            <span className="text-yellow-500">⭐</span>
            <span className="text-yellow-500">⭐</span>
            <span className="text-yellow-500">⭐</span>
          </div>
          <svg
            className="hidden lg:block"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5975 8.00822C15.5201 7.93011 15.4279 7.86811 15.3264 7.82581C15.2248 7.7835 15.1159 7.76172 15.0059 7.76172C14.8959 7.76172 14.7869 7.7835 14.6854 7.82581C14.5838 7.86811 14.4917 7.93011 14.4142 8.00822L10.5975 11.8249C10.5201 11.903 10.4279 11.965 10.3263 12.0073C10.2248 12.0496 10.1159 12.0714 10.0059 12.0714C9.89586 12.0714 9.78694 12.0496 9.68539 12.0073C9.58384 11.965 9.49167 11.903 9.4142 11.8249L5.59754 8.00822C5.52007 7.93011 5.4279 7.86811 5.32635 7.82581C5.2248 7.7835 5.11588 7.76172 5.00587 7.76172C4.89586 7.76172 4.78694 7.7835 4.68539 7.82581C4.58384 7.86811 4.49167 7.93011 4.4142 8.00822C4.25899 8.16435 4.17188 8.37556 4.17188 8.59572C4.17188 8.81587 4.25899 9.02708 4.4142 9.18322L8.2392 13.0082C8.70795 13.4764 9.34337 13.7394 10.0059 13.7394C10.6684 13.7394 11.3038 13.4764 11.7725 13.0082L15.5975 9.18322C15.7527 9.02708 15.8399 8.81587 15.8399 8.59572C15.8399 8.37556 15.7527 8.16435 15.5975 8.00822Z"
              fill="#3F66BC"
            />
          </svg>
          <p className="border-l-2 h-5 px-2">120 ratings</p>
        </div>
        <div className="bg-blue-600 w-full lg:max-w-xs h-8 relative overflow-hidden flex items-center justify-center text-white text-sm font-medium">
          <div className="bg-white w-16 h-16 absolute right-0 transform translate-y-4 translate-x-11 rotate-45"></div>
          <div className="absolute left-4 md:left-3 z-10 font-bold text-sm leading-5">
            Pro - Edge’s <span className="text-yellow-400">Choice</span>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex flex-col justify-between gap-4 lg:gap-0">
        <div className="flex items-center justify-start lg:justify-between text-lg text-blue-900">
          <span>$</span>&nbsp;
          <h1 className="text-3xl lg:text-4xl font-medium">230</h1>&nbsp;<span>45</span>
        </div>
        <div>
          <p className="text-lg lg:text-xl">
            <span className="font-medium text-blue-600">Typical price: </span>
            <span className="text-gray-500 line-through"> $250.99</span>
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <p className="text-sm lg:text-base">
              <span className="text-gray-500">Get Fast, </span>
              <span className="font-medium text-blue-900 mr-2">Free Shipping on Orders Over $500.</span>
            </p>
            <div className="flex items-center">
              <span className="text-blue-600 font-medium text-sm lg:text-base">Details</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5975 8.00822C15.5201 7.93011 15.4279 7.86811 15.3264 7.82581C15.2248 7.7835 15.1159 7.76172 15.0059 7.76172C14.8959 7.76172 14.7869 7.7835 14.6854 7.82581C14.5838 7.86811 14.4917 7.93011 14.4142 8.00822L10.5975 11.8249C10.5201 11.903 10.4279 11.965 10.3263 12.0073C10.2248 12.0496 10.1159 12.0714 10.0059 12.0714C9.89586 12.0714 9.78694 12.0496 9.68539 12.0073C9.58384 11.965 9.49167 11.903 9.4142 11.8249L5.59754 8.00822C5.52007 7.93011 5.4279 7.86811 5.32635 7.82581C5.2248 7.7835 5.11588 7.76172 5.00587 7.76172C4.89586 7.76172 4.78694 7.7835 4.68539 7.82581C4.58384 7.86811 4.49167 7.93011 4.4142 8.00822C4.25899 8.16435 4.17188 8.37556 4.17188 8.59572C4.17188 8.81587 4.25899 9.02708 4.4142 9.18322L8.2392 13.0082C8.70795 13.4764 9.34337 13.7394 10.0059 13.7394C10.6684 13.7394 11.3038 13.4764 11.7725 13.0082L15.5975 9.18322C15.7527 9.02708 15.8399 8.81587 15.8399 8.59572C15.8399 8.37556 15.7527 8.16435 15.5975 8.00822Z"
                  fill="#3F66BC"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Size and Price Cards */}
      <div className="w-full flex flex-col justify-between gap-4 lg:gap-0">
        <div className="text-lg lg:text-xl">
          <span className="text-gray-500">Size:</span>
          <span className="text-blue-600 font-semibold">3.7 HP, 56 Frame</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <PriceCard title="2 HP, 56 Frame" price="190.99" originalPrice="220.99" />
          <PriceCard title="3 HP, 56 Frame" price="210.99" originalPrice="240.99" />
          <PriceCard title="3.7 HP, 56 Frame" price="230.99" originalPrice="260.99" />
          <PriceCard title="5 HP, 56 Frame" price="250.99" originalPrice="280.99" />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
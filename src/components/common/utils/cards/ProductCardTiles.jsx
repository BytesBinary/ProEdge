import React, { useContext } from "react";
import plus from "../../../../assets/icons/plus.svg"
import minus from "../../../../assets/icons/minus.svg"
import { CartContext } from "../../../../context/CartContext";
import { formatNumberWithCommas } from "../../../../helper/localPrice/localeprice";

const ProductCard = ({ product,onRemove  }) => {

  // console.log(onRemove, 'product')
   const { 
    IncrementQuantity,
    DecrementQuantity,
    } = useContext(CartContext);
    console.log(product,"cartproduct")
  return (
    <article className="bg-white p-3 sm:p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-start gap-3 sm:gap-4">
      {/* {console.log(product)} */}
      <img
        src={`${import.meta.env.VITE_SERVER_URL}/assets/${product.image}`}
        alt={product.name}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
      />

      <div className="details flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-[#3F66BC] font-medium text-sm sm:text-base">
            {product.variation_name}
          </h2>

          <div className="flex items-center gap-1 sm:gap-2 order-last sm:order-none">
            <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#F8F9FB] rounded-md text-lg cursor-pointer hover:bg-gray-200" onClick={()=>{DecrementQuantity(product.variationId)}}>
              <img src={minus} alt="Minus Icon" />
            </button>
            <span  className="bg-[#3F66BC] text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md text-sm sm:text-base">
              {product.quantity}
            </span>
            <button onClick={()=>{IncrementQuantity(product.variationId)}} className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#F8F9FB] rounded-md text-lg cursor-pointer hover:bg-gray-200">
              <img src={plus} alt="Plus Icon" />
            </button>
          </div>

          <span className="text-lg sm:text-xl font-semibold text-gray-800">
            <span className="align-super text-xs sm:text-sm">$</span>
            {formatNumberWithCommas((product.offer_price||product.price)*product.quantity)}
            {/* <span className="align-super text-xs sm:text-sm">{product.priceCents}</span> */}
          </span>
        </div>

        <p className="text-[#018C01] font-semibold text-lg mt-1 sm:mt-2">
          {product.stock >0? "In Stock" : "Out of Stock"}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-4">
            <span>SKU: {product.sku}</span>
            <span className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-4 before:bg-[#ECF0F9]">
              {product.shippingInfo}
            </span>
          </div>

          <nav className="flex gap-3 text-xs sm:text-sm">
            <button onClick={onRemove}className="text-[#3F66BC] hover:underline cursor-pointer">Remove</button>
          </nav>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

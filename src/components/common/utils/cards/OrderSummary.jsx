import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "../../../../helper/localPrice/localeprice";
import { BsCurrencyDollar } from "react-icons/bs";

const OrderSummaryCard = ({ cart }) => {
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  console.log(cart.shipping, "cart");

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(shippingcharge,"shipping")
  useEffect(() => {
    if (location.pathname === "/cart/checkout") {
      setIsCheckoutPage(true);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-[#182B55] mb-4">
        Order Summary
      </h2>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between">
          <span>Subtotal </span>
          <span className="flex items-center gap-x-1">
            <BsCurrencyDollar />
            {formatNumberWithCommas(cart.subtotal.toFixed(2))}
          </span>
        </li>
        <li className="flex justify-between text-[#5D6576]">
          <span>Shipping</span>
          <span className="flex items-center gap-x-1">
            <BsCurrencyDollar />
            {formatNumberWithCommas(cart.shipping.toFixed(2))}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Tax</span>
          <span className="flex items-center gap-x-1">
            <BsCurrencyDollar />
            {formatNumberWithCommas(cart.tax.toFixed(2))}
          </span>
        </li>
      </ul>

      <div className="my-3 border-1 border-[#ECF0F9]"></div>

      <div className="flex items-center justify-between font-bold text-lg text-[#182B55]">
        <span className="text-[#5D6576]">Total</span>
        <span className="flex items-center gap-x-1">
          <BsCurrencyDollar />
          {formatNumberWithCommas(cart.total.toFixed(2))}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {!isCheckoutPage && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() =>
                navigate("/cart/checkout", { state: { proceedAsGuest: false } })
              }
              className="w-full bg-[#3F66BC] text-white py-2 rounded-full hover:bg-[#3457a4] transition-colors duration-200 cursor-pointer"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() =>
                navigate("/cart/checkout", { state: { proceedAsGuest: true } })
              }
              className="w-full border border-[#3F66BC] text-[#3F66BC] py-2 rounded-full hover:bg-[#3F66BC] hover:text-white transition-colors duration-200"
            >
              Checkout as Guest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryCard;

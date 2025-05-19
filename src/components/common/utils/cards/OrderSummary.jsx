import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../../../context/OrderContext";
import { formatNumberWithCommas } from "../../../../helper/localPrice/localeprice";

const OrderSummaryCard = ({ cart }) => {
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  const [shippingCharge, setdShippingCharge] = useState(0);

  const { fetchSettingsGraphQL } = useOrderContext();

  // Add safe navigation with default values
  const itemsCount = cart?.itemsCount || 0;
  const subtotal = cart?.subtotal || 0;
  const shipping = parseInt(shippingCharge?.shipping_charge )|| 0;
  const tax = cart?.tax || 0;
  const shippingcharge=subtotal>500? 0:shipping;
  const total = cart?.total+shippingcharge+tax || 0;

  const navigate = useNavigate();
  const location = useLocation();


  // console.log(shippingcharge,"shipping")
  useEffect(() => {
    if (location.pathname === "/cart/checkout") {
      setIsCheckoutPage(true);
    }
  }, []);


  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const data = await fetchSettingsGraphQL();
        setdShippingCharge(data);
      } catch (error) {
        console.error("Error fetching delivery location data:", error);
      }
    };

    fetchDeliveryData();
  }, [fetchSettingsGraphQL]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-[#182B55] mb-4">
        Order Summary
      </h2>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between">
          <span>Subtotal </span>
          <span>${formatNumberWithCommas(subtotal.toFixed(2))}</span>
        </li>
        <li className="flex justify-between text-[#5D6576]">
          <span>Shipping</span>
          <span>${formatNumberWithCommas(shippingcharge.toFixed(2))}</span>
        </li>
        <li className="flex justify-between">
          <span>Tax</span>
          <span>${formatNumberWithCommas(tax.toFixed(2))}</span>
        </li>
      </ul>

      <div className="my-3 border-1 border-[#ECF0F9]"></div>

      <div className="flex justify-between font-bold text-lg text-[#182B55]">
        <span className="text-[#5D6576]">Total</span>
        <span>${formatNumberWithCommas(total.toFixed(2))}</span>
      </div>

      <div className="mt-6 space-y-3">
        {!isCheckoutPage && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/cart/checkout")}
              className="w-full bg-[#3F66BC] text-white py-2 rounded-full hover:bg-[#3457a4] transition-colors duration-200 cursor-pointer"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/cart/checkout?guest=true")}
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

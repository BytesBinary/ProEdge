import React, { useContext, useEffect, useState } from "react";
import OrderDetailsModal from "../../components/order/OrderDetails";
import { useOrderContext } from "../../context/OrderContext";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { PulseLoader } from "react-spinners";

const OrderDetailsPage = () => {
  const [singleOrderData, setSingleOrderData] = useState(null);
  const [isOrderDetailsPage, setIsOrderDetailsPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const { clearCart } = useContext(CartContext);

  const { fetchOrderById } = useOrderContext();
  console.log(params, "params");
  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    setIsOrderDetailsPage(true);
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const order = await fetchOrderById(params.orderid);
        setSingleOrderData(order);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.orderid) {
      fetchOrderDetails();
    }
  }, []);
  console.log(singleOrderData, "singleOrderData");

  if (loading) {
    <div className="fixed inset-0 flex items-center justify-center bg-white z-40">
      <PulseLoader color="#3b82f6" size={10} />
      <span className="text-blue-600 ml-2">Loading ...</span>
    </div>
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!singleOrderData) {
    return <div>No order data found</div>;
  }

  return (
    <div>
      <OrderDetailsModal
        isOrderDetailsPage={isOrderDetailsPage}
        order={singleOrderData}
      />
    </div>
  );
};

export default OrderDetailsPage;

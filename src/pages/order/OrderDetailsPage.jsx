import React, { useContext, useEffect, useState } from "react";
import OrderDetailsModal from "../../components/order/OrderDetails";
import { useOrderContext } from "../../context/OrderContext";
import {  useSearchParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const OrderDetailsPage = () => {
  const [singleOrderData, setSingleOrderData] = useState(null);
  const [isOrderDetailsPage, setIsOrderDetailsPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionDetails, setSessionDetails] = useState(null);
   const [deliveryData, setDeliveryData] = useState(null);
const {  updateOrder,createOrderDetails,fetchSettingsGraphQL} = useOrderContext();

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchSettingsGraphQL();
          setDeliveryData(data);
        } catch (error) {
          console.error("Error fetching delivery data:", error);
        }
      };
      fetchData();
    }, [fetchSettingsGraphQL]);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/stripe-payments/session-details/${sessionId}`);
      setSessionDetails(res.data);
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  const { cartItems,clearCart,getCartTotal } = useContext(CartContext);

  console.log(sessionDetails?.metadata?.order_id,"set")

  // useEffect(() => {
  //   clearCart();
  // }, []);

  useEffect(() => {
  setIsOrderDetailsPage(true);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);

      const orderId = sessionDetails?.metadata?.order_id;
      const id = orderId?.split('-')[1];

      if (orderId && sessionDetails.payment_status === "paid") {
        const updatedOrder = await updateOrder(id, { payment_status: "paid" });
        console.log(updatedOrder, "updated order");

        setSingleOrderData(updatedOrder);

        if (updatedOrder.payment_status === "paid" && cartItems?.length > 0) {
          for (const item of cartItems) {
            console.log("creating")
            const orderDetailsData = {
              order_id: updatedOrder.id,
              variation_id: item.variationId,
              product_title: item.title,
              user_id: updatedOrder.user_id?updatedOrder.user_id : "guest",
              user_email: updatedOrder.email,
              total_price: item.price * item.quantity,
              quantity: item.quantity,
            };

            await createOrderDetails(orderDetailsData);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch order:", err);
      setError("Failed to load order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sessionDetails?.metadata?.order_id) {
    fetchOrderDetails();
  }
}, [sessionDetails, cartItems]); // include cartItems in dependencies

  console.log(singleOrderData, "singleOrderData");

  if (loading) {
    <div className="fixed inset-0 flex items-center justify-center bg-white z-40">
      <ClipLoader color="#30079f" size={10} />
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

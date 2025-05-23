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
  const order_id = searchParams.get('order_id');
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

 

  const { cartItems,clearCart,getCartTotal } = useContext(CartContext);

  // console.log(sessionDetails?.metadata?.order_id,"set")

  // useEffect(() => {
  //   clearCart();
  // }, []);

 useEffect(() => {
  if (!order_id) return;

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      clearCart();

      const orderId = order_id;
      const id = orderId?.split('-')[1];

      const updatedOrder = await updateOrder(id, { payment_status: "paid" });
      setSingleOrderData(updatedOrder);

      if (updatedOrder.payment_status === "paid") {
        for (const item of cartItems) {
          const orderDetailsData = {
            order_id: { id: updatedOrder.id },
            variation_id: { id: parseInt(item.variationId) },
            product_title: item.title,
            user_id: { id: updatedOrder.user_id || "guest" },
            user_email: updatedOrder.email,
            total_price: String(item.price * item.quantity),
            quantity: parseInt(item.quantity),
          };
          await createOrderDetails(orderDetailsData);
        }
      }
    } catch (err) {
      console.error("Failed to fetch order:", err);
      setError("Failed to load order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchOrderDetails();
}, [order_id]); // ✅ removed cartItems


  // console.log(singleOrderData, "singleOrderData");

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

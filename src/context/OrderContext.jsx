// src/contexts/OrderContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

const ALL_ORDERS_QUERY = `
  query {
    order {
      id
      name
      company_name
      phone_number
      email
      street_address
      address_two
      city
      state
      delivery_method
      zip_code
      shipping_charge
      subtotal
      tax
      order_status
      payment_method
      billing_name
      billing_company_name
      billing_phone_number
      billing_email
      billing_street_address
      billing_address_two
      billing_city
      billing_state
      billing_zip_code
    }
  }
`;

const SINGLE_ORDER_QUERY = `
  query GetOrderById($id: GraphQLStringOrFloat!) {
    order(filter: { id: { _eq: $id } }) {
      id
      name
      company_name
      phone_number
      email
      street_address
      address_two
      city
      state
      delivery_method
      zip_code
      shipping_charge
      subtotal
      tax
      order_status
      payment_method
      billing_name
      billing_company_name
      billing_phone_number
      billing_email
      billing_street_address
      billing_address_two
      billing_city
      billing_state
      billing_zip_code
    }
  }
`;

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: ALL_ORDERS_QUERY,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      console.log(response.data.data, 'response');    
      setOrders(response.data.data.order || []);
    } catch (error) {
      console.error('GraphQL fetch error:', error);
      setError(error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchOrderById = async (id) => {
    // First try to find in local orders
    const localOrder = orders.find(order => order.id === id);
    if (localOrder) {
      setCurrentOrder(localOrder);
      return localOrder;
    }

    // If not found locally, fetch from API
    setOrderLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: SINGLE_ORDER_QUERY,
          variables: { id },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      const order = response.data.data.order?.[0];
      if (order) {
        setCurrentOrder(order);
        return order;
      }
      throw new Error('Order not found');
    } catch (error) {
      console.error('GraphQL fetch error:', error);
      setError(error.message);
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        currentOrder,
        orderLoading,
        fetchOrderById,
        refetchOrders: fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
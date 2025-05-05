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
  query GetOrderById($id: ID!) {
    order_by_id(id: $id) {
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
const UPDATE_ORDER_MUTATION = `
  mutation UpdateOrder($id: ID!, $data: update_order_input!) {
    update_order_item(id: $id, data: $data) {
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


const CREATE_ORDER_MUTATION = `
  mutation CreateOrder($data: create_order_input!) {
    create_order_item(data: $data) {
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

const DELETE_ORDER_MUTATION = `
  mutation DeleteOrder($id: ID!) {
    delete_order_item(id: $id) {
      id
    }
  }
`;


export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [creating, setCreating] = useState(false);
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
        // console.log(response.data.data.order,'fetched orders')
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
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
    const localOrder = orders.find(order => order.id === id);
    if (localOrder) {
      setCurrentOrder(localOrder);
      return localOrder;
    }

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

      const order = response.data.data.order_by_id;
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

  const createOrder = async (orderData) => {
    setCreating(true);  
    setError(null);    
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: CREATE_ORDER_MUTATION,
          variables: { data: orderData },  
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      // console.log(response.data, 'response'); 
    
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);  
      }
  
      const newOrder = response.data.data.create_order_item;
      setOrders((prev) => [...prev, newOrder]);  
  
      return newOrder;
    } catch (error) {
      console.error('GraphQL mutation error:', error);
      setError(error.message);  
      return null;
    } finally {
      setCreating(false); 
    }
  };
  
  //update order
  const updateOrder = async (orderId, updatedFields) => {
    setCreating(true);
    setError(null);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: UPDATE_ORDER_MUTATION,
          variables: {
            id: orderId,
            data: updatedFields, // Pass updated fields as the data for the mutation
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      // console.log(response.data, 'update response');
  
      // Handle errors if they exist
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
  
      // If successful, update the state
      const updatedOrder = response.data.data.update_order_item;
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
  
      return updatedOrder;
    } catch (error) {
      console.error('GraphQL update error:', error);
      setError(error.message);
      return null;
    } finally {
      setCreating(false);
    }
  };
  
  const deleteOrder = async (orderId) => {
    setCreating(true);
    setError(null);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: DELETE_ORDER_MUTATION,
          variables: {
            id: orderId,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      // console.log(response.data, 'delete response');
  
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
  
      const deleted = response.data.data.delete_order_item;
      setOrders(prev => prev.filter(order => order.id !== deleted.id)); 
  
      return deleted;
    } catch (error) {
      console.error('GraphQL delete error:', error);
      setError(error.message);
      return null;
    } finally {
      setCreating(false);
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
        creating,
        fetchOrderById,
        createOrder,
        updateOrder,
        deleteOrder,
        refetchOrders: fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
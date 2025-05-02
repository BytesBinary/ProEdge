// src/contexts/ProductContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

const PRODUCT_QUERY = `
  query {
    product {
      id
      title
      slug
      product_category {
        id
        child_category_name
        sub_category {
          id
          subcategory_name
          parent_category {
            id
            category_name
          }
        }
      }
      variation {
        id
        variation_name
        features
        regular_price
        offer_price
        stock
        product_details
        product_info
        sku_code
        rating
        total_ratings
        image {
           id
          }


      }
    }
  }
`;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: PRODUCT_QUERY,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setProducts(response.data.data.product || []);
      setCategories(response.data.data.categories || []);
    } catch (error) {
      console.error("GraphQL fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ products, categories, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

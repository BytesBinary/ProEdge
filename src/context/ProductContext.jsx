// src/contexts/ProductContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

const ALL_PRODUCTS_QUERY = `
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
        variation_value
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
        made_in
        shipping_days
      }
    }
  }
`;

const SINGLE_PRODUCT_QUERY = `
  query GetProductById($id: GraphQLStringOrFloat!) {
    product(filter: { id: { _eq: $id } }) {
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
        variation_value 
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
        made_in
        shipping_days
      }
    }
  }
`;

export const ProductProvider = ({ children }) => {
  let maxRangeLimit = 100000;
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxRangeLimit);
  const [isMadeUsa, setIsmadeUsa] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: ALL_PRODUCTS_QUERY,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
  
      // Filter out products without variations
      const filteredProducts = (response.data.data.product || []).filter(
        (product) => product.variation && product.variation.length > 0
      );
  
      setProducts(filteredProducts);
    } catch (error) {
      console.error("GraphQL fetch error:", error);
      setError(error.message);
      setProducts([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    // First try to find in local products
    const localProduct = products.find((product) => product.id === id);
    if (localProduct) {
      setCurrentProduct(localProduct);
      return localProduct;
    }

    // If not found locally, fetch from API
    setProductLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: SINGLE_PRODUCT_QUERY,
          variables: { id },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      const product = response.data.data.product[0];
      if (product) {
        setCurrentProduct(product);
        return product;
      }
      throw new Error("Product not found");
    } catch (error) {
      console.error("GraphQL fetch error:", error);
      setError(error.message);
      return null;
    } finally {
      setProductLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        maxRangeLimit,
        isMadeUsa,
        setIsmadeUsa,
        loading,
        error,
        currentProduct,
        productLoading,
        fetchProductById,
        refetchProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

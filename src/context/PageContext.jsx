// context/PageContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Replace with your Directus GraphQL endpoint
const GRAPHQL_URL = `${import.meta.env.VITE_SERVER_URL}/graphql`;

// GraphQL query as a string
const GET_GLOBAL_PAGE_BLOCKS = `
  query {
    page(filter: { permalink: { _eq: "home" } }) {
      id
      title
      permalink
      blocks {
        id
        sort
        item {
          ... on slider {
            id
            sort
            title
            subtitle
            image{
            id
            }
            button_text
            button_url
            type
           
          }
          ... on breadcramb {
            id
            sort
            title
             image{
            id
            }
            type
            
          }
          ... on page_text {
            id
            sort
            text
            type
            
          }
          ... on banner {
            id
            sort
            title
            subtitle
            image{
            id
            }
            button_text
            button_url
            type
            
          }
        }
      }
    }
  }
`;

const PageContext = createContext(null);

export const PageProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          GRAPHQL_URL,
          { query: GET_GLOBAL_PAGE_BLOCKS },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const pages = response.data.data.pages || [];
        setBlocks(pages[0]?.blocks || []);
      } catch (err) {
        setError(err);
        console.error("Error fetching global blocks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <PageContext.Provider value={{ blocks, loading, error }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageBlocks = () => useContext(PageContext);

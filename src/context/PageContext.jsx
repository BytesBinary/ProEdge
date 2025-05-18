import { useEffect, useState } from "react";
import axios from "axios";

const GRAPHQL_URL = `${import.meta.env.VITE_SERVER_URL}/graphql`;

const GET_PAGE_BLOCKS_QUERY = `
  query GetPageBlocks($permalink: String!) {
    page(filter: { permalink: { _eq: $permalink } }) {
      id
      title
      permalink
      blocks {
        id
        sort
        collection
        item {
          __typename
          ... on slider {
            id
            sort
            title
            subtitle
            image { id }
            button_text
            button_url
            type
          }
          ... on breadcramb {
            id
            sort
            title
            image { id }
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
            image { id }
            button_text
            button_url
            type
          }
          ... on features {
            id
            sort
            icon { id }
            title
            subtitle
          }
        }
      }
    }
  }
`;

export const useFetchPageBlocks = (permalink) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!permalink) return;

    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          GRAPHQL_URL,
          {
            query: GET_PAGE_BLOCKS_QUERY,
            variables: { permalink },
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const pages = response.data?.data?.page || [];
        setBlocks(pages[0]?.blocks || []);
      } catch (err) {
        console.error("Error fetching page blocks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [permalink]);

  return { blocks, loading, error };
};

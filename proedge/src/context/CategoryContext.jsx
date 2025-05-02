import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CategoryContext = createContext({
  categories: [],
  loading: false,
  error: null,
});

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GRAPHQL_URL = import.meta.env.VITE_SERVER_URL + "/graphql";

  useEffect(() => {
    const fetchCategoriesAndStock = async () => {
      setLoading(true);
      try {
        // 1. Fetch all category structure
        const categoryRes = await axios.post(
          GRAPHQL_URL,
          {
            query: `
              {
                parent_category {
                  id
                  category_name
                  image{
                  id
                  }
                  sub_category {
                    id
                    subcategory_name
                    child_category {
                      id
                      child_category_name
                    }
                  }
                }
              }
            `,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const parentCategories = categoryRes.data?.data?.parent_category || [];

        // 2. Fetch all products with child category + stock
        const productRes = await axios.post(
          GRAPHQL_URL,
          {
            query: `
              {
                product {
                  product_category {
                    id
                    
                  }
                  variation {
                    stock

                  }
                }
              }
            `,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const allProducts = productRes.data?.data?.product || [];

        // 3. Group stock by child category
        const stockMap = {};
        for (const product of allProducts) {
          const childId = product.product_category?.id;
          const stock = (product.variation || []).reduce(
            (sum, v) => sum + (v.stock || 0),
            0
          );
          if (childId) {
            stockMap[childId] = (stockMap[childId] || 0) + stock;
          }
        }

        // 4. Inject stock into category tree
        for (const parent of parentCategories) {
          let parentStock = 0;
          for (const sub of parent.sub_category) {
            let subStock = 0;
            for (const child of sub.child_category) {
              const childStock = stockMap[child.id] || 0;
              child.total_stock = childStock;
              subStock += childStock;
            }
            sub.total_stock = subStock;
            parentStock += subStock;
          }
          parent.total_stock = parentStock;
        }

        setCategories(parentCategories);
      } catch (err) {
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndStock();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
}

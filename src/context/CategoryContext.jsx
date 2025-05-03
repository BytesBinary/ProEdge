import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { formatCategoryName } from "../helper/slugifier/slugify";

export const CategoryContext = createContext({
  categories: [],
  singleCategory: null, 
  setSingleCategory: () => {},
  loading: false,
  error: null,
});

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
    const [singleCategory, setSingleCategory] = useState(null);
  
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

   const formatCategories = (categories) => {
      const processCategory = (category) => {
        // Create slug from category_name or child_category_name or subcategory_name
        const name =
          category.category_name ||
          category.child_category_name ||
          category.subcategory_name ||
          "";
        const slug = `${formatCategoryName(name)}-${category.id}`;
        // Create new category object with additional fields
  
        const newCategory = {
          ...category,
          slug,
          toggle: false,
        };
  
        // Process subcategories recursively if they exist
        if (category.sub_category) {
          newCategory.sub_category = category.sub_category.map(processCategory);
        }
  
        // Process child categories recursively if they exist
        if (category.child_category) {
          newCategory.child_category =
            category.child_category.map(processCategory);
        }
  
        return newCategory;
      };
  
      return categories.map(processCategory);
    };
  
    useEffect(() => {
      if (!categories?.length) return;
  
      const query = new URLSearchParams(location.search);
      const parentSlug = query.get("parent_category");
      const subSlug = query.get("sub_category");
      const childSlug = query.get("child_category");
  
      const formatted = formatCategories(categories || []);
  
      formatted.forEach((parent) => {
        let parentHasMatch = false;
  
        // Check if parent matches (if parentSlug is provided)
        if (parentSlug) {
          parent.toggle = parent.slug === parentSlug;
          parentHasMatch = parent.toggle;
        }
  
        parent.sub_category?.forEach((sub) => {
          let subHasMatch = false;
  
          // Check if subcategory matches (if subSlug is provided)
          if (subSlug) {
            sub.toggle = sub.slug === subSlug;
            subHasMatch = sub.toggle;
          }
  
          // If childSlug is provided, check child categories
          if (childSlug) {
            sub.child_category?.forEach((child) => {
              if (childSlug === child.slug) {
                child.toggle = true;
                subHasMatch = true;
                parentHasMatch = true;
              } else {
                child.toggle = false;
              }
            });
          }
  
          // If subSlug was provided, override toggle based on subSlug match
          if (subSlug) {
            sub.toggle = sub.slug === subSlug;
            if (sub.toggle) parentHasMatch = true;
          } else {
            sub.toggle = subHasMatch;
          }
        });
  
        // If parentSlug was provided, override toggle based on parentSlug match
        if (parentSlug) {
          parent.toggle = parent.slug === parentSlug;
        } else {
          parent.toggle = parentHasMatch;
        }
      });
      const finalformmatted = formatted.filter((parent) => {
        return parent.toggle === true;
      });
      setSingleCategory(finalformmatted[0]);
  
      // setSingleCategory(foundCategory);
    }, [location.search, categories]);

  return (
    <CategoryContext.Provider value={{ categories,singleCategory,setSingleCategory, loading, error, }}>
      {children}
    </CategoryContext.Provider>
  );
}

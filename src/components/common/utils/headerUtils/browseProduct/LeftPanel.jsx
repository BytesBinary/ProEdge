import React, { useContext } from "react";
import CategoryItem from "./CategoryItem";
import { CategoryContext } from "../../../../../context/CategoryContext";

const LeftPanel = ({ onCategoryClick }) => {
  const { categories, loading, error } = useContext(CategoryContext);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="lg:w-3/7 border-r border-gray-200">
      <h3 className="text-3xl p-6 font-bold text-[#182B55]">Shop Categories</h3>
      <nav className="space-y-2 overflow-y-auto">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            icon={`${import.meta.env.VITE_SERVER_URL}/assets/${category.image.id}`}
            title={category.category_name}
            totalStock={category.total_stock || 0}
            onClick={() => onCategoryClick(category)}
          />
        ))}
      </nav>
    </div>
  );
};

export default LeftPanel;
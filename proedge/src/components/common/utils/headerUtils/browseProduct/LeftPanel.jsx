import React from "react";
import CategoryItem from "./CategoryItem";
import categories from "../../../../../data/browseProducts/BrowseCategory";

const LeftPanel = () => {
  return (
    <div className="lg:w-3/7 border-r border-gray-200">
      <h3 className="text-3xl p-6 font-bold text-[#182B55]">Shop Categories</h3>
      <nav className="space-y-2 overflow-y-auto">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            icon={category.icon}
            title={category.title}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </nav>
    </div>
  );
};

export default LeftPanel;

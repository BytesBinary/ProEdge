import React from "react";
import { Link } from "react-router-dom";
import subcategories from "../../../../../data/browseProducts/BrowseProducts";
import SubcategoryList from "./SubCategoryList";

const RightPanel = () => {
  return (
    <div className="lg:w-4/7 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#182B55]">
          Electric Motors & Motor Controls
        </h2>
        <Link
          to="/shop-all"
          className="text-[#3F66BC] text-md hover:text-[#2E4A8E] transition-colors"
        >
          Shop All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
        {subcategories.map((subcategory, index) => (
          <SubcategoryList
            key={index}
            title={subcategory.title}
            items={subcategory.items}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPanel;

import React, { useContext, useEffect, useState } from "react";
import Filter from "../../components/category/Filter";
import Card from "../../components/category/Card";
import Pagination from "../../components/category/Pagination";
import { IoFilterSharp } from "react-icons/io5";
import { CategoryContext } from "../../context/CategoryContext";
import { useProductContext } from "../../context/ProductContext";
// import PriceCard from "../../components/product/PriceCard";
import PageHeader from "../../components/common/utils/banner/SubPageHeader";
import bgImage from "../../assets/images/cart.png";
import { CartContext } from "../../context/CartContext";

const Category = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");

  const { wishlistItems } = useContext(CartContext);
  const { minPrice, maxPrice, isMadeUsa } = useProductContext();

  const { products, loading } = useProductContext();
  const { singleCategory } = useContext(CategoryContext);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(minPrice, maxPrice, "minPrice,maxPrice");

  // Function to generate a slug from a string
  const generateSlug = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove non-word characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/--+/g, "-"); // Replace multiple hyphens with single
  };

  // Add slug to each product based on its category hierarchy
  const productsWithSlugs = products.map((product) => {
    const parentName =
      product.product_category?.sub_category?.parent_category?.category_name ||
      "";
    const subName =
      product.product_category?.sub_category?.subcategory_name || "";
    const childName = product.product_category?.child_category_name || "";

    const parentId =
      product.product_category?.sub_category?.parent_category?.id || "";
    const subId = product.product_category?.sub_category?.id || "";
    const childId = product.product_category?.id || "";

    // Generate slugs for each part
    const parentSlug = parentName
      ? `${generateSlug(parentName)}-${parentId}`
      : "";
    const subSlug = subName ? `${generateSlug(subName)}-${subId}` : "";
    const childSlug = childName ? `${generateSlug(childName)}-${childId}` : "";

    // Combine them to create the full product slug
    const productSlug = [parentSlug, subSlug, childSlug]
      .filter(Boolean)
      .join("-");

    return {
      ...product,
      slug: product.slug || productSlug, // Use existing slug if available, otherwise use generated one
      // Also add individual slugs to the category structure for easier access
      product_category: {
        ...product.product_category,
        slug: childSlug,
        sub_category: {
          ...product.product_category?.sub_category,
          slug: subSlug,
          parent_category: {
            ...product.product_category?.sub_category?.parent_category,
            slug: parentSlug,
          },
        },
      },
    };
  });

  // Now filter products based on the selected category using the generated slugs
  const categoryfilteredProducts = productsWithSlugs.filter((product) => {
    // Extract product category details using the generated slugs
    const productChildSlug = product.product_category?.slug;
    const productSubSlug = product.product_category?.sub_category?.slug;
    const productParentSlug =
      product.product_category?.sub_category?.parent_category?.slug;

    // If no category is selected at all, show all products
    if (
      !singleCategory?.toggle &&
      !singleCategory?.sub_category?.some((sub) => sub.toggle)
    ) {
      return true;
    }

    // Check if parent matches (if parent is toggled in singleCategory)
    const parentMatch =
      singleCategory?.toggle && singleCategory.slug === productParentSlug;

    // If parent doesn't match, exclude the product
    if (singleCategory?.toggle && !parentMatch) return false;

    // Check if any sub-category is toggled
    const hasToggledSub = singleCategory?.sub_category?.some(
      (sub) => sub.toggle
    );

    // If no sub-category is toggled, include all products under parent
    if (!hasToggledSub) return true;

    // Check if current product's sub-category matches any toggled sub-category
    const subMatch = singleCategory?.sub_category?.some(
      (sub) => sub.toggle && sub.slug === productSubSlug
    );

    // If sub-category doesn't match any toggled sub-category, exclude
    if (!subMatch) return false;

    // Check if any child category is toggled under the matched sub-category
    const matchedSub = singleCategory.sub_category.find(
      (sub) => sub.toggle && sub.slug === productSubSlug
    );
    const hasToggledChild = matchedSub?.child_category?.some(
      (child) => child.toggle
    );

    // If no child category is toggled, include all products under the sub-category
    if (!hasToggledChild) return true;

    // Check if current product's child category matches any toggled child category
    const childMatch = matchedSub.child_category.some(
      (child) => child.toggle && child.slug === productChildSlug
    );

    // Only include if child category matches
    return childMatch;
  });
  // formattedProducts
  const formattedProducts = categoryfilteredProducts.flatMap((product) => {
    // If no variations, return a single product with basic info
    if (!product.variation || product.variation.length === 0) {
      return {
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.offer_price || 0,
        category_name:
          product.product_category?.sub_category?.parent_category
            ?.category_name || "",
        variation: null,
      };
    }

    // Map each variation to a separate product entry
    return product.variation.map((variation) => {
      const features = variation.features || [];
      const featureText = features.map((f) => f.feature_value).join(", ");

      let title = product.title;
      if (featureText) title += ` (${featureText})`;
      if (variation.variation_name) title += ` - ${variation.variation_name}`;

      return {
        id: product.id,
        variationId: variation.id,
        variation_name: variation.variation_name,
        image: variation.image || product.image,
        title: title.trim(),
        stock: variation.stock || 0,
        sku: variation.sku_code || "",
        price:
          variation.offer_price > 0
            ? variation.offer_price
            : variation.regular_price,
        category_name:
          product.product_category?.sub_category?.parent_category
            ?.category_name || "",
        variation: variation,
        made_in: variation.made_in,
      };
    });
  });

  console.log(formattedProducts, "formattedProducts");

  const priceFilteredProducts = formattedProducts.filter((product) => {
    const productPrice = product.offer_price || product.price || 0;
    const madeInUsa = (product?.made_in || "").toLowerCase().includes("usa");

    if (isMadeUsa) {
      // Only include products NOT made in USA, ignore price
      return !madeInUsa;
    }

    // If checkbox is unchecked, apply price filter
    return productPrice >= minPrice && productPrice <= maxPrice;
  });

  //Codes for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalItems = priceFilteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate indexes for slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentItems = priceFilteredProducts.slice(startIndex, endIndex);

  //Check wishList Items

  if (sortOption === "Newest") {
    currentItems = [...currentItems].reverse();
  }
  return (
    <>
      <PageHeader
        title="Categories"
        bgImage={bgImage}
        breadcrumbs={[{ link: "/", label: "Home" }, { label: "Products" }]}
      />
      <div className="w-full max-w-[1200px] mx-auto mt-3 md:mt-20 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Desktop Filter Section */}
        <div className="hidden lg:block w-64">
          <Filter />
        </div>

        {/* Main Content Section */}
        <div className="w-full flex flex-col">
          {/* Desktop View: Showing Items + Heart + Relevance */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            {/* Showing Items */}
            <h1 className="text-[#182B55] font-medium text-lg">
              Showing {categoryfilteredProducts.length} items
            </h1>

            <div className="flex items-center gap-4">
              {/* Heart Icon with Count */}
              <div className="bg-[#F8F9FB] border-2 border-[#ECF0F9] rounded-[42px] w-24 h-10 py-3 px-5 flex items-center justify-around">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_448_4569)">
                    <path
                      d="M14.5796 1.59766C13.6412 1.61225 12.7233 1.8742 11.9185 2.35705C11.1138 2.8399 10.4507 3.52655 9.99622 4.34766C9.54175 3.52655 8.87867 2.8399 8.07392 2.35705C7.26917 1.8742 6.35126 1.61225 5.41289 1.59766C3.91701 1.66265 2.50764 2.31703 1.49271 3.41785C0.477771 4.51867 -0.060237 5.97643 -0.00377825 7.47266C-0.00377825 11.2618 3.98456 15.4002 7.32956 18.206C8.0764 18.8336 9.02068 19.1777 9.99622 19.1777C10.9718 19.1777 11.916 18.8336 12.6629 18.206C16.0079 15.4002 19.9962 11.2618 19.9962 7.47266C20.0527 5.97643 19.5147 4.51867 18.4997 3.41785C17.4848 2.31703 16.0754 1.66265 14.5796 1.59766Z"
                      fill="#EE2738"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_448_4569">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h2 className="text-[#182B55] font-medium text-xl leading-6">
                  {wishlistItems.length}
                </h2>
              </div>

              {/* Relevance Dropdown */}
              <div className="relative flex-1 max-w-[200px]">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full appearance-none bg-[#F8F9FB] border border-[#F8F9FB] rounded-[42px] px-6 py-3 pr-8 text-md leading-4 font-medium text-[#182B55] focus:outline-none"
                >
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Most Popular</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View: Filter + Relevance + Info */}
          <div className="w-full flex flex-col gap-4 lg:hidden">
            {/* Filter and Relevance Row */}
            <div className="w-full flex items-center justify-between">
              {/* Filter Button */}
              <div
                className="bg-[#F8F9FB] border border-[#F8F9FB] rounded-[42px] px-6 py-3 pr-8 text-md leading-4 font-medium text-[#182B55] inline-flex gap-2 cursor-pointer"
                onClick={() => setShowFilter(!showFilter)}
              >
                <IoFilterSharp /> <span>Filter</span>
              </div>

              {/* Relevance Dropdown */}
              <div className="relative flex-1 max-w-[200px]">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full appearance-none bg-[#F8F9FB] border border-[#F8F9FB] rounded-[42px] px-6 py-3 pr-8 text-md leading-4 font-medium text-[#182B55] focus:outline-none"
                >
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Most Popular</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Info Row */}
            <div className="w-full flex items-center justify-around">
              {/* Showing Items */}
              <h1 className="text-[#182B55] font-medium text-md">
                Showing {priceFilteredProducts.length} items
              </h1>

              {/* Heart Icon with Count */}
              <div className="bg-[#F8F9FB] border-2 border-[#ECF0F9] rounded-[42px] w-20 h-9 py-2 px-4 flex items-center justify-around">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_448_4569)">
                    <path
                      d="M14.5796 1.59766C13.6412 1.61225 12.7233 1.8742 11.9185 2.35705C11.1138 2.8399 10.4507 3.52655 9.99622 4.34766C9.54175 3.52655 8.87867 2.8399 8.07392 2.35705C7.26917 1.8742 6.35126 1.61225 5.41289 1.59766C3.91701 1.66265 2.50764 2.31703 1.49271 3.41785C0.477771 4.51867 -0.060237 5.97643 -0.00377825 7.47266C-0.00377825 11.2618 3.98456 15.4002 7.32956 18.206C8.0764 18.8336 9.02068 19.1777 9.99622 19.1777C10.9718 19.1777 11.916 18.8336 12.6629 18.206C16.0079 15.4002 19.9962 11.2618 19.9962 7.47266C20.0527 5.97643 19.5147 4.51867 18.4997 3.41785C17.4848 2.31703 16.0754 1.66265 14.5796 1.59766Z"
                      fill="#EE2738"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_448_4569">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h2 className="text-[#182B55] font-medium text-md leading-6">
                  {wishlistItems.length}
                </h2>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3">
            {currentItems.map((product) => (
              <Card
                key={product.variationId}
                productId={product.id}
                variationId={product.variationId}
                variation_name={product.variation_name}
                category={product.category_name}
                title={product.title}
                image={product.image?.id}
                price={product.price}
                stock={product.stock}
                made_in={product.made_in}
                sku={product.sku}
                variation={product.variation}
                length={currentItems.length}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {showFilter && (
          <div className="fixed lg:hidden left-0 top-0 h-screen w-full z-50 transform transition-transform duration-300 ease-in-out bg-white/5 shadow-sm backdrop-blur-xs">
              <div className="p-4 text-red-500">
                {singleCategory?.category_name}
              </div>
              <Filter onClose={() => setShowFilter(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default Category;

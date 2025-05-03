export const formatCategoryName = (name = "") => {
    if (typeof name !== "string") return "";
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  };
  
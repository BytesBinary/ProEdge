export const formatCategoryName = (name = "") => {
  if (typeof name !== "string") return "";
  return name
    .toLowerCase()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

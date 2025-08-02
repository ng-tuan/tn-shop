import { useState, useMemo } from "react";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";

const useProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "550e8400-e29b-41d4-a716-446655440000",
  ); // "Tất cả sản phẩm"

  // Create a map of category IDs to category names for easy lookup
  const categoryMap = useMemo(() => {
    const map = new Map();
    categoriesData.forEach((category) => {
      map.set(category.id, category.name);
    });
    return map;
  }, []);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    // Filter by selected category first
    if (
      selectedCategory &&
      selectedCategory !== "550e8400-e29b-41d4-a716-446655440000"
    ) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Then filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        // Search in product name
        const productNameMatch = product.name
          .toLowerCase()
          .includes(searchLower);

        // Search in category name
        const categoryName = categoryMap.get(product.category);
        const categoryNameMatch =
          categoryName && categoryName.toLowerCase().includes(searchLower);

        // Search in description
        const descriptionMatch = product.description
          .toLowerCase()
          .includes(searchLower);

        return productNameMatch || categoryNameMatch || descriptionMatch;
      });
    }

    return filtered;
  }, [searchTerm, selectedCategory, categoryMap]);

  // Get all categories for dropdown/selection
  const categories = useMemo(() => categoriesData, []);

  // Get current category name
  const currentCategoryName = useMemo(() => {
    return categoryMap.get(selectedCategory) || "Tất cả sản phẩm";
  }, [selectedCategory, categoryMap]);

  // Reset search
  const resetSearch = () => {
    setSearchTerm("");
    setSelectedCategory("550e8400-e29b-41d4-a716-446655440000");
  };

  // Clear search term only
  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return {
    // State
    searchTerm,
    selectedCategory,
    currentCategoryName,

    // Data
    filteredProducts,
    categories,
    allProducts: productsData,

    // Actions
    setSearchTerm,
    setSelectedCategory,
    resetSearch,
    clearSearchTerm,

    // Computed values
    hasSearchResults: filteredProducts.length > 0,
    totalResults: filteredProducts.length,
    isSearching:
      searchTerm.trim().length > 0 ||
      selectedCategory !== "550e8400-e29b-41d4-a716-446655440000",
  };
};

export default useProductSearch;

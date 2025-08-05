import categoriesData from '../data/categories.json';

const API_BASE_URL =
  "https://tn-shop-873ac-default-rtdb.asia-southeast1.firebasedatabase.app";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products.json/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // The Firebase API returns data in a nested structure with keys
    // We need to extract the products array from the first key
    const firstKey = Object.keys(data)[0];
    return data[firstKey] || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  // Return categories directly from imported JSON file
  return categoriesData;
};

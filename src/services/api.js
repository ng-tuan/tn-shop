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
  try {
    // For now, we'll keep categories local since they're not in the Firebase API
    // You can add a categories endpoint to Firebase later if needed
    const response = await fetch("/src/data/categories.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

import categoriesData from '../data/categories.json';

const API_BASE_URL = 'https://tn-shop-873ac-default-rtdb.asia-southeast1.firebasedatabase.app';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products.json/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Handle the new nested object structure
    // Convert nested object to array of products
    const products = [];
    
    Object.keys(data).forEach(firstKey => {
      const firstLevel = data[firstKey];
      
      // Check if firstLevel is an object with numeric keys (array-like)
      if (typeof firstLevel === 'object' && firstLevel !== null) {
        Object.keys(firstLevel).forEach(secondKey => {
          const product = firstLevel[secondKey];
          if (product && typeof product === 'object') {
            products.push(product);
          }
        });
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  // Return categories directly from imported JSON file
  return categoriesData;
};

/**
 * Format price to Vietnamese currency format
 * @param {string|number} price - The price to format (e.g., 200000)
 * @returns {string} Formatted price in VND format (e.g., "200,000 VND")
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "0 VND";

  // Convert to number if it's a string
  let numericPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice)) return "0 VND";

  // Format with commas for thousands using Vietnamese locale
  const formattedPrice = numericPrice.toLocaleString("vi-VN");

  return `${formattedPrice} VND`;
};

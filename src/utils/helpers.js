export const formatPrice = (price) => `$${price.toFixed(2)}`;
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Base URL for the backend API
export const API_BASE_URL = "http://localhost:8000";

// Helper function to get the full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If the image path already starts with http, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  // If the path starts with /storage, prepend the base URL
  if (imagePath.startsWith("/storage")) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // Otherwise, assume it's a relative path and prepend /storage
  return `${API_BASE_URL}/storage/${imagePath}`;
};
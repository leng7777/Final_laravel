import api from "./axios";

export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  console.log("Products API Response:", response.data);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  console.log("Product By ID Response:", response.data);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.post(`/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get("/products/search", { params: { q: query } });
  return response.data;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get(`/products/category/${categoryId}`);
  return response.data;
};

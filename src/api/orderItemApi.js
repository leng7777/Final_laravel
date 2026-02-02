import api from "./axios";

export const getOrderItems = async () => {
  const response = await api.get("/order-items");
  return response.data;
};

export const getOrderItemById = async (id) => {
  const response = await api.get(`/order-items/${id}`);
  return response.data;
};

export const createOrderItem = async (data) => {
  const response = await api.post("/order-items", data);
  return response.data;
};

export const updateOrderItem = async (id, data) => {
  const response = await api.put(`/order-items/${id}`, data);
  return response.data;
};

export const deleteOrderItem = async (id) => {
  const response = await api.delete(`/order-items/${id}`);
  return response.data;
};

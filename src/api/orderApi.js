import api from "./axios";

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}`, { status });
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

export const updateAdminOrderStatus = async (id, status) => {
  const response = await api.put(`/admin/orders/${id}`, { status });
  return response.data;
};

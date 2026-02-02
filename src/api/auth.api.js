import api from "./axios";

export const loginApi = (data) => api.post("/login", data);

export const registerApi = (data) => api.post("/register", data);

export const logoutApi = () => api.post("/logout");

export const getCurrentUser = () => api.get("/user");

export const updateProfile = (data) => api.put("/user/profile", data);

export const changePassword = (data) => api.put("/user/password", data);

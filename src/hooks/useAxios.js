import axios from "axios";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  return instance;
};
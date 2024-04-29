import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// login
export const loginReq = (body) => {
  return axios.post(`${BASE_URL}/login`, body);
};

// register
export const registerReq = (body) => {
  return axios.post(`${BASE_URL}/register`, body);
};

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// profil sayfasındai bilgileri getirme
export const getUserByUsernameReq = (data) => {
  return axios.get(`${BASE_URL}/getUserByUsername/${data}`);
};

// profil sayfasındaki postları getirme
export const getPostsByAuthorIdReq = (data) => {
  return axios.get(`${BASE_URL}/getPostsByAuthorId/${data}`);
};

// profil sayfasındaki trendleri getirme
export const getFavoritePostReq = (data) => {
  return axios.get(`${BASE_URL}/getFavoritePost/${data}`);
};

// hesap silme
export const deleteUserReq = (username, password, token) => {
  return axios.delete(`${BASE_URL}/deleteUser`, {
    params: { username, password },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

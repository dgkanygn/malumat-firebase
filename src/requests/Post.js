import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ana sayfadaki postların getirilmesi
export const getPostsReq = () => {
  return axios.get(`${BASE_URL}/posts`);
};

// ana sayfadaki trendlerin getirilmesi
export const getTrendsReq = () => {
  return axios.get(`${BASE_URL}/trends`);
};

// yeni post oluşturma
export const createPostReq = (body, token) => {
  return axios.post(`${BASE_URL}/createPost`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// spesifik bir postu getirme
export const getPostReq = (data) => {
  return axios.get(`${BASE_URL}/post/${data}`);
};

// postu favorilere ekleme
export const addFavoritesPostReq = (body, token) => {
  return axios.put(`${BASE_URL}/addFavoritesPost`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// id ile postun favori sayısını getirme
export const getFavLengthByIdReq = (data) => {
  return axios.get(`${BASE_URL}/getFavLengthById/${data}`);
};

// post düzenleme
export const updatePostReq = (id, body, token) => {
  return axios.patch(`${BASE_URL}/updatePost/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// veri filtreleme
export const filterDataReq = (id) => {
  return axios.get(`${BASE_URL}/filter/${id}`);
};

// post silme
export const deletePostReq = (id, token) => {
  return axios.delete(`${BASE_URL}/deletePost/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

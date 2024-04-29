import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// yeni yorum oluşturma
export const createCommentReq = (body, token) => {
  return axios.post(`${BASE_URL}/createComment`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// yorumların getirilmesi
export const getCommentsReq = (data) => {
  return axios.get(`${BASE_URL}/getCommentByPostId/${data}`);
};

// yorum beğenme
export const likeCommentReq = (body, token) => {
  return axios.put(`${BASE_URL}/addLikesComment`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// yorum güncelleme
export const updateCommentReq = (id, body, token) => {
  return axios.put(`${BASE_URL}/updateComment/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// yorum silme
export const deleteCommentReq = (id, token) => {
  return axios.delete(`${BASE_URL}/deleteComment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

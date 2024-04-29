import { createContext, useState } from "react";

const Data = createContext();

export const DataProvider = ({ children }) => {
  // login kontrolü
  const data1 = localStorage.getItem("isLogin");
  const [isLogin, setIsLogin] = useState(data1 ? data1 : false);

  // login olunca dönen user data
  const data2 = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(data2);
  const [userInfo, setUserInfo] = useState(parsedData ? parsedData : {});

  // token
  const data3 = localStorage.getItem("jwt");
  const [jwt, setJwt] = useState(data3 ? data3 : "");

  // modal'ı kontrol eden state
  const [showModal, setShowModal] = useState({
    isShow: false,
    deleted: "",
    id: "",
  });

  // trend olmayan normal postlar
  const [features, setFeatures] = useState([]);

  // spesifik bir post'a ait yorumları tutan state (modal'dan erişim gerekmesi sebebiyle burada)
  const [postComments, setPostComments] = useState([]);

  const data = {
    isLogin,
    setIsLogin,
    userInfo,
    setUserInfo,
    jwt,
    setJwt,
    showModal,
    setShowModal,
    features,
    setFeatures,
    postComments,
    setPostComments,
  };

  return <Data.Provider value={data}>{children}</Data.Provider>;
};

export default Data;

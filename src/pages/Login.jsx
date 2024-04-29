import React, { useState, useContext } from "react";

// components
import { Button } from "../components/Button";
import { Text } from "../components/Text";

// router
import { Link, useNavigate } from "react-router-dom";

// context
import Data from "../context/Data";

// request
import { loginReq } from "../requests/Auth";
import { Flex } from "../components/Flex";
import { Input } from "../components/Input";
import { Box } from "../components/Box";
import { Container } from "../components/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Login = () => {
  const { isLogin, setIsLogin, userInfo, setUserInfo } = useContext(Data);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const inputs = [
    {
      type: "text",
      name: "loginData",
      placeholder: "E-Mail veya kullanıcı adı",
    },
    {
      type: "password",
      name: "password",
      placeholder: "Şifre",
    },
  ];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginData: "",
    password: "",
  });

  const { loginData, password } = formData;

  let email = loginData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async (e) => {
    try {
      // if (formData.loginData && formData.password) {
      //   setIsLoading(true);
      //   e.preventDefault();
      //   const res = await loginReq(formData);
      //   setIsLogin(!isLogin);
      //   setUserInfo(res.data.user);
      //   // setJwt(res.data.token);
      //   localStorage.setItem("jwt", res.data.token);
      //   navigate("/");
      //   setIsLoading(false);
      // }
      setIsLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const q = query(
        collection(db, "users"),
        where("email", "==", res.user.email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;
        const mergedData = {
          ...userData,
          id: userId,
          uid: res.user.uid,
          image: res.user.photoURL,
        };
        setIsLogin(!isLogin);
        setUserInfo(mergedData);
        // setJwt(res.user.token);
        // localStorage.setItem("jwt", res.data.token);
        navigate("/");
        setIsLoading(false);
      } else {
        console.log("Kullanıcıya ait belge bulunamadı.");
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-blue1 min-h-screen">
        <div className="flex flex-col gap-10">
          <div className="lg:container lg:mx-auto lg:w-[400px] md:container md:mx-auto md:w-[400px] sm:container sm:mx-auto sm:w-[400px]">
            <div className="bg-white shadow-md flex flex-col justify-center items-center gap-5 py-5">
              <Text size={"text-[30px]"} weight={"font-bold"}>
                malumat.
              </Text>
              <Text>Oku, yaz, yorumla.</Text>
            </div>
          </div>

          <div className="lg:container lg:mx-auto lg:w-[400px] md:container md:mx-auto md:w-[400px] sm:container sm:mx-auto sm:w-[400px]">
            <div className="bg-white shadow-md flex flex-col justify-center gap-5 pb-[300px] pt-10 px-10">
              <Text weight={"font-bold"} size={"text-[30px]"}>
                Giriş Yap
              </Text>

              {inputs.map((input, index) => (
                <Flex key={index} direction={"flex-col"}>
                  <Input
                    placeholder={input.placeholder}
                    type={input.type}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                  />
                </Flex>
              ))}

              <Button
                bg={"bg-blue2"}
                onClick={login}
                text={"Giriş Yap"}
                isLoading={isLoading}
              />
              {errorMsg && (
                <div className="bg-red-100 p-1 text-center rounded">
                  <Text>{errorMsg}</Text>
                </div>
              )}
              <Text>
                Hesabın yok mu?
                <Link to={"/register"}>
                  <Text weight={"font-bold"} hover={"hover:text-slate-700"}>
                    Kaydol
                  </Text>
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

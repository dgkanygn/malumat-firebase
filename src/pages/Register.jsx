import React, { useContext, useState } from "react";

// components
import { Button } from "../components/Button";
import { registerReq } from "../requests/Auth";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Flex } from "../components/Flex";
import { TextArea } from "../components/TextArea";
import { Box } from "../components/Box";

// router
import { Link, useNavigate } from "react-router-dom";
import { ImagePicker } from "../components/ImagePicker";
import Data from "../context/Data";

// firebase
import { auth, db, storage } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Register = () => {
  const navigate = useNavigate();

  // const { setIsLoading } = useContext(Data);

  const [isLoading, setIsLoading] = useState(false);

  const inputs = [
    {
      label: "E-Mail",
      type: "text",
      name: "email",
      placeholder: "E-mail*",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Şifre*",
    },

    {
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "Kullanıcı adı*",
    },
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Ad",
    },
    {
      label: "Surname",
      type: "text",
      name: "surname",
      placeholder: "Soyad",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    surname: "",
    bio: "",
  });

  const [image, setImage] = useState("");

  const formData2 = new FormData();

  const [errorMsg, setErrorMsg] = useState("");

  formData2.append("email", formData.email);
  formData2.append("password", formData.password);
  formData2.append("username", formData.username);
  formData2.append("name", formData.name);
  formData2.append("surname", formData.surname);
  formData2.append("bio", formData.bio);
  formData2.append("image", image);

  const { email, password, username, bio, name, surname } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createdUser.user;

      const storageRef = ref(storage, "profile_pictures/" + user.uid);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      await updateProfile(user, {
        displayName: username,
        photoURL: imageUrl,
      });

      await addDoc(collection(db, "users"), formData);

      console.log(user);

      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      // setErrorMsg(error.response.data.message);
      setIsLoading(false);
    }
  };

  console.log(formData);

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
            <form className="bg-white shadow-md flex flex-col justify-center gap-5 pb-[300px] pt-10 px-10">
              <Text size={"text-[30px]"} weight={"font-bold"}>
                Kaydol
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

              <Flex direction={"flex-col"}>
                <TextArea
                  placeholder={"Kendinle ilgili bir şeyler yaz..."}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                />
              </Flex>

              <ImagePicker setImage={setImage} />

              {errorMsg && (
                <p className="bg-red-100 p-3 text-red-700">{errorMsg}</p>
              )}

              <Button
                bg={"bg-blue2"}
                onClick={register}
                text={"Kaydol"}
                isLoading={isLoading}
              />

              <Text>
                Bir hesabın var mı?
                <Link to={"/login"}>
                  <Text weight={"font-bold"} hover={"hover:text-slate-700"}>
                    Giriş Yap
                  </Text>
                </Link>
              </Text>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

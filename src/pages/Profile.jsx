import React, { useContext, useEffect, useState } from "react";

// components
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { Box } from "../components/Box";
import { Container } from "../components/Container";
import { Flex } from "../components/Flex";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// pic
import pic from "../assets/images/pic.jpg";

// router
import { useNavigate, useParams } from "react-router-dom";

// request
import {
  deleteUserReq,
  getFavoritePostReq,
  getPostsByAuthorIdReq,
  getUserByUsernameReq,
} from "../requests/User";

// context
import Data from "../context/Data";

// firebase
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const Profile = () => {
  const token = localStorage.getItem("jwt");

  const { userInfo, setIsLogin } = useContext(Data);

  const [profile, setProfile] = useState({});

  const [posts, setPosts] = useState([]);

  const [favorites, setFavorites] = useState([]);

  const [activeTab, setActiveTab] = useState(1);

  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabs = [
    {
      name: "Gönderiler",
      id: 1,
    },
    {
      name: "Favoriler",
      id: 2,
    },
    {
      name: "Hesabı sil",
      id: 3,
    },
  ];

  // profil bilgilerinin getirilmesi
  const { id } = useParams();

  const isOwner = id === userInfo.username;

  const getProfile = async () => {
    try {
      // const res = await getUserByUsernameReq(id);
      // setProfile(res?.data?.user);

      const docRef = doc(db, "users", userInfo.id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      setProfile(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await getPostsByAuthorIdReq(id);
      setPosts(res?.data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavs = async () => {
    try {
      const res = await getFavoritePostReq(id);
      setFavorites(res?.data?.favorites);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    try {
      if (password) {
        setIsLoading(true);
        const res = await deleteUserReq(id, password, token);
        localStorage.clear();
        setIsLogin(false);
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      getPosts();
    } else if (activeTab === 2) {
      getFavs();
    } else if (activeTab === 3) {
      // getLikeComment2();
    }
  }, [activeTab]);

  useEffect(() => {
    getProfile();
    // setTabNumber(0);
    setActiveTab(1);
  }, [id]);

  useEffect(() => {
    getProfile();
    getPosts();
    getFavs();
  }, []);

  return (
    <>
      <Navbar />

      <Box bg={"bg-blue1"} margin={"mt-[65px]"}>
        <Container>
          <Flex
            direction={"md:flex-row flex-col"}
            align={"items-start"}
            padding={"py-16"}
            gap={"gap-5"}
          >
            <Flex
              align={"items-center"}
              justify={"justify-start"}
              gap={"gap-6"}
            >
              <div className="flex-shrink-0 w-[150px] h-[150px]">
                <div className="relative w-full h-full">
                  <img
                    class="absolute inset-0 w-full h-full object-cover rounded"
                    src={profile.image === " " ? pic : profile.image}
                    alt=""
                  />
                </div>
              </div>
            </Flex>
            <Flex direction={"flex-col"}>
              <Text size={"text-[40px]"}>{profile.username}</Text>
              <Text>
                {profile.name} {profile.surname}
              </Text>
              <Text>{profile.bio}</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box padding={"md:p-10 py-10"}>
        <Container>
          <Flex
            direction={"md:flex-row flex-col"}
            justify={"justify-start"}
            align={"items-start"}
            gap={"gap-10"}
          >
            <Box>
              {tabs.map((tab, index) =>
                index === tabs.length - 1 && !isOwner ? null : (
                  <p
                    key={index}
                    className={`${
                      activeTab === tab.id ? "bg-blue1" : ""
                    }   p-3 cursor-pointer hover:bg-blue1 text-[19px]`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.name}
                  </p>
                )
              )}
            </Box>
            <Box>
              {activeTab === 1 && (
                <>
                  <Flex
                    direction={"flex-col"}
                    gap={"gap-14"}
                    align={"items-start"}
                  >
                    {posts.length > 0 ? (
                      posts.map((post, index) => (
                        <PostCard
                          key={index}
                          title={post.title}
                          subject={post.description}
                          author={post.author}
                          date={post.createdAt}
                          id={post._id}
                          image={post.image}
                          authorImage={post.authorImage}
                          param={id}
                        />
                      ))
                    ) : (
                      <Text>Gösterilecek bir şey yok.</Text>
                    )}
                  </Flex>
                </>
              )}
              {activeTab === 2 && (
                <>
                  {favorites.length > 0 ? (
                    <Flex
                      direction={"flex-col"}
                      gap={"gap-14"}
                      align={"items-start"}
                    >
                      {favorites.map((post, index) => (
                        <PostCard
                          key={index}
                          title={post.title}
                          subject={post.description}
                          author={post.author}
                          date={post.createdAt}
                          id={post._id}
                          image={post.image}
                          authorImage={post.authorImage}
                          param={id}
                        />
                      ))}
                    </Flex>
                  ) : (
                    <p>Burada bir şey yok.</p>
                  )}
                </>
              )}
              {activeTab === 3 && (
                <>
                  <Flex
                    direction={"flex-col"}
                    align={"items-start"}
                    gap={"gap-5"}
                  >
                    <Text>
                      Hesabını silmek için şifreni gir. Bu işlem geri alınamaz.
                    </Text>
                    <Flex
                      direction={"flex-col"}
                      align={"items-start"}
                      gap={"gap-5"}
                    >
                      <Input
                        placeholder={"Şifre"}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {errorMsg && (
                        <Text color={"text-red-700"}>{errorMsg}</Text>
                      )}

                      <Button
                        onClick={deleteAccount}
                        bg={"bg-red-700"}
                        text={"Hesabı sil"}
                        isLoading={isLoading}
                      />
                    </Flex>
                  </Flex>
                </>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

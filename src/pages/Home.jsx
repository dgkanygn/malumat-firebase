import React, { useEffect, useState, useContext } from "react";

// components
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { Button } from "../components/Button";
import { TrendCard } from "../components/TrendCard";
import { Container } from "../components/Container";
import { Flex } from "../components/Flex";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { ProfileButton } from "../components/ProfileButton";
import { Input } from "../components/Input";

// context
import Data from "../context/Data";

// router
import { Link } from "react-router-dom";

// request
import { filterDataReq, getPostsReq, getTrendsReq } from "../requests/Post";

// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const Home = () => {
  const { isLogin, userInfo, features, setFeatures } = useContext(Data);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("isLogin", isLogin);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // localStorage.setItem("jwt", jwt);
    }
  }, [isLogin, userInfo]);

  // trend postlar
  const [trends, setTrends] = useState([]);

  // tüm postlar
  // const [features, setFeatures] = useState([]);

  const token = localStorage.getItem("jwt");

  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);

  // trend'lerin getirilmesi
  const getTrends = async () => {
    try {
      const res = await getTrendsReq();
      setTrends(res.data.limitedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  // post'ların getirilmesi
  const getPosts = async () => {
    try {
      // const res = await getPostsReq();
      // setFeatures(res?.data?.posts);

      const collectionRef = collection(db, "posts");
      const querySnapshot = await getDocs(collectionRef);

      const postsData = [];

      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const postId = doc.id;

        const mergedData = {
          ...postData,
          _id: postId,
          author: userInfo.username,
          authorImage: userInfo.imgUrl,
        };

        postsData.push(mergedData);
      });

      console.log(postsData);
      setFeatures(postsData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterApi = async () => {
    try {
      const res = await filterDataReq(search);
      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) filterApi();
  }, [search]);

  useEffect(() => {
    getTrends();
    getPosts();
  }, []);

  return (
    <>
      <Navbar />

      <Box bg={"bg-blue1"} margin={"mt-[65px]"}>
        <Container>
          <Flex
            direction={"flex-col"}
            justify={"items-start"}
            padding={"py-16"}
            gap={"gap-3"}
          >
            {isLogin ? (
              <>
                <Text weight={"font-bold"} size={"text-[25px]"}>
                  Merhaba, {userInfo.username}
                </Text>
                <p>Bir şeyler yaz.</p>
                <Link to={"/new"}>
                  <Button text={"Yeni Gönderi"} bg={"bg-blue2"} />
                </Link>
              </>
            ) : (
              <>
                <Text weight={"font-bold"} size={"text-[25px]"}>
                  malumat.
                </Text>
                <Text>Gönderi yazmak ve yorum yapmak için giriş yap.</Text>
                <Link to={"/login"}>
                  <Button bg={"bg-blue2"} text={"Giriş Yap"} />
                </Link>
              </>
            )}
          </Flex>
        </Container>
      </Box>

      <Container>
        <Flex
          direction={"flex-col"}
          justify={"items-start"}
          gap={"gap-5"}
          padding={"py-10"}
        >
          <Text size={"text-[25px]"} weight={"font-bold"}>
            Ara
          </Text>

          <Input
            type={"text"}
            placeholder="Bir şeyler ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
      </Container>

      {search ? (
        <Container>
          <Flex
            direction={"flex-col"}
            justify={"justify-start"}
            align={"items-start"}
            gap={"gap-10"}
            padding={"py-5"}
          >
            <Text size={"text-[25px]"} weight={"font-bold"}>
              Sonuç
            </Text>

            {datas.length > 0 ? (
              datas.map((data) =>
                data.title ? (
                  <PostCard
                    title={data.title}
                    subject={data.description}
                    author={data.author}
                    image={data.image}
                    authorImage={data.authorImage}
                    id={data._id}
                  />
                ) : (
                  <Link to={`/profile/${data.username}`}>
                    <ProfileButton
                      toggle={false}
                      username={data.username}
                      image={data.image}
                    />
                  </Link>
                )
              )
            ) : (
              <Text>Gösterilecek sonuç yok.</Text>
            )}
          </Flex>
        </Container>
      ) : (
        <>
          <Container>
            <Flex
              direction={"flex-col"}
              justify={"items-start"}
              gap={"gap-5"}
              padding={"py-10"}
            >
              <Text weight={"font-bold"} size={"text-[25px]"}>
                Trendler
              </Text>
              <Flex
                justify={"justify-between"}
                align={"items-center"}
                gap={"gap-10"}
                wrap={"flex-wrap"}
              >
                {trends.length > 0 ? (
                  trends.map((trend, index) => (
                    <TrendCard
                      key={index}
                      title={trend.title}
                      author={trend.author}
                      date={trend.createdAt}
                      id={trend._id}
                      keyId={index}
                    />
                  ))
                ) : (
                  <Text>Hiç gönderi yok.</Text>
                )}
              </Flex>
            </Flex>
          </Container>

          <Container>
            <Flex
              direction={"flex-col"}
              align={"items-start"}
              gap={"gap-5"}
              padding={"py-10"}
            >
              <Text size={"text-[25px]"} weight={"font-bold"}>
                Gönderiler
              </Text>

              <Flex direction={"flex-col-reverse"} gap={"gap-20"}>
                {features.length > 0 ? (
                  features.map((feature, index) => (
                    <PostCard
                      key={index}
                      title={feature.title}
                      author={feature.author}
                      subject={feature.description}
                      date={feature.createdAt}
                      id={feature._id}
                      image={feature.image}
                      authorImage={feature.authorImage}
                    />
                  ))
                ) : (
                  <Text>Hiç gönderi yok.</Text>
                )}
              </Flex>
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

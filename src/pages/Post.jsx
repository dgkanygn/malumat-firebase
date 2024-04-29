import React, { useEffect, useState, useContext } from "react";

// components
import { Navbar } from "../components/Navbar";
import { CommentCard } from "../components/CommentCard";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { NewComment } from "../components/NewComment";
import { Modal } from "../components/Modal";
import { Container } from "../components/Container";
import { Moment } from "../components/Moment";
import { Box } from "../components/Box";
import { Flex } from "../components/Flex";
import { Text } from "../components/Text";
import { TextArea } from "../components/TextArea";
import { Input } from "../components/Input";

// pic
import pic from "../assets/images/pic.jpg";

// router
import { Link, useParams } from "react-router-dom";

// context
import Data from "../context/Data";

// request
import {
  addFavoritesPostReq,
  getFavLengthByIdReq,
  getPostReq,
  updatePostReq,
} from "../requests/Post";
import { getCommentsReq } from "../requests/Comment";

// firebase
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const Post = () => {
  const token = localStorage.getItem("jwt");

  // url'deki id ile spesifik bir post'un ve yorumlarının getirilmesi
  const { id } = useParams();

  // oturum durumunun kontrolü
  const {
    isLogin,
    showModal,
    setShowModal,
    postComments,
    setPostComments,
    userInfo,
    // setIsLoading,
  } = useContext(Data);

  const [isLoading, setIsLoading] = useState(false);

  const [postData, setPostData] = useState([]);

  const [favCount, setFavCount] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const [currentPostData, setCurrentPostData] = useState({});

  useEffect(() => {
    setCurrentPostData({
      title: postData.title,
      description: postData.description,
      post: postData.post,
    });
  }, [postData]);

  const updatePost = async () => {
    try {
      setIsLoading(true);

      // console.log(currentPostData);

      // const res = await updatePostReq(postData._id, currentPostData, token);

      const docRef = doc(db, "posts", id);
      const updated = await updateDoc(docRef, currentPostData);

      if (updated === undefined) {
        const updatedDoc = await getDoc(docRef);
        setPostData(updatedDoc.data());
      }
      // setPostData(res?.data?.updatedPost);
      setIsEdit(!isEdit);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFav = async () => {
    try {
      const res = await addFavoritesPostReq(
        {
          postId: id,
          userId: userInfo.username,
        },
        token
      );
      setFavCount(res?.data?.updated?.favorites?.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setShowModal({
      isShow: true,
      deleted: "post",
      id: id,
    });
  };
  const handleEdit = async () => {
    setIsEdit(!isEdit);
  };

  const buttons = [
    {
      icon: "fa-regular fa-bookmark",
      type: "fav",
      onClick: handleFav,
    },
    {
      icon: "fa-solid fa-xmark",
      type: "delete",
      onClick: handleDelete,
    },
    {
      icon: "fa-regular fa-pen-to-square",
      type: "edit",
      onClick: handleEdit,
    },
  ];

  const getPost = async () => {
    try {
      // const res = await getPostReq(id);
      // setPostData(res?.data?.post);
      // setFavCount(postData?.favorites?.length);

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      const postData = docSnap.data();
      const postId = docSnap.id;

      const mergedData = {
        ...postData,
        _id: postId,
        author: userInfo.username,
        authorImage: userInfo.imgUrl,
      };

      setPostData(mergedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavLength = async () => {
    try {
      const res = await getFavLengthByIdReq(id);
      setFavCount(res?.data?.favLength);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const res = await getCommentsReq(id);
      setPostComments(res?.data?.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthor = postData.author === userInfo.username;
  console.log(postData);

  useEffect(() => {
    getPost();
    getComments();
    getFavLength();
  }, [id]);

  useEffect(() => {
    getPost();
    getComments();
    getFavLength();
  }, []);

  return (
    <>
      {showModal.isShow && <Modal />}

      <Navbar />

      <Box bg={"bg-blue1"} margin={"mt-[65px]"}>
        <Container>
          <Flex
            align={"items-start"}
            justify={"justify-between"}
            padding={"py-16"}
          >
            <Flex
              align={"items-center"}
              justify={"justify-between"}
              gap={"gap-2"}
            >
              <Link to={`/profile/${postData?.author}`}>
                <div className="flex-shrink-0 w-[50px] h-[50px]">
                  <div className="relative w-full h-full">
                    <img
                      class="absolute inset-0 w-full h-full object-cover rounded"
                      src={
                        postData.authorImage === " "
                          ? pic
                          : postData.authorImage
                      }
                      alt=""
                    />
                  </div>
                </div>
              </Link>
              <Flex direction={"flex-col"}>
                <Link to={`/profile/${postData?.author}`}>
                  <Text hover={"hover:text-slate-600"}>
                    <b>{postData.author}</b>
                  </Text>
                </Link>
                <Moment date={postData.createdAt} />
              </Flex>
            </Flex>
            <Flex gap={"gap-3"}>
              {isLogin &&
                buttons.map(
                  (btn, index) =>
                    (btn.type === "fav" || isAuthor) && (
                      <IconButton
                        key={index}
                        icon={btn.icon}
                        onClick={btn.onClick}
                        favCount={
                          btn.type === "fav" && favCount > 0 && favCount
                        }
                      />
                    )
                )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {!isEdit ? (
        <Container padding={"py-10"}>
          <Flex direction={"flex-col"} gap={"gap-4"}>
            {!isLogin && (
              <Text>{favCount} kişi bu içeriği favorilerine ekledi.</Text>
            )}
            <Text weight={"font-bold"} size={"text-[45px]"}>
              {postData.title}
            </Text>
            <Text>{postData.description}</Text>
            <img
              class="rounded-md max-w-3xl"
              src={postData.image && postData.image}
              alt=""
            />
            <Text>
              {postData.post && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: postData.post.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
            </Text>
          </Flex>
        </Container>
      ) : (
        <Container>
          <Flex direction={"flex-col"} gap={"gap-4"} padding={"py-5"}>
            <Input
              placeholder={"Başlık"}
              type="text"
              maxLength="70"
              value={currentPostData.title}
              onChange={(e) =>
                setCurrentPostData({
                  ...currentPostData,
                  title: e.target.value,
                })
              }
            />
            <Input
              placeholder={"Açıklama"}
              type="text"
              maxLength="130"
              value={currentPostData.description}
              onChange={(e) =>
                setCurrentPostData({
                  ...currentPostData,
                  description: e.target.value,
                })
              }
            />

            <TextArea
              value={currentPostData.post}
              onChange={(e) =>
                setCurrentPostData({ ...currentPostData, post: e.target.value })
              }
            />
            <Flex>
              <Button
                bg={"bg-blue2"}
                onClick={updatePost}
                text={"Düzenle"}
                isLoading={isLoading}
              />
            </Flex>
          </Flex>
        </Container>
      )}

      <Box bg={"bg-blue1"} padding={"py-9"}>
        <Container>
          <Flex direction={"flex-col"} align={"items-start"} gap={"gap-3"}>
            {isLogin ? (
              <NewComment
                id={id}
                postComments={postComments}
                setPostComments={setPostComments}
                image={userInfo.image}
              />
            ) : (
              <Flex justify={"justify-center"} align={"items-start"}>
                <Text>
                  Yorum yapabilmek için{" "}
                  <Link to={"/login"}>
                    <b className="hover:text-slate-600">giriş yapın.</b>
                  </Link>
                </Text>
              </Flex>
            )}
          </Flex>
        </Container>
      </Box>
      <Container>
        <Flex direction={"flex-col-reverse"} gap={"gap-10"} padding={"py-10"}>
          {postComments.map((postComment, index) => (
            <CommentCard
              key={index}
              author={postComment.owner}
              date={postComment.createdAt}
              postComment={postComment.comment}
              postComments={postComments}
              setPostComments={setPostComments}
              commentId={postComment._id}
              image={postComment.authorImage}
              likes={postComment.likes}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
};

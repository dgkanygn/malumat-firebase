import React, { useState, useContext } from "react";

// components
import { ProfileButton } from "./ProfileButton";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { IconButton } from "./IconButton";
import { TextArea } from "./TextArea";
import { Flex } from "./Flex";
import { Box } from "./Box";
import { Container } from "./Container";

// context
import Data from "../context/Data";

// moment
import { Moment } from "./Moment";

// request
import { likeCommentReq, updateCommentReq } from "../requests/Comment";

export const CommentCard = ({
  author,
  date,
  postComment,
  commentId,
  postComments,
  setPostComments,
  image,
  likes,
}) => {
  const token = localStorage.getItem("jwt");

  const { isLogin, userInfo, showModal, setShowModal } = useContext(Data);

  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [commentInp, setCommentInp] = useState(postComment);

  const [commentLikes, setCommentLikes] = useState(likes?.length);

  const handleLike = async () => {
    try {
      const res = await likeCommentReq(
        {
          commentId: commentId,
          userId: userInfo.username,
        },
        token
      );
      setCommentLikes(res.data.updated.likes.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setShowModal(
      {
        isShow: true,
        deleted: "comment",
        id: commentId,
      },
      token
    );
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const editComment = async () => {
    try {
      setIsLoading(true);
      await updateCommentReq(commentId, { comment: commentInp }, token);

      setPostComments((prevComments) =>
        prevComments.map((item) =>
          item._id === commentId ? { ...item, comment: commentInp } : item
        )
      );
      setIsEdit(!isEdit);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const buttons = [
    {
      icon: "fa-regular fa-heart",
      type: "like",
      onClick: handleLike,
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

  const isAuthor = author === userInfo.username;

  return (
    <>
      <Flex
        direction={"flex-col"}
        gap={"gap-4"}
        padding={"p-5"}
        others={"border-2"}
      >
        <Flex align={"items-start"} justify={"justify-between"}>
          <Flex align={"items-center"} justify={"justify-start"} gap={"gap-2"}>
            <Link to={`/profile/${author}`}>
              <ProfileButton image={image} username={author} />
            </Link>
            <Moment date={date} />
          </Flex>
          <Flex gap={"gap-3"}>
            {isLogin &&
              buttons.map(
                (btn, index) =>
                  (btn.type === "like" || isAuthor) && (
                    <IconButton
                      key={index}
                      icon={btn.icon}
                      onClick={btn.onClick}
                      favCount={
                        btn.type === "like" && commentLikes > 0 && commentLikes
                      }
                    />
                  )
              )}
          </Flex>
        </Flex>
        <Box>
          {!isEdit && (
            <>
              {postComment && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: postComment.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
            </>
          )}

          {isEdit && (
            <Container>
              <Flex
                direction={"flex-col"}
                justify={"justify-start"}
                // align={"items-start"}
                gap={"gap-2"}
              >
                <TextArea
                  value={commentInp}
                  onChange={(e) => setCommentInp(e.target.value)}
                />
                <Flex>
                  <Button
                    bg={"bg-blue2"}
                    onClick={editComment}
                    text={"Düzenle"}
                    isLoading={isLoading}
                  />
                </Flex>
              </Flex>
            </Container>
          )}
        </Box>
      </Flex>
    </>
  );
};

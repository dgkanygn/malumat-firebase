import React, { useState, useContext } from "react";

// pic
import pic from "../assets/images/pic.jpg";

// components
import { Button } from "./Button";

// context
import Data from "../context/Data";

// request
import { createCommentReq } from "../requests/Comment";
import { TextArea } from "./TextArea";
import { Flex } from "./Flex";
import { Container } from "./Container";

export const NewComment = ({ id, setPostComments, postComments, image }) => {
  const token = localStorage.getItem("jwt");

  const { userInfo } = useContext(Data);

  const [isLoading, setIsLoading] = useState(false);

  const [comment, setComment] = useState("");

  const sendComment = async () => {
    try {
      if (comment && comment !== " ") {
        setIsLoading(true);
        const res = await createCommentReq(
          {
            comment,
            postId: id,
            ownerId: userInfo.username,
            authorImage: userInfo.image,
          },
          token
        );
        setPostComments([...postComments, res.data.newComment]);
        setComment("");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Flex direction={"flex-col"} gap={"gap-3"}>
          <div className="flex-shrink-0 w-[35px] h-[35px]">
            <div className="relative w-full h-full">
              <img
                class="absolute inset-0 w-full h-full object-cover rounded"
                src={image === " " ? pic : image}
                alt=""
              />
            </div>
          </div>

          <TextArea
            placeholder={"Bu gönderi hakkında yorum yap..."}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></TextArea>
          <Flex>
            <Button
              bg={"bg-blue2"}
              onClick={sendComment}
              text={"Yorum Yap"}
              isLoading={isLoading}
            />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

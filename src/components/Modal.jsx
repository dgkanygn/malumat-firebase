import React, { useContext, useEffect, useState } from "react";
import { Button } from "./Button";

// context
import Data from "../context/Data";

// context
import { useNavigate } from "react-router-dom";

// request
import { deletePostReq } from "../requests/Post";
import { deleteCommentReq } from "../requests/Comment";

// firebase
import { db } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const Modal = () => {
  const token = localStorage.getItem("jwt");

  const navigate = useNavigate();

  const {
    showModal,
    setShowModal,
    postComments,
    setPostComments,
    setFeatures,
  } = useContext(Data);

  const closeModal = () => {
    setShowModal({ isShow: false, deleted: "", id: "" });
  };

  const [isLoading, setIsLoading] = useState(false);

  const deleteConfirmation = async () => {
    try {
      if (showModal.deleted === "comment") {
        setIsLoading(true);
        await deleteCommentReq(showModal.id, token);

        const updatedArray = postComments.filter(
          (comment) => comment._id !== showModal.id
        );
        setPostComments(updatedArray);
        setShowModal({ isShow: false, deleted: "", id: "" });

        setIsLoading(false);
      } else if (showModal.deleted === "post") {
        setIsLoading(true);
        // await deletePostReq(showModal.id, token);

        const docRef = doc(db, "posts", showModal.id);
        await deleteDoc(docRef);

        setShowModal({
          isShow: false,
          deleted: "",
          id: "",
        });
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center">
        <div>
          <div
            className="fixed top-0 left-0 w-full h-full bg-slate-900 opacity-70"
            onClick={closeModal}
          ></div>
        </div>
        <div className="bg-white p-7 flex flex-col gap-4 rounded z-50">
          <p>Silmek istediğinize emin misiniz?</p>
          <div className="flex justify-start gap-2">
            <Button
              bg={"bg-red-700"}
              text={"Sil"}
              onClick={deleteConfirmation}
              isLoading={isLoading}
            />
            <Button bg={"bg-blue2"} text={"İptal"} onClick={closeModal} />
          </div>
        </div>
      </div>
    </>
  );
};

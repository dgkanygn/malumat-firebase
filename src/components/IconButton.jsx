import React from "react";

export const IconButton = ({ icon, onClick, favCount, commentLikes }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${
          favCount && "flex items-center gap-2"
        } bg-blue2 px-2 py-1 text-white `}
      >
        <i className={icon}></i>
        <p>{favCount || commentLikes}</p>
      </button>
    </>
  );
};

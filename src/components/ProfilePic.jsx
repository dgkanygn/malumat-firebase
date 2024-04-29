import React from "react";

export const ProfilePic = ({ width = "w-[30px]" }) => {
  const classes = `${width} rounded`;

  return (
    <>
      <img src={pp} className={classes} alt="" />
    </>
  );
};

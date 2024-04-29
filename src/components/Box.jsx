import React from "react";

export const Box = ({ children, bg, padding, margin }) => {
  const classes = `${bg} ${padding} ${margin}`;

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
};

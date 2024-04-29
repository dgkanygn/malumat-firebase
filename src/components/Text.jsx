import React from "react";

export const Text = ({
  children,
  weight,
  size,
  pb,
  color,
  bg,
  padding,
  hover,
}) => {
  const classes = `${weight} ${size} ${pb} ${color} ${bg} ${padding} ${hover}`;

  return (
    <>
      <h1 className={classes}>{children}</h1>
    </>
  );
};

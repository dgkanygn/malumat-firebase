import React from "react";

export const Flex = ({
  children,
  direction,
  align,
  justify,
  gap,
  padding,
  wrap,
  prop1,
  others,
}) => {
  const classes = `flex ${direction} ${align} ${justify} ${gap} ${padding} ${wrap} ${prop1} ${others}`;

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
};

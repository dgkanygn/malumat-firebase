import React from "react";

const formatterDate = (inputDate) => {
  console.log(inputDate);

  const currentDate = new Date();
  const date = new Date(inputDate);

  const timeDifference = currentDate - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}g`;
  } else if (hours > 0) {
    return `${hours}sa`;
  } else if (minutes > 0) {
    return `${minutes}dk`;
  } else {
    return `${seconds}s`;
  }
};

export const Moment = ({ date }) => {
  const formatted = formatterDate(date);

  return (
    <>
      <p>{formatted}</p>
    </>
  );
};

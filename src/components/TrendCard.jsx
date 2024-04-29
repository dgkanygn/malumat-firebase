import React from "react";

// router
import { Link } from "react-router-dom";

// moment
import { Moment } from "./Moment";

// utils
import { filterText } from "../utils/filterText";

export const TrendCard = ({ title, author, date, id, keyId }) => {
  const titleArr = title.split(" ");

  let filteredTitle = filterText(titleArr, 30);

  return (
    <>
      <div class="flex justify-between items-start gap-2">
        <div>
          <p class="bg-blue2 px-3 py-5 text-[35px] w-[55px] flex items-center justify-center text-white ">
            <b>0{keyId + 1}</b>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/post/${id}`}>
            <p class="w-48 text-[15px]">
              <b className="hover:text-slate-700 cursor-pointer">{title}</b>
            </p>
          </Link>
          <div class="flex items-center justify-start gap-2">
            <Link to={`/profile/${author}`}>
              <p className="hover:text-slate-700 cursor-pointer">
                <b>{author}</b>
              </p>
            </Link>
            <Moment date={date} />
          </div>
        </div>
      </div>
    </>
  );
};

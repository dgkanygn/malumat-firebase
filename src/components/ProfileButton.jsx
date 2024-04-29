import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import pic from "../assets/images/pic.jpg";

// context
import Data from "../context/Data";

export const ProfileButton = ({ username, image, toggle }) => {
  const { isLogin, userInfo } = useContext(Data);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    if (toggle) setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const tabs = [
    {
      tab: "Profil",
      path: `/profile/${userInfo.username}`,
    },
    // {
    //   tab: "Ayarlar",
    //   path: "/settings",
    // },
    {
      tab: "Çıkış",
      onClick: logOut,
    },
  ];

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex cursor-pointer items-center justify-start gap-2 p-[7px] rounded-[6px] hover:bg-slate-100"
          onClick={handleToggle}
        >
          <div className="flex-shrink-0 w-[35px] h-[35px]">
            <div className="relative w-full h-full">
              <img
                class="absolute inset-0 w-full h-full object-cover rounded"
                src={image === " " ? pic : image}
                alt=""
              />
            </div>
          </div>
          <p>
            <b>{username}</b>
          </p>
        </div>

        {isOpen && (
          <div className="absolute bg-white top-[50px] right-3 shadow-lg">
            {tabs.map((tab, index) => (
              <Link key={index} to={tab.path}>
                <p
                  onClick={tab.onClick}
                  className="hover:bg-slate-100 p-2 cursor-pointer"
                >
                  {tab.tab}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

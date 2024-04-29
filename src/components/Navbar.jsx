import React, { useEffect, useState, useContext } from "react";

// router
import { Link } from "react-router-dom";

// components
import { ProfileButton } from "./ProfileButton";
import { Button } from "./Button";

// context
import Data from "../context/Data";
import { Container } from "./Container";

export const Navbar = () => {
  const { isLogin, userInfo } = useContext(Data);

  return (
    <>
      <div class="fixed left-0 right-0 top-0 z-40 w-full bg-white shadow-md">
        <Container>
          <div class="flex items-center justify-between">
            <div>
              <Link to={"/"}>
                <h1 class="text-[45px]">
                  <b>m.</b>
                </h1>
              </Link>
            </div>
            <div class="flex items-center gap-10">
              <div></div>

              {isLogin ? (
                <ProfileButton
                  toggle={true}
                  image={userInfo.image}
                  username={userInfo.username}
                />
              ) : (
                <Link to={"/login"}>
                  <Button bg={"bg-blue2"} text={"Giriş Yap"} />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

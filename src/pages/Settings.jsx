import React, { useState } from "react";

// components
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Box } from "../components/Box";
import { Container } from "../components/Container";
import { Flex } from "../components/Flex";
import { Text } from "../components/Text";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabs = [
    // {
    //   name: "Edit Profile",
    //   id: 1,
    // },
    {
      name: "Change Password",
      id: 2,
    },
    {
      name: "Delete Account",
      id: 3,
    },
  ];

  return (
    <>
      <Navbar />

      <Box bg={"bg-blue1"} margin={"mt-[65px]"}>
        <Container>
          <Flex
            direction={"flex-col"}
            align={"items-start"}
            padding={"py-10"}
            gap={"gap-3"}
          >
            <Text weight={"font-bold"} size={"text-[25px]"}>
              Ayarlar
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, qui!
            </Text>
          </Flex>
        </Container>
      </Box>

      <Box padding={"md:p-10 py-5"}>
        <Container>
          <Flex
            direction={"flex-col md:flex-row"}
            justify={"justify-start"}
            align={"items-start"}
            gap={"gap-10"}
          >
            <Box>
              {tabs.map((tab, index) => (
                <p
                  key={index}
                  className={`${
                    activeTab === tab.id ? "bg-blue1" : ""
                  }   p-3 cursor-pointer hover:bg-blue1 text-[19px]`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.name}
                </p>
              ))}
            </Box>
            <Box>
              {activeTab === 1 && (
                <>
                  <Flex
                    direction={"flex-col"}
                    gap={"gap-6"}
                    align={"items-start"}
                  >
                    <Flex direction={"flex-col"}>
                      <Text>Edit Profile Picture</Text>
                      <input type="file" />
                    </Flex>
                    <Flex direction={"flex-col"}>
                      <Text>Edit Username</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Flex direction={"flex-col"}>
                      <Text>Edit Name & Surname</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Flex direction={"flex-col"}>
                      <Text>Edit Bio</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Flex direction={"flex-col"}>
                      <Text>Edit E-Mail</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Button
                      bg={"bg-blue2"}
                      text={"Değişiklikleri Kaydet"}
                      isLoading={isLoading}
                    />

                    {/* <Button
                      bg={"bg-blue2"}
                      onClick={createPost}
                      text={"Yayımla"}
                      isLoading={isLoading}
                    /> */}
                  </Flex>
                </>
              )}
              {activeTab === 2 && (
                <>
                  <Flex
                    direction={"flex-col"}
                    gap={"gap-6"}
                    align={"items-start"}
                  >
                    <Flex direction={"flex-col"}>
                      <Text>Old Password</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Flex direction={"flex-col"}>
                      <Text>New Password</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Flex direction={"flex-col"}>
                      <Text>Confirm New Password</Text>
                      <input
                        className="border border-black outline-none"
                        type="text"
                      />
                    </Flex>
                    <Button
                      bg={"bg-blue2"}
                      text={"Değişiklikleri Kaydet"}
                      isLoading={isLoading}
                    />
                  </Flex>
                </>
              )}
              {activeTab === 3 && (
                <>
                  <Flex
                    direction={"flex-col"}
                    gap={"gap-6"}
                    align={"items-start"}
                  >
                    <Text>This action is irreversible</Text>
                    <Flex direction={"flex-col"}>
                      <Text>Password</Text>
                      <input
                        className="border border-black outline-none"
                        type="password"
                      />
                    </Flex>
                    <Button
                      bg={"bg-blue2"}
                      text={"Hesabı Sil"}
                      isLoading={isLoading}
                    />
                  </Flex>
                </>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

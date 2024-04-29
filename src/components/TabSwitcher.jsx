import React from "react";

export const TabSwitcher = () => {
  return (
    <>
      <div className="flex justify-start items-start gap-10">
        <div className="">
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
        </div>
        <div className="">
          {activeTab === 1 && (
            <>
              <div className="flex flex-col gap-14 items-start">
                {posts.map((post, index) => (
                  <PostCard
                    key={index}
                    title={post.title}
                    subject={post.subject}
                    other={post.other}
                    date={post.date}
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="flex flex-col gap-14 items-start">
                {posts.map((post, index) => (
                  <PostCard
                    key={index}
                    title={post.title}
                    subject={post.subject}
                    other={post.other}
                    date={post.date}
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === 3 && (
            <>
              <div className="flex flex-col gap-14 items-start">
                {posts.map((post, index) => (
                  <PostCard
                    key={index}
                    title={post.title}
                    subject={post.subject}
                    other={post.other}
                    date={post.date}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

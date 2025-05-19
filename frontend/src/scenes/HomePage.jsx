import React from "react";
import ProfileCard from "./homecompo/userhome";
import PostCard from "./homecompo/feed";
import Right from "./homecompo/right";
function HomePage() {
  return (
    <>
      <div className="flex min-h-screen justify-around">
        {/* Left Column - 25% width */}
        <div className="w-1/4">
          <ProfileCard />
        </div>

        {/* Center Column - 50% width with some padding */}
        <div className="w-max px-8">
          <PostCard />
        </div>

        {/* Right Column - 25% width */}
        <div className="w-1/6 justify-end">
          <Right />
        </div>
      </div>
    </>
  );
}

export default HomePage;

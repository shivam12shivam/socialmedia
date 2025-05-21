import React from "react";
import ProfileCard from "./homecompo/userhome";
import PostCard from "./homecompo/feed";
import Right from "./homecompo/right";

function HomePage() {
  return (
    <div className="bg-[#B7D5D4] pt-4 min-h-screen pb-4">
      <div className="flex flex-col lg:flex-row justify-around gap-4 px-4">
        {/* Left Column - ProfileCard */}
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
          <ProfileCard />
        </div>

        {/* Center Column - PostCard */}
        <div className="w-full lg:w-2/4">
          <PostCard />
        </div>

        {/* Right Column - Right Widget */}
        <div className="w-full lg:w-1/4">
          <Right />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

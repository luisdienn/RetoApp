import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../../SideBar";
import FriendshipProfileCard from "../comps/FriendshipProfileCard";
import NavbarMobile from "../../NavBarMobile";

export default function FriendshipProfile({
  user,
  frienduser,
  isfriend,
  totalmatches,
  world_cups,
  friendships,
  friends_of_friends,
  Favicon,
  RetoLogo,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex overflow-hidden h-screen">
      {isMobile ? (
        <div className="">
          <NavbarMobile Favicon={Favicon} RetoLogo={RetoLogo} />
        </div>
      ) : (
        <SideBar
          user={user}
          Favicon={Favicon}
          RetoLogo={RetoLogo}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 px-12 py-48">
          <FriendshipProfileCard
            frienduser={frienduser}
            isfriend={isfriend}
            totalmatches={totalmatches}
            world_cups={world_cups}
            friendships={friendships}
            friends_of_friends={friends_of_friends}
          />
        </div>
      </div>
    </div>
  );
}

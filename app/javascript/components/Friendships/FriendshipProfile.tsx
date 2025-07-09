import AddButton from "../AddButton";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";
import FriendshipProfileCard from "./FriendshipProfileCard";



export default function FriendshipProfile({ user,frienduser, isfriend, Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar
        user={user}
        Favicon={Favicon}
        RetoLogo={RetoLogo}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 p-12">
          <FriendshipProfileCard frienduser={frienduser} isfriend={isfriend} />
        </div>
      </div>
    </div>
  );
}

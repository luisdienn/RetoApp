import React, { useState } from "react";
import NotificationsModal from "./NotificationsModal";
import { FaBell } from "react-icons/fa";
import ShareModal from "./ShareModal";
import PicModal from "./PicModal";
import FriendsModal from "./FriendsModal";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { updateRequest } from "../../../api";
import { InfiniteMovingCards } from "../../ui/infinite-moving-cards";

type ProfileProps = {
  user: any;
  friends?: any[];
  notifications?: any[];
  requesters?: any[];
  world_cups?: number;
  totalmatches?: number;
  badges?: string[];
};

export default function ProfileCard({
  user,
  friends,
  notifications,
  requesters,
  world_cups,
  totalmatches,
  badges,
}: ProfileProps) {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPicModalOpen, setIsPicModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  
  console.log(badges);

  const handleNameChange = async () => {
    const result = await updateRequest(`/current_users/${user.id}`, {
      user: {
        name: name,
      },
    });

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    }
  };


  return (
    <div className="p-6 sm:p-8 bg-black shadow-lg rounded-lg max-w-5xl mx-auto">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Profile Picture */}
        <div className="order-1 md:order-2 flex justify-center md:justify-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#f9e7b8] shadow-lg -mt-20 md:mt-0 flex items-center justify-center bg-[#111]">
            {user.image ? (
              <img
                src={`${user.image}`}
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 sm:h-24 sm:w-24 text-[#f9e7b8]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {/* Edit Photo */}
            <button
              onClick={() => setIsPicModalOpen(true)}
              className="hover:cursor-pointer absolute bottom-0 right-0 transform translate-x-1/64  w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-[#f9e7b8] text-black flex items-center justify-center shadow hover:brightness-110 transition"
              aria-label="Cambiar foto de perfil"
            >
              <FaCamera size={24} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="order-2 md:order-1 grid grid-cols-3 text-[#f9e7b8] items-center mt-8 md:mt-0">
          <a href="/world_cup">
            <div>
              <p className="text-xl font-bold sm:text-2xl">{world_cups || 0}</p>
              <p className="text-sm sm:text-base">WC</p>
            </div>
          </a>
          <a href="/matches">
            <div>
              <p className="text-xl font-bold sm:text-2xl">
                {totalmatches || 0}
              </p>
              <p className="text-sm sm:text-base">Matches</p>
            </div>
          </a>

          <div
            onClick={() => setIsFriendsModalOpen(true)}
            className="hover:cursor-pointer"
          >
            <p className="text-xl font-bold sm:text-2xl">
              {friends?.length || 0}
            </p>
            <p className="text-sm sm:text-base">Friends</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="order-3 flex flex-col sm:flex-row items-center justify-center md:justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-0">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className=" hover:cursor-pointer w-full sm:w-auto py-2 px-6 rounded bg-[#f9e7b8] text-black font-bold uppercase hover:brightness-110 transition shadow-md"
          >
            Share
          </button>
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="relative hover:cursor-pointer w-12 h-12 rounded-full border border-2 border-[#f9e7b8] text-[#f9e7b8] flex items-center justify-center hover:bg-[#f9e7b8] hover:text-black transition shadow-md"
            aria-label="Notifications"
          >
            <FaBell size={20} />

            <span
              className={`absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs min-w-[1.25rem] h-5 flex items-center justify-center px-1 transition 
      ${
        (notifications?.length ?? 0) > 0
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
            >
              {notifications?.length || 0}
            </span>
          </button>
        </div>
      </div>

      {/* Name and Info */}
      <div className="mt-16 relative text-center border-b border-gray-700 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-3xl sm:text-4xl font-semibold text-white bg-transparent text-center w-64 h-12"
          />
          <button
            onClick={handleNameChange}
            className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-[#f9e7b8] text-black rounded hover:brightness-110 transition hover:cursor-pointer"
          >
            <FaPencilAlt size={16} />
          </button>
        </div>

        {/* Email */}
        <p className="text-[#f9e7b8] mt-2">{user.email}</p>
      </div>
      {/* Badges */}
      <div className="mt-10 text-center px-4 sm:px-8 md:px-16">
        <h1 className="text-2xl font-bold text-white">Badges</h1>

        <div className="pt-8 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={badges}
            direction="left"
            speed="slow"
          />
        </div>
      </div>
      <NotificationsModal
        isNotificationModalOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications || []}
        requesters={requesters || []}
      />

      <FriendsModal
        isFriendsModalOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        friends={friends || []}
      />

      <ShareModal
        isShareModalOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        user={user}
      />

      <PicModal
        isPicModalOpen={isPicModalOpen}
        onClose={() => setIsPicModalOpen(false)}
        user={user}
      />
    </div>
  );
}

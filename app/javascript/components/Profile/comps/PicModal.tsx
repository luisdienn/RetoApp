import React, { useState } from "react";
import { updateRequest } from "../../../api";
import { FaTimes } from "react-icons/fa";
type PicModalProps = {
  isPicModalOpen: boolean;
  onClose: () => void;
  user: any;
};

export default function PicModal({
  isPicModalOpen,
  onClose,
  user,
}: PicModalProps) {
  if (!isPicModalOpen) return null;

  const profilePics = [
    "cr7pp.png",
    "messipp.png",
    "neymarpp.jpg",
    "hazardpp.png",
    "laminepp.jpg",
    "mbappepp.jpg",
  ];

  const handlePicChange = async (imgUrl: string) => {
    const result = await updateRequest(`/current_users/${user.id}`, {
      user: {
        image: imgUrl,
      },
    });

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pt-8 pb-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70"></div>{" "}
      <div
        className="relative bg-white p-4 sm:p-6 z-10 rounded-lg shadow-lg w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl hover:cursor-pointer"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Choose Your Player
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {profilePics.map((pic) => {
            const imgUrl = `/assets/ProfilePics/${pic}`;
            return (
              <div
                key={pic}
                className="cursor-pointer border border-gray-300 rounded-full hover:border-[#ddc68b] hover:border-4 w-24 h-24 overflow-hidden flex items-center justify-center"
                onClick={() => handlePicChange(imgUrl)}
              >
                <img
                  src={imgUrl}
                  alt={pic}
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

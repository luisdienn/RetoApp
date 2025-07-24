import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; 
import QRCode from "react-qr-code";

type ShareModalProps = {
  isShareModalOpen: boolean;
  onClose: () => void;
  user: any;
};

export default function ShareModal({
  isShareModalOpen,
  onClose,
  user,
}: ShareModalProps) {
  const [url, setUrl] = useState(
    `http://localhost:3000/friendships/profile/${user.id}`
  );

  if (!isShareModalOpen) return null;

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

        <h2 className="text-xl font-semibold mb-4 text-center">Profile QR</h2>

        <div className="flex justify-center mb-4">
          <QRCode value={url} />
        </div>

        <p className="text-center text-gray-600 text-sm">
          Scan the QR code to access the profile.
        </p>
      </div>
    </div>
  );
}

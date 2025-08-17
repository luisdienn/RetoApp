import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { deleteRequest } from "../../../api";

type DeleteBadgeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  location: any;
};

export default function DeleteLocationModal({
  isOpen,
  onClose,
  location,
}: DeleteBadgeModalProps) {

    
  const handleDelete = async () => {
    try {
      const result = await deleteRequest(`/locations/${location.id}`, {});

      if (result.success && result.redirect_url) {
        window.location.href = result.redirect_url;
      } else if (result.errors) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <ToastContainer theme="dark" />
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Are you sure you want to delete this Location?
        </h2>

        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={onClose}
            className="text-red-700 hover:text-red-600 text-4xl hover:cursor-pointer"
            aria-label="Cancel delete"
          >
            <FaTimesCircle />
          </button>
          <button
            onClick={handleDelete}
            className="text-green-700 hover:text-green-600 text-4xl hover:cursor-pointer"
            aria-label="Confirm delete"
          >
            <FaCheckCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

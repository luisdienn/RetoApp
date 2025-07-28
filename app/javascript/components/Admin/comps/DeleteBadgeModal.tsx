import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { deleteRequest } from "../../../api";

type DeleteBadgeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  badge: any;
};

export default function DeleteBadgeModal({
  isOpen,
  onClose,
  badge,
}: DeleteBadgeModalProps) {
  const handleDelete = async () => {
    try {
      const result = await deleteRequest(`/badges/${badge.id}`, {});

      if (result.success && result.redirect_url) {
        toast.success("Badge deleted successfully");
        window.location.href = result.redirect_url;
      } else if (result.errors) {
        result.errors.forEach((err: string) => toast.error(err));
      }
    } catch (error) {
      toast.error("Failed to delete badge");
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
          Are you sure you want to delete this badge?
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

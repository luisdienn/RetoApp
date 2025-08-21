import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { deleteRequest } from "../../../api";

type DeleteBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: any;
};

export default function DeleteBookModal({
  isOpen,
  onClose,
  book,
}: DeleteBookModalProps) {
  const handleDelete = async () => {

    console.log("ESTOY DENTRO DEL DELETE")
    try {
      const result = await deleteRequest(`/bookings/${book}`, {});

      if (result.success && result.redirect_url) {
        toast.success("Reservation deleted successfully");
        window.location.href = result.redirect_url;
      } else if (result.errors) {
        result.errors.forEach((err: string) => toast.error(err));
      }
    } catch (error) {
      toast.error("Failed to delete reservation");
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
          Are you sure you want to delete this reservation?
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

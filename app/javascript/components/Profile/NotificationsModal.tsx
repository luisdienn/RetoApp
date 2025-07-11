import React, { useState } from "react";
import { updateRequest } from "../../api";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importar los íconos de check y equis

type AddMatchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  notifications?: any[];
  requesters?: any[];
};

export default function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  requesters,
}: AddMatchModalProps) {
  const handleAccept = async (friendshipId: number) => {
    // Lógica para aceptar la solicitud de amistad
    const result = await updateRequest(`/friendships/${friendshipId}`, {
      status: "accepted",
    });

    if (result.success) {
      console.log("Solicitud aceptada");
    }
  };

  const handleReject = async (friendshipId: number) => {
    // Lógica para rechazar la solicitud de amistad
    const result = await updateRequest(`/friendships/${friendshipId}`, {
      status: "rejected",
    });

    if (result.success) {
      console.log("Solicitud rechazada");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div
        className="relative bg-white p-6 z-10 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Notifications</h2>

        <table className="min-w-full table-auto border-collapse">

          <tbody>
            {(notifications ?? []).map((notification, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b ">
                    <a href={`/friendships/profile/${notification.requester_id}`} className="hover:cursor-pointer">
                  {
                    requesters?.find((r) => r.id === notification.requester_id)
                      ?.email.split("@")[0]
                      
                  }
                    </a>

                </td>
                <td className="px-4 py-2 border-b flex gap-2 justify-start">
                  {/* Botón de aceptar con icono de check */}
                  <button

                    onClick={() => handleAccept(notification.id)}
                    className="hover:cursor-pointer w-8 h-8 rounded-full border border-[#d9b46d] text-[#d9b46d] flex items-center justify-center hover:bg-[#d9b46d] hover:text-black transition shadow-md"
                  >
                    <FaCheck size={20} />
                  </button>
                  {/* Botón de rechazar con icono de X */}
                  <button
                    onClick={() => handleReject(notification.id)}
                    className="hover:cursor-pointer w-8 h-8 rounded-full border border-[#d9b46d] text-[#d9b46d] flex items-center justify-center hover:bg-[#d9b46d] hover:text-black transition shadow-md"
                  >
                    <FaTimes size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

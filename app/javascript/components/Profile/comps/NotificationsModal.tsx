import React from "react";
import { updateRequest } from "../../../api";
import { FaCheck, FaTimes } from "react-icons/fa"; 

type NotificationsModalProps = {
  isNotificationModalOpen: boolean;
  onClose: () => void;
  notifications?: any[];
  requesters?: any[];
};

export default function NotificationsModal({
  isNotificationModalOpen,
  onClose,
  notifications,
  requesters,
}: NotificationsModalProps) {
  const handleAccept = async (friendshipId: number) => {
    const result = await updateRequest(`/friendships/${friendshipId}`, {
      status: "accepted",
    });

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    }
  };

  const handleReject = async (friendshipId: number) => {
    const result = await updateRequest(`/friendships/${friendshipId}`, {
      status: "rejected",
    });

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    }
  };

  if (!isNotificationModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div
  className="relative bg-white p-4 sm:p-6 z-10 rounded-lg shadow-lg w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl hover:cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Notifications</h2>

        <table className="min-w-full table-auto border-collapse">
          <tbody>
            <tbody>
              {!notifications || notifications.length === 0 ? (
                <tr>
                  <td className="py-2 text-gray-400">
                   There are no notifications
                  </td>
                </tr>
              ) : (
                (notifications ?? []).map((notification, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2  ">
                      <a
                        href={`/friendships/profile/${notification.requester_id}`}
                        className="hover:cursor-pointer"
                      >
                        {
                          requesters
                            ?.find((r) => r.id === notification.requester_id)
                            ?.email.split("@")[0]
                        }
                      </a>
                    </td>
                    <td className="px-4 py-2 flex gap-2 justify-start">
                      <button
                        onClick={() => handleAccept(notification.id)}
                        className="hover:cursor-pointer w-8 h-8 rounded-full border border-[#d9b46d] text-[#d9b46d] flex items-center justify-center hover:bg-[#d9b46d] hover:text-black transition shadow-md"
                      >
                        <FaCheck size={20} />
                      </button>
                      <button
                        onClick={() => handleReject(notification.id)}
                        className="hover:cursor-pointer w-8 h-8 rounded-full border border-[#d9b46d] text-[#d9b46d] flex items-center justify-center hover:bg-[#d9b46d] hover:text-black transition shadow-md"
                      >
                        <FaTimes size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
}

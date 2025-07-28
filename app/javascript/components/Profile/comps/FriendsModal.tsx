import React from "react";

type FriendsModalProps = {
  isFriendsModalOpen: boolean;
  onClose: () => void;
  friends?: any[];
};

export default function FriendsModal({
  isFriendsModalOpen,
  onClose,
  friends,
}: FriendsModalProps) {
  if (!isFriendsModalOpen) return null;

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

        <h2 className="text-xl font-semibold mb-4">Friends</h2>

        <table className="min-w-full table-auto border-collapse">
          <tbody>
            <tbody>
              {!friends || friends.length === 0 ? (
                <tr>
                  <td className="py-2 text-gray-400" colSpan={2}>
                    No friends added
                  </td>
                </tr>
              ) : (
                (friends ?? []).map((friend, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 flex justify-center items-center">
                      <a
                        href={`/friendships/profile/${friend.id}`}
                        className="hover:cursor-pointer flex flex-col items-center"
                      >
                        {friend.image ? (
                          <img
                            src={friend.image}
                            alt={friend.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-[#ddc68b]"
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
                      </a>
                    </td>
                    <td className="px-4 py-2 text-left">
                      <a
                        href={`/friendships/profile/${friend.id}`}
                        className="hover:cursor-pointer flex flex-col items-left"
                      >
                        <p>{friend.email.split("@")[0]}</p>
                      </a>
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

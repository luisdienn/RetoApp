import React, { useState, useEffect } from "react";
import { updateRequest } from "../../../api";
import { toast, ToastContainer } from "react-toastify";
import { RiLoader4Line } from "react-icons/ri";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: any;
};

export default function EditUserModal({
  isOpen,
  onClose,
  user,
}: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [modalErrors, setModalErrors] = useState<string[]>([]);

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setRole(user.role || "");
    setActive(Boolean(user.active));
  }, [user]);

  useEffect(() => {
    if (name !== "" && email !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const resultt = await updateRequest(`/current_users/${user.id}`, {
      user: {
        name,
        email,
        role,
        active,
      },
    });
    setLoading(false);

    if (resultt.success && resultt.redirect_url) {
      window.location.href = resultt.redirect_url;
    } else {
      setModalErrors(resultt.errors || ["Unknown error."]);
      setTimeout(() => {
        setModalErrors([]);
      }, 5000);
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
        className="relative bg-white p-4 sm:p-6 z-10 rounded-lg shadow-lg w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                User State
              </label>
              <select
                name="active"
                value={active}
                onChange={(e) => setActive(e.target.value === "true")}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Display errors above the login button */}
          {modalErrors.length > 0 && (
            <div className="text-red-500 text-sm text-center pb-2">
              {modalErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-12 py-2 rounded text-black font-bold ${
                disable
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-[#ddc68b]  hover:brightness-110 cursor-pointer"
              } `}
              disabled={loading ? true : disable}
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <div className="cursor-not-allowed">
                    <RiLoader4Line className="loader text-2xl" />
                  </div>
                ) : (
                  "Edit User"
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { updateRequest } from "../../api";
import { toast, ToastContainer } from "react-toastify";


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

  console.log(user);

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setRole(user.role || "");
    setActive(Boolean(user.active));
  }, [user]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultt = await updateRequest(`/current_users/${user.id}`, {
      user: {
        name,
        email,
        role,
        active,
      },
    });

    if (resultt.success && resultt.redirect_url) {
      window.location.href = resultt.redirect_url;
    }

  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8"
      onClick={onClose}
    >
            <ToastContainer position="top-right" autoClose={5000} theme="dark"/>

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

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#ddc68b] text-black font-bold rounded hover:brightness-110 cursor-pointer"
            >
              Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

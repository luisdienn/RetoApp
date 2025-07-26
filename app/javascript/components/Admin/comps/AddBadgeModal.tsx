import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { RiImageAddLine } from "react-icons/ri";

type AddMatchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddBadgeModal({ isOpen, onClose }: AddMatchModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("badge[name]", name);
    formData.append("badge[description]", description);
    if (image instanceof File) {
      formData.append("badge[image]", image);
    }

    try {
      const response = await fetch("/badges", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRF-Token":
            document
              .querySelector('meta[name="csrf-token"]')
              ?.getAttribute("content") || "",
        },
      });

      const resultt = await response.json();

      if (resultt.success && resultt.redirect_url) {
        window.location.href = resultt.redirect_url;
      } else if (resultt.errors) {
        resultt.errors.forEach((err: string) => toast.error(err));
      }
    } catch (error) {
      toast.error("Upload failed.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8"
      onClick={onClose}
    >
      <ToastContainer theme="dark" />

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

        <h2 className="text-xl font-semibold mb-4">Add Badge</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="opponent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Image
            </label>

            <div
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-white text-gray-500 hover:border-[#ddc68b] hover:bg-[#fdf9ee] transition cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (
                  file &&
                  (file.type === "image/png" || file.type === "image/jpeg")
                ) {
                  setImage(file);
                } else {
                  toast.error("Only JPG and PNG files are allowed.");
                }
              }}
              onClick={() =>
                document.getElementById("badge-image-upload")?.click()
              }
            >
              <RiImageAddLine className="text-3xl mb-2" />
              <p className="text-sm text-center">
                Click or drag & drop image here (JPG/PNG)
              </p>
              {image && (
                <p className="text-xs mt-2 text-gray-600 truncate max-w-full">
                  Selected: {image.name}
                </p>
              )}
            </div>

            <input
              id="badge-image-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (
                  file &&
                  (file.type === "image/png" || file.type === "image/jpeg")
                ) {
                  setImage(file);
                } else {
                  toast.error("Only JPG and PNG files are allowed.");
                  e.target.value = "";
                }
              }}
              className="hidden"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#ddc68b] text-black font-bold rounded hover:brightness-110 cursor-pointer"
            >
              Add Badge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

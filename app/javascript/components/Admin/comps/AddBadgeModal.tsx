import React, { useState, useEffect } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { RiLoader4Line } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";

type AddMatchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddBadgeModal({ isOpen, onClose }: AddMatchModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [valueAux1, setValueAux1] = useState("");
  const [valueAux2, setValueAux2] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [modalErrors, setModalErrors] = useState<string[]>([]);

  useEffect(() => {
    if (type != "world_cups_won") {
      if (
        name !== "" &&
        description !== "" &&
        valueAux1 !== "" &&
        valueAux2 !== "" &&
        image != null
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else{
            if (
        name !== "" &&
        description !== "" &&
        value !== "" &&
        image != null
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [name, description, type, value,valueAux1,valueAux2, image]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);

    e.preventDefault();

    let finalValue = "";
    if (type === "world_cups_won") {
      finalValue = value + "+";
    } else {
      finalValue = valueAux1 + ".." + valueAux2;
    }

    const formData = new FormData();
    formData.append("badge[name]", name);
    formData.append("badge[description]", description);
    formData.append("badge[condition_type]", type);
    formData.append("badge[condition_value]", finalValue);
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

      setLoading(false);

      const resultt = await response.json();

      if (resultt.success && resultt.redirect_url) {
        window.location.href = resultt.redirect_url;
      }
    } catch (error) {
      console.error(error);
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
              rows={1}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Condition</option>
              <option value="matches_played">Matches Played</option>
              <option value="goals_scored">Goals Scored</option>
              <option value="world_cups_won">World Cup Won</option>
            </select>
          </div>

          {type === "world_cups_won" ? (
            <div className="mb-4 ">
              <label className="block text-sm font-medium mb-1 flex">
                Value
                <span className="ml-2 relative group cursor-pointer">
                  <span className="flex pt-1">
                    <FaRegCircleQuestion />
                  </span>
                  {/* Tooltip content */}
                  <span className="absolute left-1/2 transform bottom-full mb-2 hidden group-hover:block text-sm text-white bg-black px-4 py-2 rounded shadow-lg w-max max-w-xs">
                    <ul>
                      <li>
                        Badge awarded when user's stat is this value or higher.
                      </li>
                    </ul>
                  </span>
                </span>
              </label>
              <input
                name="value"
                value={value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d+$/.test(newValue) || newValue === "") {
                    const auxValue = newValue;
                    setValue(auxValue);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 flex">
                Value
                <span className="ml-2 relative group cursor-pointer">
                  <span className="flex pt-1">
                    <FaRegCircleQuestion />
                  </span>
                  {/* Tooltip content */}
                  <span className="absolute left-1/2 transform bottom-full mb-2 hidden group-hover:block text-sm text-white bg-black px-4 py-2 rounded shadow-lg w-max max-w-xs">
                    <ul>
                      <li>
                        Badge awarded when user's stats are between this values.
                      </li>
                    </ul>
                  </span>
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  value={valueAux1}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (/^\d+$/.test(newValue) || newValue === "") {
                      setValueAux1(newValue);
                    }
                  }}
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
                <span className="font-bold pt-2">-</span>
                <input
                  value={valueAux2}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (/^\d+$/.test(newValue) || newValue === "") {
                      setValueAux2(newValue);
                    }
                  }}
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Image
            </label>

            <div
              className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg bg-white text-gray-500 hover:border-[#ddc68b] hover:bg-[#fdf9ee] transition cursor-pointer"
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
                  setModalErrors(["Only JPG and PNG files are allowed."]);
                  setTimeout(() => {
                    setModalErrors([]);
                  }, 5000);
                }
              }}
              onClick={() =>
                document.getElementById("badge-image-upload")?.click()
              }
            >
              <RiImageAddLine className="text-3xl mb-2" />

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
                  setModalErrors(["Only JPG and PNG files are allowed."]);
                  setTimeout(() => {
                    setModalErrors([]);
                  }, 5000);
                  e.target.value = "";
                }
              }}
              className="hidden"
              required
            />
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
                  "Add Badge"
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

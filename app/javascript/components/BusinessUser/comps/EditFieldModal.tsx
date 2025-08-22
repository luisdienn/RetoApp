import React, { useState, useEffect } from "react";
import { updateRequest } from "../../../api";
import { RiLoader4Line } from "react-icons/ri";

type AddFieldModalProps = {
  isOpen: boolean;
  onClose: () => void;
  location: any;
  field: any;
};

export default function EditFieldModal({
  isOpen,
  onClose,
  location,
  field,
}: AddFieldModalProps) {
  const [name, setName] = useState(field.name);
  const [size, setSize] = useState(field.size);
  const [price, setPrice] = useState(field.price);
  const [minutes, setMinutes] = useState(field.slot_length_mins);
  const [active, setActive] = useState(field.active);

  useEffect(() => {
    setName(field.name);
    setSize(field.size);
    setPrice(field.price);
    setMinutes(field.slot_length_mins);
    setActive(field.active);
  }, [field]);

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      name != "" &&
      size != "" &&
      price != "" &&
      minutes != "" 
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, size, price, minutes]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);

    e.preventDefault();

    const resultt = await updateRequest(`/fields/${field.id}`, {
      field: {
        location_id: location.id,
        name,
        size,
        price,
        slot_length_mins: minutes,
        active: active,
      },
    });
    setLoading(false);

    if (resultt.success && resultt.redirect_url) {
      window.location.href = resultt.redirect_url;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  pt-8 pb-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div
        className="relative bg-white p-6 z-10 rounded-lg shadow-lg w-md max-h-[90vh] overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {field.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Field 1"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <select
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="5v5">5v5</option>
                <option value="7v7">7v7</option>
                <option value="9v9">9v9</option>
                <option value="11v11">11v11</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>

              <label className="block text-sm font-medium mb-1">
                Slots (Minutes)
              </label>
              <select
                name="minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >

                <option value={60}>60</option> 
                <option value={120}>120</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Is field active?</label>
              <select
                name="active"
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

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
                  "Edit Field"
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

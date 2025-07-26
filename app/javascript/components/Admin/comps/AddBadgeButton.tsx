import React from "react";
import { FaPlus } from "react-icons/fa";

type AddButtonProps = {
  onClick?: () => void;
}

export default function AddButton({onClick}: AddButtonProps) {
  return (
    <button onClick={onClick} className="bg-white text-black shadow-md px-3 py-3 rounded-full transition-colors duration-300 hover:bg-[#f9e7b8] hover:cursor-pointer">
      <FaPlus className="text-xs" />
    </button>
  );
}

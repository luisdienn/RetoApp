import React from "react";
import { FaCalendarCheck } from "react-icons/fa";

type FilterButtonProps = {
  onClick?: () => void;
}

export default function FilterButton({onClick}: FilterButtonProps) {
  return (
    <button onClick={onClick} className="bg-white text-black shadow-md px-3 py-3 rounded-full transition-colors duration-300 hover:bg-[#f9e7b8] hover:cursor-pointer">
      <FaCalendarCheck   className="text-xs" />
    </button>
  );
}

import React from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {


  return (
    <div className="flex items-center bg-white  rounded-full px-4 py-2 shadow-md w-full ">
      <FaSearch className="text-[#D4AF37] mr-3" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent focus:outline-none text-black placeholder-gray-400 pl-2"
      />
    </div>
  );
}

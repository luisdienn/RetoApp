import { FaPlus } from "react-icons/fa";

export default function AddButton() {
  return (
    <button className="bg-white text-black shadow-md px-3 py-3 rounded-full transition-colors duration-300 hover:bg-gold-side">
      <FaPlus className="text-xs" />
    </button>
  );
}

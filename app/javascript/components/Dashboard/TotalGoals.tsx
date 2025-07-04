import { FaFutbol } from "react-icons/fa";

export default function TotalGoals() {
    return (
        <div className="items-center justify-center text-center">
            <FaFutbol className="text-4xl text-gold-side mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">330</h2>
            <p className="text-gold-side">Total Goals</p>
        </div>
    )
}
import { FaTrophy } from "react-icons/fa";

export default function TotalMatches() {
    return (
        <div className="items-center justify-center text-center">
            <FaTrophy className="text-4xl text-gold-side mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">2</h2>
            <p className="text-gold-side">World Cups</p>
        </div>
    )
}
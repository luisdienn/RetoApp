import { GiSoccerField } from "react-icons/gi";

export default function TotalMatches() {
    return (
        <div className="items-center justify-center text-center">
            <GiSoccerField className="text-4xl text-gold-side mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">230</h2>
            <p className="text-gold-side">Total Matches</p>
        </div>
    )
}
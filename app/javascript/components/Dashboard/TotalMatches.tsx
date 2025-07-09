import React from "react";

import { GiSoccerField } from "react-icons/gi";

export default function TotalMatches({totalmatches}:any) {
    return (
        <div className="items-center justify-center text-center">
            <GiSoccerField className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">{totalmatches}</h2>
            <p className="text-[#f9e7b8]">Total Matches</p>
        </div>
    )
}
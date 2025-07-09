import React from "react";

import { FaTrophy } from "react-icons/fa";

export default function TotalMatches({world_cups}: any) {
    return (
        <div className="items-center justify-center text-center">
            <FaTrophy className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">{world_cups || 0}</h2>
            <p className="text-[#f9e7b8]">World Cups</p>
        </div>
    )
}
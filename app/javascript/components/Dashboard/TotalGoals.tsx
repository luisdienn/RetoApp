import React from "react";

import { FaFutbol } from "react-icons/fa";

export default function TotalGoals() {
    return (
        <div className="items-center justify-center text-center">
            <FaFutbol className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">330</h2>
            <p className="text-[#f9e7b8]">Total Goals</p>
        </div>
    )
}
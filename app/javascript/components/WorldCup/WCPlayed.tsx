import { GiSoccerKick  } from "react-icons/gi";
import React from 'react';


export default function TotalMatches({totalwc}: any) {
    return (
        <div className="items-center justify-center text-center">
            <GiSoccerKick className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">{totalwc || 0}</h2>
            <p className="text-[#f9e7b8]">World Cups Played</p>
        </div>
    )
}
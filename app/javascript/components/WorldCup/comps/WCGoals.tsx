import { FaFutbol } from "react-icons/fa";
import React from 'react';

export default function WCGoals({goals}:any){
    return(
        <div className="text-center">
            <FaFutbol className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">{goals || 0}</h2>
            <p className="text-[#f9e7b8]">Current World Cup Goals</p>
        </div>
    );
}
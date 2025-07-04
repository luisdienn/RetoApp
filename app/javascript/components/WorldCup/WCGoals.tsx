import { FaFutbol } from "react-icons/fa";
import React from 'react';

export default function WCGoals(){
    return(
        <div className="text-center">
            <FaFutbol className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">3</h2>
            <p className="text-[#f9e7b8]">Goals</p>
        </div>
    );
}
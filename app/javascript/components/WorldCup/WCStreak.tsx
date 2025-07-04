import { GiFireDash  } from "react-icons/gi";
import React from 'react';



export default function WCStreak(){
    return(
        <div className="text-center">
            <GiFireDash className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">3</h2>
            <p className="text-[#f9e7b8]">Winning Streak</p>
        </div>
    );
}
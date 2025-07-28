import React from "react";

import { MdCalendarMonth   } from "react-icons/md";

export default function UsersMonth({allusers}:any) {
    
    const month = new Date().toLocaleString('default', {month: 'long'});

    const monthaux = new Date().getMonth();
    
    

    const newCount = allusers.filter(user => {
        const userMonth = new Date(user.created_at).getMonth();
        return userMonth ===monthaux;
    }).length;

    return (
        <div className="items-center justify-center text-center">
            <MdCalendarMonth  className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">{newCount}</h2>
            <p className="text-[#f9e7b8]">New Users in {month}</p>
        </div>
    )
}
import React from "react";

import { LiaUserCheckSolid   } from "react-icons/lia";

export default function ActiveUsers({allusers}:any) {

    const activeCount = allusers.filter(user => user.active).length;

    return (
        <div className="items-center justify-center text-center">
            <LiaUserCheckSolid className="text-4xl text-[#f9e7b8] mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-white">{activeCount}</h2>
            <p className="text-[#f9e7b8]">Active Users</p>
        </div>
    )
}
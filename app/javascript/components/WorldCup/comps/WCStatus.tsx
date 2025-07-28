import React from 'react';

export default function WCStatus({currentwc}: any) {
    return(
            <>
      <h2 className="text-2xl font-bold text-white mb-6">World Cup Fase:</h2>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400">{currentwc.current_stage || "None"}</span>
      </div>
    </>
    );
}
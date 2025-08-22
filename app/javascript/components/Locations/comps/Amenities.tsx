import React from "react";

export default function PhoneShift({ location }: any) {
  return (
    <div>
      <p className="font-bold text-lg pb-4">Amenities</p>
      <div className="px-6 pt-2 pb-2 gap-2">
        {location.tags?.map((tag: any) => (
          <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

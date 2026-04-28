import React from "react";

const PersonalOverviewSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-9 w-24 bg-gray-200 rounded-md"></div>
      </div>
      <div className="relative h-72 w-full bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-end px-4 pb-6 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`bg-gray-300 rounded w-full h-70`}></div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default PersonalOverviewSkeleton;
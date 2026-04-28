const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-pulse">
      
      {/* Card 1 */}
      <div className="bg-[#F6F7FD] py-6 px-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
        <div className="w-12.5 h-12.5 bg-gray-300 rounded"></div>
        <div className="flex flex-col justify-center gap-3 w-full">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-[#F6F7FD] py-6 px-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
        <div className="w-12.5 h-12.5 bg-gray-300 rounded"></div>
        <div className="flex flex-col justify-center gap-3 w-full">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>

      {/* Card 3 (Impression + CTR) */}
      <div className="bg-[#F6F7FD] py-6 px-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
        <div className="w-12.5 h-12.5 bg-gray-300 rounded"></div>
        <div className="flex flex-col justify-center space-y-4 w-full">
          <div className="h-6 bg-gray-300 rounded w-40 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-28 mx-auto"></div>
        </div>
      </div>

    </div>
  );
};

export default DashboardStatsSkeleton;
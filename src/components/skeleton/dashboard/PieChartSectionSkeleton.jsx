const PieChartSectionSkeleton = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm w-1/2 animate-pulse">
      <div className="mb-4">
        <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-72 bg-gray-200 rounded"></div>
      </div>
      <div className="w-full">
        <div className="relative h-130 w-full flex items-center justify-center">
          {/* Fake Pie Circle */}
          <div className="w-55 h-55 rounded-full border-20 border-gray-200"></div>

          <div className="absolute">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartSectionSkeleton;
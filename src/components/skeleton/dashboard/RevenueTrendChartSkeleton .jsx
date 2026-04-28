const RevenueTrendChartSkeleton = () => {
  const barHeights = [
    60, 90, 70, 120, 80, 140,
    100, 110, 75, 130, 95, 115,
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm w-1/2 animate-pulse">
      <div className="h-6 w-64 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-96 bg-gray-200 rounded mb-6"></div>
      <div className="h-64 flex items-end justify-between gap-3">
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-gray-200 rounded-t-md"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default RevenueTrendChartSkeleton;
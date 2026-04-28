const AddDealSkeleton = () => {
  return (
    <div className="bg-white min-h-screen px-4 pt-28 pb-12">
      <div className="max-w-305 mx-auto">
        <h1 className="text-[#262626] text-2xl sm:text-[32px] font-bold pb-6">
          <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md"></div>
        </h1>
        <form>
          {/* Media and Deal Pricing Skeleton */}
          <div className="flex flex-col md:flex-row gap-12.5">
            <div className="w-full md:w-1/2 space-y-6 animate-pulse">
              <div className="h-40 bg-gray-300 rounded-lg"></div>
              <div className="h-8 w-48 bg-gray-300 rounded-md"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-3 lg:space-y-6">
              {/* Regular Price */}
              <div className="space-y-3">
                <div className="h-6 w-48 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-12 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
              {/* Discount */}
              <div className="space-y-3">
                <div className="h-6 w-80 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-12 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
              {/* Final Price */}
              <div className="space-y-3">
                <div className="h-6 w-80 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-12 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Deal Info and Plan Skeleton */}
          <div className="flex flex-col md:flex-row gap-12.5">
            <div className="w-full md:w-1/2 space-y-6 animate-pulse">
              <div className="h-6 w-48 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="h-12 bg-gray-300 rounded-md"></div>
              <div className="h-6 w-48 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="h-12 bg-gray-300 rounded-md"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 animate-pulse">
              {/* Deal Category */}
              <div className="h-6 w-48 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="h-12 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealSkeleton;
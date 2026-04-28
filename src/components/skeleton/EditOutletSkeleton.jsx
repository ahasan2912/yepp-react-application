const EditOutletSkeleton = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-5 pt-32 pb-12">
      <div className="w-full max-w-3xl rounded-3xl border border-gray-300 bg-white p-6 md:p-8 animate-pulse">
        {/* Title */}
        <div className="h-8 w-40 rounded-md bg-gray-200 mb-6" />

        {/* Outlet Name */}
        <div className="mb-5">
          <div className="h-5 w-28 rounded bg-gray-200 mb-3" />
          <div className="h-12 w-full rounded-full bg-gray-200" />
        </div>

        {/* Outlet Address */}
        <div className="mb-5">
          <div className="h-5 w-36 rounded bg-gray-200 mb-3" />
          <div className="h-12 w-full rounded-full bg-gray-200" />
        </div>

        {/* Outlet Location */}
        <div className="mb-5">
          <div className="h-5 w-36 rounded bg-gray-200 mb-3" />
          <div className="h-72 w-full rounded-2xl bg-gray-200" />
        </div>

        {/* Zip Code */}
        <div className="mb-8">
          <div className="h-5 w-24 rounded bg-gray-200 mb-3" />
          <div className="h-12 w-full rounded-full bg-gray-200" />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <div className="h-12 w-56 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default EditOutletSkeleton;
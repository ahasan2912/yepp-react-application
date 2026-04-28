const CategoriesSkeleton = () => {
    return (
        <div className="space-y-4 mt-5">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
                >
                    <div className="flex items-center space-x-4 w-1/3">
                        {/* Skeleton for Category Image */}
                        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                        {/* Skeleton for Category Name */}
                        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-4 w-1/3">
                        {/* Skeleton for Action Buttons */}
                        <div className="w-16 h-8 bg-gray-300 rounded-md animate-pulse"></div>
                        <div className="w-16 h-8 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoriesSkeleton;
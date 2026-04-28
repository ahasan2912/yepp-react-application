const DealDetailsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto pt-40 px-4 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="w-full h-95 bg-gray-200 rounded-xl"></div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-16 h-12 bg-gray-200 rounded-md"></div>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-24 bg-gray-200 rounded"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-12 w-40 bg-gray-200 rounded-full"></div>
                        <div className="h-12 w-48 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="space-y-4 pt-4">
                        <div className="h-5 w-40 bg-gray-200 rounded"></div>

                        <div className="grid grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                                    <div className="h-3 bg-gray-200 w-20 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 pt-4">
                        <div className="h-5 w-32 bg-gray-200 rounded"></div>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                        ))}
                    </div>
                    <div className="space-y-3 pt-4">
                        <div className="h-5 w-36 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealDetailsSkeleton;
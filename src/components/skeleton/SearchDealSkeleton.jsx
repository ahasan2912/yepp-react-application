import { MapPin } from 'lucide-react';

const SearchDealSkeleton = () => {
    return (
        <div className="bg-gray-50 min-h-screen px-4 py-12.5">
            <div className="max-w-305 mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#262626]">Search Result</h2>
                    <div className="flex gap-2 items-center text-primary text-base font-semibold">
                        <MapPin size={18} /> <span>New York, United States</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        Array.from({ length: 8 }).map((d, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
                                {/* Image */}
                                <div className="relative h-48 w-full bg-gray-200" />
                                <div className="p-4">
                                    {/* Title */}
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>

                                    {/* Shop */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex gap-2 items-center">
                                            <div className="h-5 w-16 bg-gray-200 rounded"></div>
                                            <div className="h-4 w-10 bg-gray-200 rounded"></div>
                                        </div>

                                        <div className="h-4 w-14 bg-gray-200 rounded"></div>
                                    </div>

                                    {/* Button */}
                                    <div className="mt-4 h-10 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchDealSkeleton;
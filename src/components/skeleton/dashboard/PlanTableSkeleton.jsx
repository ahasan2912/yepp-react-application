import React from 'react';

const PlanTableSkeleton = () => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Image</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Name</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Price</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Duration</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {/* Loading Skeleton */}
                    <tr className="animate-pulse">
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </td>
                        <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-3">
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </td>
                    </tr>
                    <tr className="animate-pulse">
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </td>
                        <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-3">
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PlanTableSkeleton;
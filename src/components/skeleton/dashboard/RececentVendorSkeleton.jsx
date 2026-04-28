import React from 'react';
import HeadingTitle from '../../../pages/dashboard/admin-dashboard/components/HeadingTitle';

const RececentVendorSkeleton = () => {
    return (
        <div className="min-h-screen pt-3 pb-5">
            {/* Header */}
            <HeadingTitle
                title='Recent Vendors'
                description='Latest vendor applications'
            />

            {/* Top Stat Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="rounded-lg bg-white p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-full">
                                <div className="h-5 w-32 rounded bg-gray-200" />
                                <div className="mt-5 h-10 w-24 rounded bg-gray-200" />
                                <div className="mt-4 h-5 w-28 rounded bg-gray-200" />
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="mt-8 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                {/* Table Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="h-7 w-44 rounded bg-gray-200" />
                        <div className="mt-3 h-5 w-40 rounded bg-gray-200" />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="h-11 w-full rounded-xl bg-gray-200 sm:w-64" />
                        <div className="h-11 w-full rounded-xl bg-gray-200 sm:w-32" />
                    </div>
                </div>

                {/* Table Head */}
                <div className="hidden grid-cols-6 gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 md:grid">
                    <div className="h-5 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-32 rounded bg-gray-200" />
                    <div className="h-5 w-16 rounded bg-gray-200" />
                    <div className="h-5 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-16 rounded bg-gray-200 justify-self-end" />
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div
                            key={row}
                            className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-6 md:items-center"
                        >
                            {/* Shop */}
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-gray-200" />
                                <div className="flex-1">
                                    <div className="h-5 w-40 rounded bg-gray-200" />
                                    <div className="mt-2 h-4 w-32 rounded bg-gray-200" />
                                </div>
                            </div>

                            {/* Vendor Username */}
                            <div className="h-5 w-28 rounded bg-gray-200" />

                            {/* Deals */}
                            <div className="h-5 w-10 rounded bg-gray-200" />

                            {/* Status */}
                            <div className="h-8 w-24 rounded-full bg-gray-200" />

                            {/* Revenue */}
                            <div className="h-5 w-16 rounded bg-gray-200" />

                            {/* Action */}
                            <div className="flex justify-start md:justify-end">
                                <div className="h-6 w-6 rounded bg-gray-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RececentVendorSkeleton;
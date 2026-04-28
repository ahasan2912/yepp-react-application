const VendorFormSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#f8f8f8] px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl animate-pulse">
                {/* Header */}
                <div className="mb-10">
                    <div className="h-10 w-80 rounded-md bg-gray-300" />
                    <div className="mt-3 h-5 w-105 rounded-md bg-gray-200" />
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Column */}
                    <div>
                        <div className="mb-8 h-9 w-56 rounded-md bg-[color-mix(in_srgb,var(--primary-color)_25%,white)]" />

                        {/* Business Name */}
                        <div className="mb-8">
                            <div className="mb-3 h-6 w-40 rounded bg-gray-300" />
                            <div className="h-14 w-full rounded-full border border-gray-200 bg-gray-100" />
                        </div>

                        {/* Business Logo */}
                        <div className="mb-8">
                            <div className="mb-4 h-6 w-36 rounded bg-gray-300" />
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="h-40 w-32 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100" />
                                <div className="flex-1">
                                    <div className="mb-4 h-4 w-40 rounded bg-gray-200" />
                                    <div className="h-12 w-52 rounded-full bg-[color-mix(in_srgb,var(--primary-color)_25%,white)]" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <div className="mb-3 h-6 w-44 rounded bg-gray-300" />
                            <div className="h-40 w-full rounded-2xl border border-gray-200 bg-gray-100" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-8 h-9 w-60 rounded-md bg-[color-mix(in_srgb,var(--primary-color)_25%,white)]" />

                        {/* Business Email */}
                        <div className="mb-8">
                            <div className="mb-3 h-6 w-40 rounded bg-gray-300" />
                            <div className="h-14 w-full rounded-full border border-gray-200 bg-gray-100" />
                        </div>

                        {/* Phone */}
                        <div className="mb-8">
                            <div className="mb-3 h-6 w-32 rounded bg-gray-300" />
                            <div className="flex h-14 w-full overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                                <div className="w-24 border-r border-gray-200 bg-gray-200" />
                                <div className="flex-1 bg-gray-100" />
                            </div>
                        </div>

                        {/* Website */}
                        <div className="mb-8">
                            <div className="mb-3 h-6 w-52 rounded bg-gray-300" />
                            <div className="h-14 w-full rounded-full border border-gray-200 bg-gray-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorFormSkeleton;

const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
    );
};

export default function PromoteDealSkeleton() {
    return (
        <div className="bg-white min-h-screen px-4 pt-28 pb-12">
            <div className="max-w-300 mx-auto">
                <Skeleton className="h-8 w-60 mb-10" />
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div>
                            <Skeleton className="h-5 w-32 mb-3" />
                            <Skeleton className="h-4 w-72 mb-4" />
                            <Skeleton className="h-12 w-full rounded-full" />
                        </div>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-lg" />
                                    <Skeleton className="h-5 w-40" />
                                </div>

                                <Skeleton className="h-5 w-10" />
                            </div>
                        ))}
                        <Skeleton className="h-12 w-40 rounded-full mt-6" />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-5 w-32 mt-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
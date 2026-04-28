import HeadingTitle from "../../../pages/dashboard/admin-dashboard/components/HeadingTitle";

const DashboardCardsSkeleton = () => {
    return (
        <div className="pt-3 pb-5">
            <HeadingTitle
                title='Admin Dashboard Overview'
                description='Welcome back! Here’s what’s happening on your platform'
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="rounded-2xl bg-white p-5 shadow-sm animate-pulse"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="h-5 w-28 rounded bg-gray-200" />
                                <div className="mt-4 h-10 w-24 rounded bg-gray-300" />
                                <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
                            </div>
                            <div className="ml-4 h-16 w-16 rounded-xl bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCardsSkeleton;
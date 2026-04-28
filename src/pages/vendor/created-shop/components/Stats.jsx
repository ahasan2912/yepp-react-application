import { images } from "../../../../assets/image";
import DashboardStatsSkeleton from "../../../../components/skeleton/DashboardStatsSkeleton";
import { useGetShopAnalyticsStatQuery } from "../../../../features/shop/shopApi";
import StatCard from "./StatCard";

const Stats = () => {
    const { data: analytics, isLoading } = useGetShopAnalyticsStatQuery();
    if (isLoading) {
        return <DashboardStatsSkeleton />
    }
    const { activeDeals, totalViews, totalImpressions } = analytics?.data || {};
    const ctr = totalImpressions > 0
        ? ((totalViews / totalImpressions) * 100).toFixed(2)
        : 0;
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8" data-animate="stagger">
            <StatCard icon={images.activeIcon} label="Active Deals" value={activeDeals} />
            <StatCard icon={images.totalView} label="Total Views" value={totalViews} />
            <div className="bg-[#F6F7FD] py-4 sm:py-6 px-3 sm:px-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div>
                    <img className='w-9 sm:w-12.5' src={images.impression} alt="statIcon" />
                </div>
                <div className='text-center space-y-2 sm:space-y-4'>
                    <p className="text-primary text-base sm:text-2xl font-bold">Total Impression: {totalImpressions || 0}</p>
                    <p className="text-[#262626] text-base sm:text-2xl font-bold">{ctr || 0}%  <span className="text-yellow-500 text-base sm:text-2xl font-bold ml-1 sm:ml-2">CTR</span></p>
                </div>
            </div>
        </div>
    );
};

export default Stats;

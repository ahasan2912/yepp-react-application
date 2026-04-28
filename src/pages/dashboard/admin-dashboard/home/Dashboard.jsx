
import { StatCardFour, StatCardOne, StatCardThree, StatCardTwo } from './components/StatCard';
import PieChartSection from './components/PieChartSection';
import { Store, Tag } from 'lucide-react';
import ListCard from './components/ListCard';
import HeadingTitle from '../components/HeadingTitle';
import { useGetAnalyticsQuery, useGetRecentDealsListQuery } from '../../../../features/dashboard/dashboardHome';
import DashboardCardsSkeleton from '../../../../components/skeleton/dashboard/DashboardCardsSkeleton';
import RevenueTrendChart from './components/RevenueTrendChart';
import VendorManagementSkeleton from '../../../../components/skeleton/dashboard/VendorManagementSkeleton';
import RecentDealCard from './components/RecentDealCard';
import AdminPorfile from '../../../../components/dashboard/AdminPorfile';

const Dashboard = () => {
    const { data: totalAnalytics, isLoading: analyticsLoading } = useGetAnalyticsQuery();
    const { data: reacentDeals, isLoading: recentdealDetailLoading } = useGetRecentDealsListQuery();

    if (analyticsLoading) {
        return <DashboardCardsSkeleton />
    }
    if (recentdealDetailLoading) {
        return <VendorManagementSkeleton />;
    }

    const { active_vendors, active_deals, total_revenue, last30Days_Revenue } = totalAnalytics?.data || {};
    return (
        <div className="min-h-screen pt-3 pb-5" data-animate="dashboard">
            <div className='flex justify-between items-center relative'>
                <HeadingTitle
                    title='Admin Dashboard Overview'
                    description='Welcome back! Here’s what’s happening on your platform'
                />
                <AdminPorfile />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8" data-animate="stagger">
                <StatCardOne total_revenue={total_revenue} />
                <StatCardTwo lastMonthRevenue={last30Days_Revenue} />
                <StatCardThree active_vendors={active_vendors} />
                <StatCardFour active_deals={active_deals} />
            </div>
            <div className="flex flex-col gap-5 lg:flex-row" data-animate="fade-up">
                <RevenueTrendChart />
                <PieChartSection />
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center mt-5" data-animate="stagger">
                <ListCard
                    title="Recent Vendors"
                    subtitle="Latest vendor applications"
                    icon={Store}
                />
                <RecentDealCard
                    title="Recent Deals"
                    subtitle="Latest deals submissions"
                    icon={Tag}
                    items={reacentDeals?.data?.vendors}
                />
            </div>
        </div>
    );
};

export default Dashboard;

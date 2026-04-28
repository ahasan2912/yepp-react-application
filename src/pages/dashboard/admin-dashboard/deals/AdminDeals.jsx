import { ChartLine, CheckCircle2, Tag, View } from "lucide-react";
import HeadingTitle from "../components/HeadingTitle";
import StatsCard from "../vendors/components/StatsCard";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { useGetDealsStatQuery } from "../../../../features/dashboard/dashboardHome";
import DealManagementSekelton from "../../../../components/skeleton/dashboard/DealManagementSekelton";
import { useGsapAnimations } from "../../../../hooks/useGsapAnimations";

const AdminDeals = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [revenueFilter, setRevenueFilter] = useState("New to Old");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit,] = useState(10);

    const { data: DealStats, isLoading } = useGetDealsStatQuery({
        sort: revenueFilter,
        searchTerm: debouncedSearchTerm,
        page: page,
        limit: limit,
    });
    const animationScopeRef = useGsapAnimations(`admin-deals-${page}-${DealStats?.data?.data?.length ?? 0}`);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(DealStats?.data?.summary?.totalDeals)) {
            setPage(newPage);
        }
    };

    if (isLoading) {
        return <DealManagementSekelton />
    }

    const { totalDeals, activeDeals, totalImpressions, totalViews } = DealStats?.data?.summary || {};
    const totalPages = Math.ceil(totalDeals / limit);

    return (
        <div ref={animationScopeRef} className="min-h-screen pt-3 pb-5" data-animate="dashboard">
            <HeadingTitle
                title='Deal Management'
                description='Manage deals and track performance.'
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5" data-animate="stagger">
                <StatsCard
                    bgColor='bg-[#FFFFFF]'
                    color='text-[#262626]'
                    titleText='Total Deals'
                    value={totalDeals}
                    iconBg='bg-[#F0F9FF]'
                    iconColor='text-[#A8EBF7]'
                    Icon={Tag}
                />
                <StatsCard
                    bgColor='bg-[#FFFFFF]'
                    color='text-[#262626]'
                    titleText='Active Deals'
                    value={activeDeals}
                    iconBg='bg-[#F0FDF4]'
                    iconColor='text-[#22C55E]'
                    Icon={CheckCircle2}
                />
                <StatsCard
                    bgColor='bg-[#FFFFFF]'
                    color='text-[#262626]'
                    titleText='Total Views'
                    value={totalViews}
                    iconBg='bg-[#F0F9FF]'
                    iconColor='text-[#0284C7]'
                    Icon={View}
                />
                <StatsCard
                    bgColor='bg-[#FFFFFF]'
                    color='text-[#262626]'
                    value={totalImpressions}
                    iconBg='bg-[#FFFAE8]'
                    titleText='Total Impression'
                    iconColor='text-[#F0C106]'
                    Icon={ChartLine}
                />
            </div>
            <div className="text-slate-700 pt-10" data-animate="fade-up">
                <div className=" bg-white rounded-lg overflow-hidden">
                    <Header
                        setSearchTerm={setSearchTerm}
                        setIsFilterOpen={setIsFilterOpen}
                        isFilterOpen={isFilterOpen}
                        revenueFilter={revenueFilter}
                        setRevenueFilter={setRevenueFilter}
                    />
                    <Table dealsData={DealStats?.data?.data} />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDeals;

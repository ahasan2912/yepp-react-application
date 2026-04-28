import HeadingTitle from "../components/HeadingTitle";
import { useGetAnalyticsQuery } from "../../../../features/dashboard/dashboardHome";
import { StatCardFour, StatCardOne, StatCardThree, StatCardTwo } from "../home/components/StatCard";
import PaymentSkeleton from "../../../../components/skeleton/dashboard/PaymentSkeleton";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import Header from "./components/Header";
import { useGetAllPaymentQuery } from "../../../../features/payment/paymentApi";
import Pagination from "./components/Pagination";

const Payments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [revenueFilter, setRevenueFilter] = useState("New to Old");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit,] = useState(10);

    const { data: totalAnalytics, isLoading: analyticsLoading } = useGetAnalyticsQuery();
    const { data: allPaymentList, isLoading } = useGetAllPaymentQuery({
        sort: revenueFilter,
        searchTerm: debouncedSearchTerm,
        page: page,
        limit: limit,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(allPaymentList?.data?.meta?.total / limit)) {
            setPage(newPage);
        }
    };

    if (analyticsLoading || isLoading) {
        return <PaymentSkeleton />
    }
    const { active_vendors, active_deals, total_revenue, last30Days_Revenue } = totalAnalytics?.data || {};
    const totalPages = Math.ceil(allPaymentList?.data?.meta?.total / limit)
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Payments'
                description='Track vendor payments & platform revenue.'
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                <StatCardOne total_revenue={total_revenue} />
                <StatCardTwo lastMonthRevenue={last30Days_Revenue} />
                <StatCardThree active_vendors={active_vendors} />
                <StatCardFour active_deals={active_deals} />
            </div>
            <div className="text-slate-700 pt-5">
                <div className="bg-white rounded-lg overflow-hidden">
                    <Header
                        setSearchTerm={setSearchTerm}
                        setIsFilterOpen={setIsFilterOpen}
                        isFilterOpen={isFilterOpen}
                        revenueFilter={revenueFilter}
                        setRevenueFilter={setRevenueFilter}
                    />
                    <Table paymentData={allPaymentList?.data?.transactions} />

                    {/* Pagination */}
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

export default Payments;
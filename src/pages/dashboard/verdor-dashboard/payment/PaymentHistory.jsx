import { useEffect, useState } from "react";
import { useGetAllVendorPaymentHistoryQuery } from "../../../../features/payment/paymentApi";
import Header from "./components/Header";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import PaymentSkeleton from "../../../../components/skeleton/dashboard/PaymentSkeleton";

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [revenueFilter, setRevenueFilter] = useState("New to Old");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit,] = useState(5);

    const { data: allPaymentList, isLoading } = useGetAllVendorPaymentHistoryQuery({
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

    if (isLoading) {
        return <PaymentSkeleton />
    }
    const totalPages = Math.ceil(allPaymentList?.data?.meta?.total / limit);
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="text-slate-700">
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

export default PaymentHistory;
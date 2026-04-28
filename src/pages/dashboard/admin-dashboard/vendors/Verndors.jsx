import { useEffect, useMemo, useState } from "react";
import { useGetVendorsStatQuery } from "../../../../features/dashboard/dashboardHome";
import { useShopApprovedEditMutation } from "../../../../features/shop/shopApi";
import HeadingTitle from "../components/HeadingTitle";
import StatsCard from "./components/StatsCard";
import Header from "./components/Header";
import Table from "./components/Table";
import VendorManagementSkeleton from "../../../../components/skeleton/dashboard/VendorManagementSkeleton";
import Pagination from "./components/Pagination";
import { AlertCircle, CheckCircle2, Store } from "lucide-react";
import { useGsapAnimations } from "../../../../hooks/useGsapAnimations";
import toast from "react-hot-toast";

const Verndors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortFilter, setSortFilter] = useState("New to Old");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isSortFilterOpen, setIsSortFilterOpen] = useState(false);
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [statusOverrides, setStatusOverrides] = useState({});
    const pageSize = 10;
    const shouldUseClientStatusFilter = statusFilter !== "ALL";
    const [shopApprovedEdit, { isLoading: isStatusUpdating }] = useShopApprovedEditMutation();

    const { data: vendorDetails, isLoading } = useGetVendorsStatQuery({
        sort: sortFilter,
        searchTerm: debouncedSearchTerm,
        page: shouldUseClientStatusFilter ? 1 : page,
        limit: shouldUseClientStatusFilter ? 1000 : pageSize,
    });
    const animationScopeRef = useGsapAnimations(`vendors-${page}-${vendorDetails?.data?.vendors?.length ?? 0}`);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const vendors = useMemo(
        () =>
            (vendorDetails?.data?.vendors ?? []).map((vendor) => ({
                ...vendor,
                shop_approval: statusOverrides[vendor?._id] || vendor?.shop_approval,
            })),
        [statusOverrides, vendorDetails?.data?.vendors]
    );

    const filteredVendors = useMemo(() => {
        if (!shouldUseClientStatusFilter) {
            return vendors;
        }

        return vendors.filter(
            (vendor) => (vendor?.shop_approval ?? "").toUpperCase() === statusFilter
        );
    }, [shouldUseClientStatusFilter, statusFilter, vendors]);

    const totalItems = shouldUseClientStatusFilter
        ? filteredVendors.length
        : vendorDetails?.data?.summery?.totalVendors || 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(page, totalPages);

    const displayedVendors = useMemo(() => {
        if (!shouldUseClientStatusFilter) {
            return filteredVendors;
        }

        const startIndex = (currentPage - 1) * pageSize;
        return filteredVendors.slice(startIndex, startIndex + pageSize);
    }, [currentPage, filteredVendors, shouldUseClientStatusFilter]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        setPage(1);
    };

    const handleSortFilterChange = (value) => {
        setSortFilter(value);
        setPage(1);
    };

    const handleStatusChange = async (id, status) => {
        setIsSortFilterOpen(false);
        setIsStatusFilterOpen(false);
        const previousStatus = vendors.find((vendor) => vendor?._id === id)?.shop_approval;

        setStatusOverrides((currentStatuses) => ({
            ...currentStatuses,
            [id]: status,
        }));

        try {
            await shopApprovedEdit({
                id: id,
                data: { shop_approval: status },
            }).unwrap();
            toast.success("Status update successfully!");
        } catch (error) {
            setStatusOverrides((currentStatuses) => ({
                ...currentStatuses,
                [id]: previousStatus,
            }));
            const message = error?.data?.message || "Status update failed!";
            toast.error(message);
        }
    };

    if (isLoading) {
        return <VendorManagementSkeleton />;
    }

    const { totalActiveVendors, totalPendingVendors, totalVendors } = vendorDetails?.data?.summery || {};

    return (
        <div ref={animationScopeRef} className="min-h-screen pt-3 pb-5" data-animate="dashboard">
            <HeadingTitle
                title="Shop Management"
                description="Manage Shop accounts and applications"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" data-animate="stagger">
                <StatsCard
                    bgColor="bg-[#FFFFFF]"
                    color="text-[#262626]"
                    subtitleColor="text-[#34C759]"
                    titleText="Total Vendors"
                    value={totalVendors}
                    iconBg="bg-[#F0F9FF]"
                    iconColor="text-[#A8EBF7]"
                    Icon={Store}
                />
                <StatsCard
                    bgColor="bg-[#FFFFFF]"
                    color="text-[#262626]"
                    subtitleColor="text-[#34C759]"
                    titleText="Active Vendors"
                    value={totalActiveVendors}
                    iconBg="bg-[#F0FDF4]"
                    iconColor="text-[#22C55E]"
                    Icon={CheckCircle2}
                />
                <StatsCard
                    bgColor="bg-[#FFFFFF]"
                    color="text-[#262626]"
                    subtitleColor="text-[#34C759]"
                    titleText="Pending Approval"
                    value={totalPendingVendors}
                    iconBg="bg-[#FFFAE8]"
                    iconColor="text-[#F0C106]"
                    Icon={AlertCircle}
                />
            </div>

            <div className="text-slate-700 pt-10" data-animate="fade-up">
                <div className="bg-white rounded-lg overflow-hidden">
                    <Header
                        setSearchTerm={handleSearchTermChange}
                        sortFilter={sortFilter}
                        setSortFilter={handleSortFilterChange}
                        isSortFilterOpen={isSortFilterOpen}
                        setIsSortFilterOpen={setIsSortFilterOpen}
                        statusFilter={statusFilter}
                        setStatusFilter={handleStatusFilterChange}
                        isStatusFilterOpen={isStatusFilterOpen}
                        setIsStatusFilterOpen={setIsStatusFilterOpen}
                    />
                    <Table
                        vendorData={displayedVendors}
                        handleStatusChange={handleStatusChange}
                        isStatusUpdating={isStatusUpdating}
                    />

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Verndors;

import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DealCard from "./components/DealCard";
import { useGetMyDealsQuery } from "../../../../features/deal/dealApi";
import { DealCardSkeleton } from "../../../../components/skeleton/DealCardSkeleton";
import Pagination from "../../../vendor/created-shop/components/Pagination";

const ROWS_PER_PAGE = Number(import.meta.env.VITE_ROWS_PER_PAGE) || 10;

const Deals = () => {
    const [searchText, setSearchText] = useState("");
    const [activeTab, setActiveTab] = useState("promoted");
    const [currentPage, setCurrentPage] = useState(1);
    const [now, setNow] = useState(new Date());

    const { data: myDeals, isLoading } = useGetMyDealsQuery({
        text: searchText,
        openTab: activeTab
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const deals = useMemo(() => {
        return myDeals?.data?.deals ?? [];
    }, [myDeals]);

    const activeDeals = useMemo(() => {
        return deals.filter(
            (deal) =>
                deal?.activePromotion !== null &&
                new Date(deal?.promotedUntil) >= now
        );
    }, [deals, now]);

    const expiredDeals = useMemo(() => {
        return deals.filter(
            (deal) =>
                deal?.activePromotion !== null &&
                new Date(deal?.promotedUntil) < now
        );
    }, [deals, now]);

    const newDeals = useMemo(() => {
        return deals.filter((deal) => deal?.activePromotion === null);
    }, [deals]);

    const currentTabDeals = useMemo(() => {
        switch (activeTab) {
            case "promoted":
                return activeDeals;
            case "expired":
                return expiredDeals;
            case "new":
                return newDeals;
            default:
                return [];
        }
    }, [activeTab, activeDeals, expiredDeals, newDeals]);

    const totalPages = Math.ceil(currentTabDeals.length / ROWS_PER_PAGE);

    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(
        currentPage * ROWS_PER_PAGE,
        currentTabDeals.length
    );

    const currentDeals = useMemo(() => {
        return currentTabDeals.slice(indexOfFirst, indexOfLast);
    }, [currentTabDeals, indexOfFirst, indexOfLast]);

    useEffect(() => {
        const func = () => {
            setCurrentPage(1);
        }
        func();
    }, [activeTab, searchText]);

    useEffect(() => {
        const func = () => {
            if (totalPages > 0 && currentPage > totalPages) {
                setCurrentPage(totalPages);
            }
        }
        func();
    }, [currentPage, totalPages]);

    if (isLoading) {
        return <DealCardSkeleton />;
    }

    console.log(myDeals);

    return (
        <div className="bg-white min-h-screen px-4 pt-32 pb-12">
            <div className="max-w-305 mx-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="px-5 py-1 max-w-100 w-full rounded-full flex items-center gap-1 font-medium border border-[#737373] cursor-pointer">
                        <Search className="text-[#737373]" size={20} />
                        <input
                            type="text"
                            className="w-full py-1 md:py-2 outline-0 text-[#262626] text-base"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search your deals...."
                        />
                    </div>

                    <Link
                        to="/create-deal"
                        className="bg-primary hover:bg-secondary px-10 md:px-20 py-2.5 md:py-3.5 rounded-full flex items-center justify-center gap-1 text-white text-base font-bold max-w-100 md:max-w-75 w-full cursor-pointer"
                    >
                        <span>
                            <Plus />
                        </span>
                        <span>Add New Deal</span>
                    </Link>
                </div>

                <div className="flex items-center justify-between mt-8 md:mt-12.5 border-b border-gray-200">
                    <div className="flex w-full items-center gap-1 sm:gap-3 pb-3 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab("promoted")}
                            className={`shrink-0 whitespace-nowrap rounded-full text-sm sm:text-base px-3 sm:px-6 py-2 font-medium cursor-pointer ${activeTab === "promoted"
                                ? "bg-primary text-white"
                                : "bg-white text-[#A3A3A3]"
                                }`}
                        >
                            Active Deals
                        </button>

                        <button
                            onClick={() => setActiveTab("expired")}
                            className={`shrink-0 whitespace-nowrap rounded-full text-sm sm:text-base px-3 sm:px-6 py-2 font-medium cursor-pointer ${activeTab === "expired"
                                ? "bg-primary text-white"
                                : "bg-white text-[#A3A3A3]"
                                }`}
                        >
                            Expired Deals
                        </button>

                        <button
                            onClick={() => setActiveTab("new")}
                            className={`shrink-0 whitespace-nowrap rounded-full text-sm sm:text-base px-3 sm:px-6 py-2 font-medium cursor-pointer ${activeTab === "new"
                                ? "bg-primary text-white"
                                : "bg-white text-[#A3A3A3]"
                                }`}
                        >
                            New Deals
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="space-y-4">
                        {currentDeals?.map((deal) => (
                            <DealCard key={deal?._id} deal={deal} />
                        ))}

                        {currentDeals?.length === 0 && (
                            <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                                <p className="text-gray-600 text-lg font-semibold">
                                    Deal not Found
                                </p>
                            </div>
                        )}
                    </div>

                    {currentTabDeals.length > 0 && (
                        <Pagination
                            totalPages={totalPages}
                            totalItems={currentTabDeals.length}
                            rowsPerPage={ROWS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            indexOfLast={indexOfLast}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deals;

import { DealCardSkeleton } from "../../../../components/skeleton/DealCardSkeleton";
import { useGetTopViewDealsQuery } from "../../../../features/shop/shopApi";
import DealCard from "../../components/DealCard";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
const ROWS_PER_PAGE = import.meta.env.VITE_ROWS_PER_PAGE;

const AllTopViewsDeal = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: topViewsDeal, isLoading } = useGetTopViewDealsQuery();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isLoading) {
        return <DealCardSkeleton />
    }

    const allDeals = topViewsDeal?.data?.topDeals ?? [];
    const totalPages = Math.ceil(allDeals?.length / ROWS_PER_PAGE);
    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(currentPage * ROWS_PER_PAGE, allDeals?.length);
    const currentDeals = allDeals.slice(indexOfFirst, indexOfLast);

    return (
        <div className="bg-white min-h-screen px-4 pt-32 pb-12">
            <div className="max-w-305 mx-auto">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="font-bold text-primary text-xl">Top Viewed Deals</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentDeals?.map((deal, index) => (
                        <DealCard key={index} deal={deal} />
                    ))}
                </div>
                {
                    topViewsDeal?.data?.topDeals?.length > 0 && <Pagination
                        totalPages={totalPages}
                        totalItems={allDeals?.length}
                        rowsPerPage={ROWS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        indexOfLast={indexOfLast}
                    />
                }
            </div>
        </div>
    );
};

export default AllTopViewsDeal;

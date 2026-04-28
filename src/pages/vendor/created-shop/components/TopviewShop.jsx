import { Link } from "react-router-dom";
import { DealCardSkeleton } from "../../../../components/skeleton/DealCardSkeleton";
import { useGetTopViewDealsQuery } from "../../../../features/shop/shopApi";
import DealCard from "../../components/DealCard";

const TopviewShop = () => {
    const { data: topViewsDeal, isLoading } = useGetTopViewDealsQuery();
    const topDeals = topViewsDeal?.data?.topDeals?.slice(0, 4) || [];

    if (isLoading) return <DealCardSkeleton />;
    return (
        <div>
            <div className="flex justify-between items-end mb-6">
                <h2 className="font-bold text-primary text-lg">
                    Top Viewed Deals
                </h2>
                <Link
                    to="/all-top-views"
                    className="text-gray-500 hover:text-secondary hover:font-semibold text-base cursor-pointer"
                >
                    See all
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topDeals.length > 0 ? (
                    topDeals.map((deal, index) => (
                        <DealCard key={index} deal={deal} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                        <p className="text-gray-600 text-lg font-semibold">
                            Deal not Found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopviewShop;

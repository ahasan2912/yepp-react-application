import { DealCardSkeleton } from "../../../../components/skeleton/DealCardSkeleton";
import { useGetDealAllDealsQuery } from "../../../../features/deal/dealApi";
import SearchDealCard from "./SearchDealCard";
import useUserLocation from "../../../../hooks/useUserLocation";
import DynamicLocation from "../../../../components/location/DynamicLocation";
import { useGsapAnimations } from "../../../../hooks/useGsapAnimations";
const SearchDeals = ({ searchText }) => {
    const { latitude, longitude } = useUserLocation();
    const { data: allDeals, isLoading } = useGetDealAllDealsQuery({ searchText, longitude, latitude });
    const queryText = searchText?.query?.trim() || "";
    const zipCodeText = searchText?.zipCode?.trim() || "";
    const searchValue = [queryText, zipCodeText].filter(Boolean).join(" / ");
    const headingText = searchValue ? `Search result of '${searchValue}'` : "Search result";
    const animationScopeRef = useGsapAnimations(`search-deals-${searchValue}-${allDeals?.data?.deals?.length ?? 0}`);

    if (isLoading) {
        return <DealCardSkeleton />
    }
    if (allDeals?.length === 0) {
        return <DealCardSkeleton />
    }



    return (
        <div ref={animationScopeRef} className="bg-gray-50 min-h-[10vh] px-4 py-12.5" data-animate="fade-up">
            <div className="max-w-305 mx-auto">
                <div className="flex items-start justify-between gap-4 mb-6" data-animate="fade-up">
                    <h2 className="max-w-[60%] break-words text-base font-bold leading-tight text-[#262626] sm:max-w-none sm:text-2xl md:text-[28px]">
                        {headingText}
                    </h2>
                    <DynamicLocation
                        latitude={latitude}
                        longitude={longitude}
                        zipCode={zipCodeText}
                        className="flex max-w-[40%] items-start justify-end gap-1.5 text-right text-sm font-semibold leading-snug text-primary sm:max-w-none sm:items-center sm:gap-2 sm:text-base md:text-lg"
                        iconClassName="mt-0.5 h-4 w-4 shrink-0 sm:mt-0 sm:h-5 sm:w-5"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-animate="stagger">
                    {allDeals?.data?.deals.map((deal) => (
                        <SearchDealCard key={deal?.deal?._id} deal={deal} />
                    ))}
                    {
                        allDeals?.data?.deals?.length === 0 &&
                        <div className="col-span-full text-center py-10 min-h-[10vh] flex items-center justify-center">
                            <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchDeals;

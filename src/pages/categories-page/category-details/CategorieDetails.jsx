import { useParams } from "react-router-dom";
import useUserLocation from "../../../hooks/useUserLocation";
import { useGetAllCategoriesQuery, useGetCategoryDetailsQuery } from "../../../features/categories/CategoriesApi";
import { DealCardSkeleton } from "../../../components/skeleton/DealCardSkeleton";
import DealCard from "./DealCard";
import { MapPin } from "lucide-react";
import { useState } from "react";
import Pagination from "../../vendor/created-shop/components/Pagination";
import DynamicLocation from "../../../components/location/DynamicLocation";
import { useGsapAnimations } from "../../../hooks/useGsapAnimations";
const ROWS_PER_PAGE = import.meta.env.VITE_ROWS_PER_PAGE;

const CategorieDetails = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();
    const { latitude, longitude } = useUserLocation();
    const { data: categoriess, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
    const { data: categories, isLoading } = useGetCategoryDetailsQuery({ id, longitude, latitude });
    const allDeals = categories?.data?.deals ?? [];
    const animationScopeRef = useGsapAnimations(`category-deals-${id}-${currentPage}-${allDeals.length}`);

    if (categoriesLoading || isLoading) {
        return <DealCardSkeleton />
    }

    const totalPages = Math.ceil(allDeals?.length / ROWS_PER_PAGE);
    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(currentPage * ROWS_PER_PAGE, allDeals?.length);
    const currentDeals = allDeals.slice(indexOfFirst, indexOfLast);

    const categoryName = categoriess?.data?.find((cat) => cat._id === id);
    const dealColumns = currentDeals.reduce(
        (columns, deal, index) => {
            columns[index % 2].push({ deal, index });
            return columns;
        },
        [[], []]
    );

    const categoryLength = categoriess?.data?.length;

    return (
        <div ref={animationScopeRef} className={`bg-gray-50 min-h-[65vh] pb-36 ${categoryLength > 10 ? ' pt-52' : 'pt-36'}`}>
            <div className={`fixed left-0 right-0 z-30 bg-gray-50 pt-12 sm:pt-16 ${categoryLength > 10 ? 'top-42 sm:top-44' : 'top-28 sm:top-28'}`} data-animate="fade-up">
                <div className="max-w-305 mx-auto px-2 sm:px-4 md:px-8 flex items-center justify-between py-3 mt-5">
                    <h2 className="text-base md:text-2xl font-bold text-[#262626]">{categoryName?.category_name}</h2>
                    <DynamicLocation
                        latitude={latitude}
                        longitude={longitude}
                        className="flex gap-2 items-center text-primary text-sm md:text-base font-semibold"
                        iconClassName="h-3 w-3 shrink-0"
                    />
                </div>
            </div>
            <div className="max-w-305 mx-auto px-2 sm:px-4 md:px-8 py-3 md:py-6">
                <div className="invisible mb-6 flex items-center justify-between py-3" aria-hidden="true">
                    <h2 className="text-md md:text-2xl font-bold text-[#262626]">{categoryName?.category_name}</h2>
                    <div className="flex gap-2 items-center text-primary text-base font-semibold">
                        <MapPin size={12} /> <span className="text-sm md:text-base">Current location</span>
                    </div>
                </div>

                {categories?.data?.deals?.length > 0 ? (
                    <>
                        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-5 lg:hidden">
                            {dealColumns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    className={`flex flex-col gap-3 sm:gap-5 ${columnIndex === 1 ? "max-[500px]:pt-5" : ""}`}
                                    data-animate="stagger"
                                >
                                    {column.map(({ deal, index }) => (
                                        <DealCard
                                            key={deal?.deal?._id || index}
                                            deal={deal}
                                            compact
                                            imageSize={index % 3 === 1 ? "tall" : "normal"}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6" data-animate="stagger">
                            {currentDeals.map((deal, index) => (
                                <DealCard key={deal?.deal?._id || index} deal={deal} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 min-h-[10vh] flex items-center justify-center">
                        <p className="text-gray-600 text-lg font-semibold">Deal not Found</p>
                    </div>
                )}
                {
                    categories?.data?.deals?.length > 0 && <Pagination
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

export default CategorieDetails;

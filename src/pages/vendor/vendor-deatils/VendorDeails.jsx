import { useState } from "react";
import { DealCardSkeleton } from "../../../components/skeleton/DealCardSkeleton";
import { useGetShopDetailsQuery } from "../../../features/shop/shopApi";
import DealCard from "./component/DealCard";
import { images } from "../../../assets/image";
import { useParams } from "react-router-dom";
import OutletLocation from "./address/OutletLocation";
import Pagination from "../created-shop/components/Pagination";
import { useGetAllCategoriesQuery } from "../../../features/categories/CategoriesApi";
const ROWS_PER_PAGE = import.meta.env.VITE_ROWS_PER_PAGE;

const VendorDeails = () => {
    const [activeTab, setActiveTab] = useState('active-deals');
    const { id } = useParams();
    const { data: shopDetails, isLoading } = useGetShopDetailsQuery(id);
    const { data: categories, isLoading: categoryLoading } = useGetAllCategoriesQuery();
    const [currentPage, setCurrentPage] = useState(1);

    if (isLoading || categoryLoading) {
        return <DealCardSkeleton />
    }

    const allDeals = shopDetails?.data?.deals ?? [];
    const totalPages = Math.ceil(allDeals?.length / ROWS_PER_PAGE);
    const indexOfFirst = (currentPage - 1) * ROWS_PER_PAGE;
    const indexOfLast = Math.min(currentPage * ROWS_PER_PAGE, allDeals?.length);
    const currentDeals = allDeals.slice(indexOfFirst, indexOfLast);
    const businessName = shopDetails?.data?.business_name;

    const categoryLength = categories?.data?.length;

    return (
        <div className={`bg-white px-4 ${categoryLength > 10 ? 'pt-64 sm:pt-68 md:pt-72' : 'pt-48'}`}>
            <div className="max-w-305 mx-auto">
                <div className="flex flex-col">
                    <div className="flex flex-col items-center sm:items-start md:flex-row gap-3">
                        <div className="w-40 h-40 rounded-full p-1.5 border-2 border-(--primary-color) overflow-hidden">
                            <img
                                src={shopDetails?.data?.business_logo || images?.profilePic}
                                alt="vendor-image"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="max-w-230 w-full bg-white mt-2">
                            <h1 className="text-[26px] pb-2 sm:text-[28px] md:text-3xl font-bold text-gray-600 mb-1">
                                {businessName}
                            </h1>
                            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-4 md:mb-8">
                                {shopDetails?.data?.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 py-4 sm:py-10">
                        <button onClick={() => setActiveTab('active-deals')} className={`w-full sm:w-auto px-10 py-2.5 ${activeTab === 'active-deals' ? 'bg-primary hover:bg-secondary text-white' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-400'} text-xl font-medium rounded-full transition-colors duration-200`}>
                            Active Deals
                        </button>
                        <button onClick={() => setActiveTab('address')} className={`w-full sm:w-auto px-10 py-2.5 ${activeTab === 'address' ? 'bg-primary hover:bg-secondary text-white' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-400'} text-xl font-medium rounded-full transition-colors duration-200`}>
                            Address & Location
                        </button>
                    </div>
                    {
                        activeTab === 'active-deals' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                            {currentDeals?.map((deal) => (
                                <DealCard key={deal?._id} deal={deal} />
                            ))}
                        </div>
                    }
                    {
                        activeTab === 'address' && <OutletLocation outlets={shopDetails?.data?.outlets} />
                    }
                </div>
                {
                    shopDetails?.data?.deals?.length > 0 && activeTab === 'active-deals' && <Pagination
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

export default VendorDeails;

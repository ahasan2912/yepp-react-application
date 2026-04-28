import { useParams } from "react-router-dom";
import { useGetVendorDetailsQuery } from "../../features/shop/shopApi";
import ShowoutletMap from "./components/ShowoutletMap";
import { images } from "../../assets/image";
import ShopOutletSkeleton from "../../components/skeleton/ShopOutletSkeleton";

const ShowOutlets = () => {
    const { id } = useParams();
    const { data: shopDetails, isLoading } = useGetVendorDetailsQuery(id);

    if (isLoading) {
        return <ShopOutletSkeleton />
    }
    return (
        <div className="bg-white pt-32 px-4">
            <div className="max-w-305 mx-auto">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-40 h-40 rounded-full p-1.5 border-2 border-green-500  overflow-hidden">
                        <img
                            src={shopDetails?.data?.business_logo || images?.profilePic}
                            alt="vendor-image"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div className="max-w-230 w-full bg-white mt-2">
                        <h1 className="text-[28px] md:text-3xl font-bold text-gray-600 mb-1">
                            {shopDetails?.data?.business_name}
                        </h1>
                        <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-4 md:mb-8">
                            {shopDetails?.data?.description}
                        </p>
                    </div>
                </div>
                <div className="mt-7">
                    {
                        shopDetails?.data?.outlets.length > 0 && <ShowoutletMap outlets={shopDetails?.data?.outlets} />
                    }
                </div>
            </div>
        </div>
    );
};

export default ShowOutlets;
import { MapPin, Store } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import GoogleMapComponent from "./components/GoogleMapComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEditShopOutletMutation, useGetVendorDetailsQuery } from "../../../../features/shop/shopApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import EditOutletSkeleton from "../../../../components/skeleton/EditOutletSkeleton";

const EditOutlet = ({ outletNumber }) => {
    const { id } = useParams();
    const { user } = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const { data: shopDetails, isLoading } = useGetVendorDetailsQuery(user?._id, {
        skip: !user?._id,
    });
    const [editShopOutlet, { isLoading: editLoading, error, isSuccess }] =
        useEditShopOutletMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            outlet_name: "",
            address: "",
            zip_code: "",
            coordinates: null,
        },
    });
    const addressValue = watch("address");

    useEffect(() => {
        if (isSuccess) {
            toast.success("Outlet updated successfully!");
            navigate("/shop-overview");
        }

        if (error) {
            const message = error?.data?.message || "Outlet update failed!";
            toast.error(message);
        }
    }, [navigate, isSuccess, error]);

    useEffect(() => {
        if (shopDetails?.data?.outlets?.length) {
            const outlet = shopDetails.data.outlets.find((out) => out?._id === id);

            if (outlet) {
                const { address, outlet_name, zip_code, location } = outlet;
                reset({
                    outlet_name: outlet_name || "",
                    address: address || "",
                    zip_code: zip_code || "",
                    coordinates:
                        location?.coordinates?.length === 2
                            ? {
                                lat: location.coordinates[1],
                                lng: location.coordinates[0],
                            }
                            : null,
                });
            }
        }
    }, [shopDetails, id, reset]);

    const onSubmit = async (data) => {
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            console.error("Invalid outlet id:", id);
            return;
        }

        const payload = {
            outlet_name: data.outlet_name,
            address: data.address,
            zip_code: data.zip_code,
            coordinates: [data.coordinates.lng, data.coordinates.lat],
        };

        await editShopOutlet({
            outletId: id,
            shopId: shopDetails?.data?._id,
            data: payload,
        }).unwrap();
    };

    if (isLoading) {
        return <EditOutletSkeleton />;
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-5 pt-32 pb-12">
            <div className="bg-white rounded-2xl w-full p-6 md:p-8 border border-gray-300">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-primary">Edit Outlet</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <label className="block text-lg text-gray-700 font-medium">
                            Name
                        </label>
                        <div className="relative mt-1">
                            <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-full outline-0 focus:ring-2 focus:ring-primary"
                                placeholder="Enter outlet name"
                                {...register("outlet_name", {
                                    required: "Outlet name is required",
                                })}
                            />
                        </div>
                        {errors.outlet_name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.outlet_name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg text-gray-700 font-medium">
                            Address
                        </label>
                        <div className="relative mt-2">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-full outline-0 focus:ring-2 focus:ring-primary"
                                placeholder="Shop name, street, city"
                                {...register("address", {
                                    required: "Address is required",
                                })}
                            />
                        </div>
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg text-gray-700 font-medium">
                            Outlet-{outletNumber} Location
                        </label>

                        <Controller
                            name="coordinates"
                            control={control}
                            rules={{
                                required: "Location is required",
                            }}
                            render={({ field }) => (
                                <>
                                    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-gray-300 mt-2">
                                        <GoogleMapComponent
                                            address={addressValue}
                                            selectedLocation={field.value}
                                            onMarkerSelect={(coords) => field.onChange(coords)}
                                        />
                                    </div>
                                </>
                            )}
                        />
                        {errors.coordinates && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.coordinates.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg text-gray-700 font-medium">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 px-4 py-3 border border-gray-400 rounded-full outline-0 focus:ring-2 focus:ring-primary"
                            placeholder="Zip code"
                            {...register("zip_code", {
                                required: "Zip code is required",
                            })}
                        />
                        {errors.zip_code && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.zip_code.message}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2 flex justify-center mt-2 md:mt-6">
                        <button
                            type="submit"
                            disabled={editLoading}
                            className="bg-primary hover:bg-secondary text-white font-bold py-3 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {editLoading ? (
                                <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full" />
                            ) : (
                                <span className="font-medium text-lg text-white">
                                    Update Outlet
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOutlet;


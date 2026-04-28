import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LinkIcon, Mail, Plus, Store, X } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import VendorFormSkeleton from "../../../../components/skeleton/VendorFormSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useEditshopMutation, useGetVendorDetailsQuery } from "../../../../features/shop/shopApi";
import toast from "react-hot-toast";

const MAX_DESCRIPTION = 300;

const VendorEditShop = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.auth);
    const [logoPreview, setLogoPreview] = useState(null);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset, } = useForm({
        defaultValues: {
            businessName: "",
            businessLogo: "",
            description: "",
            countryCode: "",
            phoneNumber: "",
            phone: "",
            website: "",
        },
    });
    const shopId = id || user?._id;
    const { data: shopDetails, isLoading } = useGetVendorDetailsQuery(shopId);
    const [editshop, { isLoading: editLoading, error, isSuccess }] = useEditshopMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Shop updated successfully!");
            navigate("/shop-overview");
        }
        if (error) {
            const message = error?.data?.message || "Shop update failed!";
            toast.error(message);
        }
    }, [navigate, isSuccess, error]);

    useEffect(() => {
        if (shopDetails?.data) {
            const { business_name, business_logo, business_phone, website, description } = shopDetails.data;

            const dialCode = business_phone?.country_code?.replace("+", "") || "";
            const phoneNumber = business_phone?.phone_number || "";

            reset({
                businessName: business_name || "",
                businessLogo: business_logo || "",
                description: description || "",
                countryCode: business_phone?.country_code || "",
                phoneNumber: phoneNumber,
                phone: dialCode + phoneNumber,
                website: website || "",
            });

            if (business_logo) {
                setLogoPreview(business_logo);
            }
        }
    }, [shopDetails, reset]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        register("businessLogo", {
            validate: (value) => Boolean(value) || "Business Logo is required",
        });
    }, [register]);

    if (isLoading) {
        return <VendorFormSkeleton />;
    }

    const descriptionValue = watch("description") || "";

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("businessLogo", file, { shouldValidate: true });
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoPreview(null);
        setValue("businessLogo", null, { shouldValidate: true });
        if (fileInputRef1.current) fileInputRef1.current.value = "";
        if (fileInputRef2.current) fileInputRef2.current.value = "";
    };

    const onSubmit = (data) => {
        const hasNewLogo = data?.businessLogo instanceof File;
        const existingLogo = typeof data?.businessLogo === "string" ? data.businessLogo : "";

        const shopData = {
            business_name: data?.businessName,
            business_phone: {
                country_code: data?.countryCode,
                phone_number: data?.phoneNumber,
            },
            description: data?.description,
        };

        if (!hasNewLogo && existingLogo) {
            shopData.business_logo = existingLogo;
        }

        if (data?.website) {
            shopData.website = data.website
        } else {
            shopData.website = ""
        }

        const requestData = hasNewLogo ? new FormData() : shopData;

        if (hasNewLogo) {
            requestData.append("data", JSON.stringify(shopData));
            requestData.append("file", data?.businessLogo);
        }

        editshop({
            id: shopDetails?.data?._id,
            data: requestData
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 pt-32 pb-12">
            <div className="max-w-300 mx-auto">
                <div className="mb-8 border-b border-slate-200 pb-6">
                    <h1 className="text-3xl font-bold tracking-normal text-[#262626] sm:text-[32px]">Edit Your Vendor Account</h1>
                    <p className="mt-2 text-base text-[#737373]">
                        Update your business profile details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-[#262626]">Business Name<span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Store
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.businessName ? "text-red-400" : "text-gray-400"
                                        }`}
                                />
                                <input
                                    {...register("businessName", {
                                        required: "Business name is required",
                                        validate: (value) =>
                                            value.trim().length >= 5 || "Business Name must be minimum 5 characters",
                                    })}
                                    placeholder="Enter your business name"
                                    className={`w-full rounded-full border bg-white py-4 pl-12 pr-4 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.businessName
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                                        : "border-slate-300 focus:border-primary"
                                        }`}
                                />
                            </div>
                            {errors.businessName && (
                                <p className="text-red-500 text-sm mt-1 ml-4">{errors.businessName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-[#262626]">Business Logo<span className="text-red-500">*</span></label>
                            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                                <div className="relative">
                                    {logoPreview ? (
                                        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-inner">
                                            <img
                                                src={logoPreview}
                                                alt="Preview"
                                                className="h-full w-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeLogo}
                                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-transform hover:bg-red-600 active:scale-90"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-gray-400 transition-all hover:border-[#2B9DAE]/50 hover:bg-white">
                                            <Plus className="w-10 h-10 mb-2 text-gray-300" />
                                            <span className="text-sm font-medium">Upload Photos</span>
                                            <input
                                                ref={fileInputRef1}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
                                        JPEG, PNG or PDF max 10 MB
                                    </span>
                                    <label className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary active:scale-95">
                                        <Plus className="w-5 h-5" /> Upload from files
                                        <input
                                            ref={fileInputRef2}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            {errors.businessLogo && (
                                <p className="text-red-500 text-sm mt-1 ml-4">{errors.businessLogo.message}</p>
                            )}
                        </div>
                    </div>

                    {/* ── Right column: Contact Information ── */}
                    <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="space-y-2 col-span-2">
                            <label className="block text-lg font-medium text-[#262626]">
                                Description<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    {...register("description", {
                                        required: "Description is required",
                                        maxLength: {
                                            value: MAX_DESCRIPTION,
                                            message: `Description cannot exceed ${MAX_DESCRIPTION} characters.`,
                                        },
                                        validate: (value) =>
                                            value.trim().length >= 10 || "Description must be minimum 10 characters",
                                    })}
                                    placeholder="Business Description"
                                    rows="5"
                                    className={`w-full resize-none rounded-lg border bg-white p-5 pr-20 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.description
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                                        : "border-slate-300 focus:border-primary"
                                    }`}
                                />
                                <span
                                    className={`absolute bottom-4 right-5 text-sm font-medium ${descriptionValue.length > MAX_DESCRIPTION ? "text-red-500" : "text-slate-400"
                                        }`}
                                >
                                    {descriptionValue.length}/{MAX_DESCRIPTION}
                                </span>
                            </div>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1 ml-4">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-[#262626]">
                                Website Link (Optional)
                            </label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    {...register("website")}
                                    placeholder="Website link"
                                    className="w-full rounded-full border border-slate-300 bg-white py-4 pl-12 pr-4 text-[#262626] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center border-t border-slate-200 pt-6 lg:col-span-2">
                        <button
                            type="submit"
                            disabled={editLoading}
                            className="min-w-60 cursor-pointer rounded-full bg-primary px-12 py-3.5 text-lg font-bold text-white shadow-xl shadow-[#4BBDCF]/20 transition-all hover:bg-secondary active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center"
                        > 
                            {editLoading ? (
                                <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full" />
                            ) : (
                                <span className="font-medium text-lg text-white">Update Shop</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorEditShop;

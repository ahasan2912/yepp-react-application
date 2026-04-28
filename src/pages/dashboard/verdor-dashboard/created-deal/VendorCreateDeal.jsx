/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import UplodedImage from "../components/UplodedImage";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCreateNewDealMutation } from "../../../../features/deal/dealApi";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "../../../../features/categories/CategoriesApi";
import AddDealSkeleton from "../../../../components/skeleton/AddDealSkeleton";
import Tags from "./components/Tags";
import Highlights from "./components/Highlights";
import { useSelector } from "react-redux";
import { useGetVendorDetailsQuery } from "../../../../features/shop/shopApi";
import { ChevronDown, MapPin, X } from "lucide-react";
import { getDealPricing } from "../../../../utils/dealPricing";

const hasCouponCodeValue = (data) => {
    return Boolean(data?.couponCode?.trim() || data?.qr_code?.[0] || data?.upc_code?.[0]);
};

const VendorCreateDeal = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [imageFiles, setImagesFiles] = useState([]);
    const [imageError, setImageError] = useState("");
    const [qrPreview, setQrPreview] = useState("");
    const [upcPreview, setUpcPreview] = useState("");
    const qrInputRef = useRef(null);
    const upcInputRef = useRef(null);
    const { user } = useSelector((state => state?.auth));
    const { register, handleSubmit, watch, formState: { errors }, setValue, reset, setError, clearErrors, getValues } = useForm({
        defaultValues: {
            finalPriceOnly: false,
            finalPriceValue: "",
            regularPrice: "",
            discountPercentage: "",
        },
    });
    const navigate = useNavigate();
    const { data: categoriess, isLoading: categoryLoading } = useGetAllCategoriesQuery();
    const { data: shopDetails, isLoading: shopLoading } = useGetVendorDetailsQuery(user?._id);
    const [createNewDeal, { isLoading, error, isSuccess }] = useCreateNewDealMutation();

    const watchRegularPrice = watch("regularPrice");
    const watchDiscount = watch("discountPercentage");
    const watchFinalPriceOnly = watch("finalPriceOnly");
    const watchFinalPriceValue = watch("finalPriceValue");
    const watchCouponCode = watch("couponCode");
    const watchQrCode = watch("qr_code");
    const watchUpcCode = watch("upc_code");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [reset]);

    useEffect(() => {
        if (hasCouponCodeValue({
            couponCode: watchCouponCode,
            qr_code: watchQrCode,
            upc_code: watchUpcCode,
        })) {
            clearErrors("couponCodes");
        }
    }, [watchCouponCode, watchQrCode, watchUpcCode, clearErrors]);

    useEffect(() => {
        return () => {
            if (qrPreview) URL.revokeObjectURL(qrPreview);
        };
    }, [qrPreview]);

    useEffect(() => {
        return () => {
            if (upcPreview) URL.revokeObjectURL(upcPreview);
        };
    }, [upcPreview]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Deal created successfully!");
            navigate("/my-deals");
        }
        if (error) {
            const message = error?.data?.message || "Deal created failed!";
            toast.error(message);
        }

    }, [navigate, isSuccess, error,]);

    const isFinalPriceOnly = Boolean(watchFinalPriceOnly);
    const calculatedPricing = getDealPricing(watchRegularPrice, watchDiscount);
    const finalPrice = isFinalPriceOnly
        ? Number(watchFinalPriceValue) || 0
        : calculatedPricing.finalPrice;
    const disabledPricingInputClasses = "disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400";

    useEffect(() => {
        clearErrors(["regularPrice", "discountPercentage", "finalPriceValue"]);

        if (!isFinalPriceOnly) return;

        const currentFinalPriceValue = getValues("finalPriceValue");

        if (currentFinalPriceValue !== "" && currentFinalPriceValue !== undefined && currentFinalPriceValue !== null) {
            return;
        }

        setValue("finalPriceValue", Number(calculatedPricing.finalPrice.toFixed(2)), {
            shouldDirty: false,
            shouldValidate: false,
        });
    }, [calculatedPricing.finalPrice, clearErrors, getValues, isFinalPriceOnly, setValue]);

    if (shopLoading || categoryLoading) {
        return <AddDealSkeleton />
    }

    const validateImages = () => {
        if (imageFiles.length === 0) {
            setImageError("Image is required");
            return false;
        }

        setImageError("");
        return true;
    };

    const validateCouponCodes = (data) => {
        if (hasCouponCodeValue(data)) {
            clearErrors("couponCodes");
            return true;
        }

        setOpenDropdown(true);
        setActiveField((currentField) => currentField || "coupon");
        setError("couponCodes", {
            type: "manual",
            message: "Enter a coupon code, upload a QR image, or upload a UPC image",
        });

        return false;
    };

    const onSubmit = (data) => {
        const isImagesValid = validateImages();
        const isCouponCodesValid = validateCouponCodes(data);

        if (!isImagesValid || !isCouponCodesValid) return;

        const couponCode = data?.couponCode?.trim();
        const qrCodeFile = data?.qr_code?.[0];
        const upcCodeFile = data?.upc_code?.[0];
        const submittedRegularPrice = data?.finalPriceOnly
            ? Number(data?.finalPriceValue) || 0
            : Number(data?.regularPrice) || 0;
        const submittedDiscount = data?.finalPriceOnly
            ? 0
            : Number(data?.discountPercentage) || 0;

        const createDeal = {
            category: data?.category,
            title: data?.title,
            reguler_price: submittedRegularPrice,
            discount: submittedDiscount,
            highlight: data?.highlights,
            tags: data?.tags,
            description: data?.description,
            available_in_outlet: Array.isArray(data?.outlets)
                ? data.outlets
                : [data?.outlets],
            coupon: couponCode || undefined,
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(createDeal));

        if (imageFiles.length <= 0) {
            toast.error("Image is required");
            return;
        }

        imageFiles.forEach((file) => {
            formData.append("files", file);
        });

        if (qrCodeFile) {
            formData.append("qr", qrCodeFile);
        }

        if (upcCodeFile) {
            formData.append("upc", upcCodeFile);
        }

        createNewDeal(formData);
    };

    const onInvalid = () => {
        validateImages();
        validateCouponCodes(getValues());
    };

    const qrCodeInput = register("qr_code");
    const upcCodeInput = register("upc_code");

    const handleCodeFileChange = (event, setPreview) => {
        const file = event.target.files?.[0];
        setPreview(file ? URL.createObjectURL(file) : "");
    };

    const removeCodeFile = (fieldName, inputRef, setPreview) => {
        setValue(fieldName, null, { shouldValidate: true });
        setPreview("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 pt-28 pb-12">
            <div className="max-w-305 mx-auto">
                <div className="mb-8 border-b border-slate-200 pb-6">
                    <h1 className="text-3xl font-bold tracking-normal text-[#262626] sm:text-[32px]">Add New Deal</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit, onInvalid)} autoComplete="off" className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <UplodedImage
                                setImagesFiles={setImagesFiles}
                                setValue={setValue}
                                imageError={imageError}
                                setImageError={setImageError}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="text-xl font-bold text-primary">Deal Pricing</h2>
                            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <input
                                    type="checkbox"
                                    {...register("finalPriceOnly")}
                                    className="mt-1 h-4 w-4 accent-primary"
                                />

                                <div className="space-y-1">
                                    <span className="block text-sm font-semibold text-[#262626]">
                                        Final Price Only
                                    </span>
                                    <p className="text-sm leading-6 text-slate-500">
                                        Let the customer see a single final price and skip the regular price plus discount breakdown.
                                    </p>
                                </div>
                            </label>
                            {/* Regular Price */}
                            <div className={isFinalPriceOnly ? "opacity-70" : ""}>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Regular Price<span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#262626]">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter regular price"
                                        autoComplete="off"
                                        defaultValue=""
                                        disabled={isFinalPriceOnly}
                                        {...register("regularPrice", {
                                            setValueAs: (v) => (v === "" ? "" : Number(v)),
                                            validate: (value) => {
                                                if (isFinalPriceOnly) return true;
                                                if (value === "") return "Regular price is required";
                                                if (Number(value) < 0) return "Price cannot be negative";
                                                return true;
                                            },
                                        })}
                                        className={`w-full rounded-full border bg-white py-4 pl-10 pr-6 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.regularPrice ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-primary"} ${disabledPricingInputClasses}`}
                                    />
                                </div>

                                {errors.regularPrice && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.regularPrice.message}
                                    </p>
                                )}
                            </div>

                            {/* Discount */}
                            <div className={isFinalPriceOnly ? "opacity-70" : ""}>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    What is the discount percentage for this deal?
                                    <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Enter discount (0–100)"
                                        autoComplete="off"
                                        defaultValue=""
                                        disabled={isFinalPriceOnly}
                                        {...register("discountPercentage", {
                                            setValueAs: (v) => (v === "" ? "" : Number(v)),
                                            validate: (value) => {
                                                if (isFinalPriceOnly) return true;
                                                if (value === "") return "Discount percentage is required";
                                                if (Number(value) < 0) return "Discount cannot be less than 0";
                                                if (Number(value) > 100) return "Discount cannot be more than 100";
                                                return true;
                                            },
                                        })}
                                        className={`w-full rounded-full border bg-white px-6 py-4 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.discountPercentage ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-primary"} ${disabledPricingInputClasses}`}
                                    />

                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[#262626]">
                                        %
                                    </span>
                                </div>

                                {errors.discountPercentage && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.discountPercentage.message}
                                    </p>
                                )}
                            </div>

                            {/* Final Price */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    {isFinalPriceOnly ? (
                                        <>
                                            Final Price<span className="text-red-500">*</span>
                                        </>
                                    ) : (
                                        <>
                                            Final price after the discount
                                        </>
                                    )}
                                </label>

                                <div className="relative">
                                    {isFinalPriceOnly ? (
                                        <>
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#262626]">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter final price"
                                                autoComplete="off"
                                                defaultValue=""
                                                {...register("finalPriceValue", {
                                                    setValueAs: (v) => (v === "" ? "" : Number(v)),
                                                    validate: (value) => {
                                                        if (!isFinalPriceOnly) return true;
                                                        if (value === "") return "Final price is required";
                                                        if (Number(value) < 0) return "Final price cannot be negative";
                                                        return true;
                                                    },
                                                })}
                                                className={`w-full rounded-full border bg-white py-4 pl-10 pr-6 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.finalPriceValue ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-primary"}`}
                                            />
                                        </>
                                    ) : (
                                        <input
                                            type="text"
                                            readOnly
                                            value={`$${finalPrice.toFixed(2)}`}
                                            className="w-full cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-6 py-4 font-medium text-[#262626] outline-none"
                                        />
                                    )}
                                </div>

                                {isFinalPriceOnly && errors.finalPriceValue && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.finalPriceValue.message}
                                    </p>
                                )}

                                {isFinalPriceOnly && (
                                    <p className="mt-2 text-sm text-slate-500">
                                        This single value will be saved as the customer-facing final price.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="text-xl font-bold text-primary">Deal Info</h2>

                            {/* Title */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Deal Title<span className="text-red-500">*</span>
                                </label>

                                <input
                                    {...register("title", {
                                        required: "Deal title is required",
                                        validate: (value) =>
                                            value.trim().length >= 5 || "Title must be minimum 5 characters",
                                    })}
                                    placeholder="Enter Title"
                                    className={`w-full rounded-full border bg-white px-6 py-4 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.title ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-primary"}`}
                                />

                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Highlights */}
                            <Highlights setValue={setValue} />

                            {/* tags */}
                            <Tags
                                setValue={setValue}
                            />
                            {/* outlets */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Available Location
                                </label>

                                <div className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    {shopDetails?.data?.outlets?.map((out) => (
                                        <label
                                            key={out._id}
                                            className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-[#525252] transition-all hover:border-primary hover:bg-primary/5"
                                        >
                                            <input
                                                type="checkbox"
                                                value={out._id}
                                                {...register("outlets", {
                                                    required: "Select at least one outlet",
                                                })}
                                                className="h-4 w-4 accent-primary"
                                            />

                                            <span className="flex items-center gap-1">
                                                <MapPin size={16} className="text-primary" />
                                                {out?.outlet_name || "Location Name"}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {errors.outlets && (
                                    <p className="text-red-500 text-sm">
                                        {errors.outlets.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="text-xl font-bold text-primary">Deal Details</h2>
                            {/* Deal Category */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Deal Category<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("category", {
                                            required: "Category is required",
                                        })}
                                        className={`w-full appearance-none rounded-full border bg-white px-6 py-4 pr-12 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.category ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-primary"}`}>
                                        <option value="">Select Category</option>
                                        {categoriess?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat?.category_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 cursor-pointer">
                                        <ChevronDown className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-base text-[#262626] font-medium mb-2">
                                    Description<span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <textarea
                                        {...register("description", {
                                            required: "Description is required",
                                            validate: (value) =>
                                                value.trim().length >= 10 || "Description must be minimum 10 characters",
                                        })}
                                        placeholder="Enter Product Description"
                                        rows={4}
                                        className={`w-full resize-none rounded-lg border bg-white p-5 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-300 focus:border-primary"}`}
                                    />
                                </div>

                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                            {/* Coupon, QR Code, UPC Code - Accordion */}
                            <div className={`overflow-hidden rounded-lg border bg-white ${errors.couponCodes ? "border-red-500" : "border-slate-300"}`}>
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(prev => !prev)}
                                    className="flex w-full items-center justify-between px-6 py-4 text-base font-medium text-[#262626] transition-all hover:bg-slate-50"
                                >
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span>Coupon & Codes</span><span className="text-red-500">*</span>
                                        </div>
                                        {errors.couponCodes && (
                                            <p className="text-red-500 text-sm mt-1 font-normal">
                                                At least one field is required
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        <ChevronDown className="cursor-pointer" />
                                    </span>
                                </button>
                                {openDropdown && (
                                    <div className="border-t border-gray-200">
                                        <div className="flex flex-wrap gap-3 bg-slate-50 px-6 py-3">
                                            {[
                                                { key: "coupon", label: "Coupon Code" },
                                                { key: "qr", label: "QR Code" },
                                                { key: "upc", label: "UPC Code" },
                                            ].map((item) => (
                                                <button
                                                    key={item.key}
                                                    type="button"
                                                    onClick={() => setActiveField(prev => prev === item.key ? null : item.key)}
                                                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${activeField === item.key
                                                        ? "border-primary bg-primary text-white shadow-sm"
                                                        : "border-slate-300 bg-white text-[#262626] hover:border-primary hover:bg-primary/5"
                                                        }`}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Coupon Code Field */}
                                        {activeField === "coupon" && (
                                            <div className="border-t border-gray-100 px-6 py-4">
                                                <label className="block text-base text-[#262626] font-medium mb-2">
                                                    Coupon Code
                                                </label>
                                                <input
                                                    {...register("couponCode")}
                                                    placeholder="ABCD456"
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-6 py-4 text-[#262626] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                                                />
                                            </div>
                                        )}

                                        {/* QR Code Field */}
                                        {activeField === "qr" && (
                                            <div className="border-t border-gray-100 px-6 py-4">
                                                <label className="block text-base text-[#262626] font-medium mb-2">
                                                    QR Code
                                                    <span className="text-[12px] pl-2 text-slate-400">(QR file must be 500 × 500)</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    {...qrCodeInput}
                                                    ref={(element) => {
                                                        qrCodeInput.ref(element);
                                                        qrInputRef.current = element;
                                                    }}
                                                    onChange={(event) => {
                                                        qrCodeInput.onChange(event);
                                                        handleCodeFileChange(event, setQrPreview);
                                                    }}
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[#262626] outline-none transition-all file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                                                />
                                                {qrPreview && (
                                                    <div className="mt-3 w-fit rounded-lg border border-slate-200 bg-slate-50 p-2">
                                                        <div className="relative h-28 w-40 overflow-hidden rounded-md bg-white">
                                                            <img
                                                                src={qrPreview}
                                                                alt="QR Preview"
                                                                className="h-full w-full object-contain"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeCodeFile("qr_code", qrInputRef, setQrPreview)}
                                                                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white shadow-sm transition-all hover:bg-red-600 active:scale-90"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* UPC Code Field */}
                                        {activeField === "upc" && (
                                            <div className="border-t border-gray-100 px-6 py-4">
                                                <label className="block text-base text-[#262626] font-medium mb-2">
                                                    UPC Code
                                                    <span className="text-[12px] pl-2 text-slate-400">(UPC file must be 800 × 400)</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    {...upcCodeInput}
                                                    ref={(element) => {
                                                        upcCodeInput.ref(element);
                                                        upcInputRef.current = element;
                                                    }}
                                                    onChange={(event) => {
                                                        upcCodeInput.onChange(event);
                                                        handleCodeFileChange(event, setUpcPreview);
                                                    }}
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[#262626] outline-none transition-all file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                                                />
                                                {upcPreview && (
                                                    <div className="mt-3 w-fit rounded-lg border border-slate-200 bg-slate-50 p-2">
                                                        <div className="relative h-28 w-48 overflow-hidden rounded-md bg-white">
                                                            <img
                                                                src={upcPreview}
                                                                alt="UPC Preview"
                                                                className="h-full w-full object-contain"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeCodeFile("upc_code", upcInputRef, setUpcPreview)}
                                                                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white shadow-sm transition-all hover:bg-red-600 active:scale-90"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center border-t border-slate-200 pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex min-w-60 cursor-pointer items-center justify-center rounded-full bg-primary px-12 py-3.5 text-lg font-bold text-white shadow-xl shadow-[#4BBDCF]/20 transition-all hover:bg-secondary active:scale-95 disabled:cursor-not-allowed disabled:opacity-70">
                            {isLoading ? (
                                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg text-[#FFFFFF]">Create Deal</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorCreateDeal;

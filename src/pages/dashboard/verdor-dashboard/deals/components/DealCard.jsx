import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import Countdown from "../../../../home/deals/Countdown";
import { useHandleDeleteDealMutation } from "../../../../../features/deal/dealApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { getDealPricing } from "../../../../../utils/dealPricing";

const DealCard = ({ deal }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const { discount, promotedUntil, reguler_price, activePromotion } = deal || {};
    const { regularPrice, finalPrice, hasDiscount } = getDealPricing(reguler_price, discount);
    const [handleDeleteDeal, { isLoading }] = useHandleDeleteDealMutation();
    const now = new Date();
    const expiredDeal = new Date(deal?.promotedUntil) < now && activePromotion !== null;
    const activeDeal = new Date(deal?.promotedUntil) >= now && activePromotion !== null
    const newDeal = activePromotion === null;

    const openConfirm = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleDealDelete = async (id) => {
        try {
            const res = await handleDeleteDeal(id).unwrap();

            if (res?.success) {
                toast.success(res?.message || "Deal deleted successfully");
                setShowConfirm(false);
            } else {
                toast.error(res?.message || "Something went wrong");
            }

        } catch (error) {
            console.error("Delete failed:", error);

            toast.error(
                error?.data?.message || "Delete failed. Please try again"
            );
        }
    };

    const actionsWrapperClasses = "flex w-full flex-wrap items-center gap-2 md:w-auto md:shrink-0 md:justify-end";
    const actionButtonClasses = "group relative flex min-h-10 flex-1 basis-[6.5rem] items-center justify-center overflow-hidden rounded-md border border-gray-300 px-3 py-2 font-semibold text-gray-600 transition-all duration-400 cursor-pointer disabled:opacity-50 md:min-h-0 md:flex-none md:basis-auto md:px-4 md:py-1.5";
    const statusBadgeClasses = "rounded-full border border-[#BEE6C2] bg-[#F0F9FF] px-2.5 py-1 text-xs font-bold text-primary";

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 lg:items-center mt-5 overflow-hidden">
            <div className="w-full h-40 sm:h-48 lg:w-32 lg:h-24 rounded-lg overflow-hidden shrink-0">
                <img
                    src={deal?.images?.[0]}
                    alt={deal?.title || "Deal"}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="min-w-0 grow">
                <div className="flex justify-between items-start min-w-0">
                    <h3 className="font-bold text-[#262626] text-base leading-tight w-full wrap-break-word">
                        {deal.title}
                    </h3>
                </div>

                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="min-w-0">
                        <div className="flex min-w-0 items-center gap-1 text-gray-400 text-sm">
                            <Store size={17} className="shrink-0" />
                            <span className="min-w-0 truncate">{deal?.shop?.business_name}</span>
                        </div>
                        <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                <span className="text-xl font-bold text-[#262626]">
                                    ${finalPrice.toFixed(2)}
                                </span>

                                {hasDiscount && (
                                    <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                        ${regularPrice.toFixed(1)}
                                    </span>
                                )}
                            </div>
                            {
                                activeDeal && <Countdown countdown={promotedUntil} />
                            }
                            {
                                expiredDeal && <div className={statusBadgeClasses}>
                                    Expired
                                </div>
                            }
                            {
                                newDeal && <div className="inline-flex max-w-full rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
                                    Not Promoted Deal Yet
                                </div>
                            }
                        </div>
                    </div>
                    {
                        activeDeal && <div className={actionsWrapperClasses}>
                            <Link
                                to={`/vendor-edit-deal/${deal?._id}`}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    Update
                                </span>
                            </Link>
                            <button
                                onClick={() => openConfirm(deal?._id)}
                                disabled={isLoading}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    {isLoading ? "Deleting..." : "Delete"}
                                </span>
                            </button>
                        </div>
                    }
                    {
                        newDeal && <div className={actionsWrapperClasses}>
                            <Link
                                to={`/create-deal-plan/${deal?._id}`}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    Active
                                </span>
                            </Link>
                            <Link
                                to={`/vendor-edit-deal/${deal?._id}`}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    Update
                                </span>
                            </Link>
                            <button
                                onClick={() => openConfirm(deal?._id)}
                                disabled={isLoading}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    {isLoading ? "Deleting..." : "Delete"}
                                </span>
                            </button>
                        </div>
                    }
                    {
                        expiredDeal && <div className={actionsWrapperClasses}>
                            <Link
                                to={`/create-deal-plan/${deal?._id}`}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    Reactivate
                                </span>
                            </Link>
                            <Link
                                to={`/vendor-edit-deal/${deal?._id}`}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    Update
                                </span>
                            </Link>
                            <button
                                onClick={() => openConfirm(deal?._id)}
                                disabled={isLoading}
                                className={actionButtonClasses}>
                                <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                    {isLoading ? "Deleting..." : "Delete"}
                                </span>
                            </button>
                        </div>
                    }
                </div>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[calc(100%-2rem)] max-w-sm shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Are you sure?
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={() => handleDealDelete(selectedId)}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DealCard;

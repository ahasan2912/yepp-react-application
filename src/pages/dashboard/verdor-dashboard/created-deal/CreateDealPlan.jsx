import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllPlanQuery } from "../../../../features/plan/planApi";
import PromoteDealSkeleton from "../../../../components/skeleton/PromoteDealSkeleton";
import { useGetDealDetailsQuery } from "../../../../features/deal/dealApi";
import useUserLocation from "../../../../hooks/useUserLocation";
import { useGetCouponCodeQuery } from "../../../../features/coupon/couponApi";
import { useHandlePaymentMutation } from "../../../../features/payment/paymentApi";

const CreateDealPlan = () => {
    const [code, setCode] = useState('');
    const { id } = useParams();
    const { latitude, longitude } = useUserLocation();
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            plan: "",
            voucherCode: "",
        },
    });

    const formData = watch();
    const selectedPlan = watch("plan");

    const { data: plans, isLoading } = useGetAllPlanQuery();
    const { data: dealDetails, isLoading: dealDetailsLoading } = useGetDealDetailsQuery({ id, longitude, latitude });
    const { data: couponCode, isLoading: couponCodeLaoding, isSuccess, error } = useGetCouponCodeQuery(code, {
        skip: !code || code.length < 1,
    });
    const [handlePayment, { isLoading: paymentLoading }] = useHandlePaymentMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (plans?.data?.length && !selectedPlan) {
            setValue("plan", plans.data[0]._id);
        }
    }, [plans, selectedPlan, setValue]);

    if (isLoading || dealDetailsLoading) {
        return <PromoteDealSkeleton />;
    }

    const handleApplyCoupon = () => {
        setCode(formData?.voucherCode);
    };

    const selectPromotedPaln = plans?.data.find((plan) => plan._id === formData?.plan);
    const { _id, title, category } = dealDetails?.data || {};

    const discountPrice = ((selectPromotedPaln?.price * couponCode?.data?.discount_parentage) / 100);
    const finalPrice = selectPromotedPaln?.price - discountPrice;

    console.log(selectPromotedPaln)

    const onSubmit = async () => {
        const finalData = {
            planId: selectedPlan,
            dealId: id,
            voucher: code,
        };
        console.log(finalData);
        const res = await handlePayment(finalData);
        window.location.href = res?.data?.data?.checkout_url;

    };

    return (
        <>
            {/* Root */}
            <div className="min-h-screen bg-linear-to-br from-[#f8fff8] via-[#f3fbf4] to-[#f0fdf4] pt-28 px-4 pb-16 box-border">
                <div className="max-w-305 mx-auto">

                    {/* Page heading */}
                    <h1 className="mb-9 text-3xl font-extrabold text-[#0f1f2e] sm:text-4xl">
                        Promote your{' '}
                        <span className="bg-linear-to-br from-[#4CAF50] to-[#79be7b] bg-clip-text text-transparent">
                            deal
                        </span>
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:items-start">

                            {/* ── LEFT: Plan Selection ── */}
                            <div>
                                <p className="text-[11px] font-bold uppercase text-primary mb-3.5 tracking-[1.5px]">
                                    Choose a promotion plan
                                </p>

                                <div className="flex flex-col gap-3">
                                    {plans?.data.map((plan) => {
                                        const isActive = selectedPlan === plan._id;
                                        return (
                                            <div
                                                key={plan._id}
                                                onClick={() => setValue("plan", plan._id)}
                                                className={`flex items-center justify-between gap-4 px-5.5 py-4.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden
                                                    ${isActive
                                                        ? 'border-green-200 bg-green-50 shadow-[0_6px_28px_rgba(76,175,80,0.18)]'
                                                        : 'border-[#e5f2e6] bg-white hover:border-[#b8e2ba] hover:bg-green-50 hover:shadow-[0_4px_20px_rgba(76,175,80,0.1)] hover:-translate-y-px'
                                                    }`}
                                            >
                                                {/* Left side */}
                                                <div className="flex items-center gap-4 min-w-0 relative z-1">
                                                    <div
                                                        className={`w-4.5 h-4.5 rounded-full border-2 shrink-0 relative z-1 transition-colors duration-200
                                                            ${isActive
                                                                ? 'border-primary bg-primary shadow-[inset_0_0_0_3px_#fff]'
                                                                : 'border-[#d9e8da]'
                                                            }`}
                                                    />
                                                    <div className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-[#d7eed8] bg-linear-to-br from-[#f7fff8] to-[#e8f5e9]">
                                                        <img
                                                            src={plan?.icon}
                                                            alt={plan?.title}
                                                            className="w-9 h-10 object-contain"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-[15px] font-bold text-[#0f1f2e] mb-0.75 wrap-break-word m-0">
                                                            {plan?.title}
                                                        </h4>
                                                        <p className="text-[13px] text-[#6e8f70] wrap-break-word leading-[1.4] m-0">
                                                            {plan?.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`text-xl font-extrabold whitespace-nowrap relative z-1 ${isActive ? 'text-primary' : 'text-[#0f1f2e]'}`}>
                                                    ${plan?.price}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── RIGHT: Summary ── */}
                            <div className="bg-white rounded-[14px] border border-[#e5f2e6] shadow-[0_8px_40px_rgba(76,175,80,0.08)] overflow-hidden">
                                <div className="px-6 py-5 bg-linear-to-br from-[#4CAF50] to-[#79be7b]">
                                    <p className="text-[17px] font-bold text-white wrap-break-word m-0">
                                        {title || "—"}
                                    </p>
                                </div>
                                <div className="px-6 py-5">
                                    <div className="flex items-baseline justify-between gap-3 py-2.5">
                                        <span className="text-sm text-[#6e8f70] font-medium whitespace-nowrap">Category</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word">
                                            {category?.category_name || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[#edf7ee]">
                                        <span className="text-sm text-[#6e8f70] font-medium whitespace-nowrap">Selected Plan</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word">
                                            {selectPromotedPaln?.title || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[#edf7ee]">
                                        <span className="text-sm text-[#6e8f70] font-medium whitespace-nowrap">Plan Price</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word">
                                            ${(selectPromotedPaln?.price ?? 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[#edf7ee]">
                                        <span className="text-sm text-[#6e8f70] font-medium whitespace-nowrap">Discount</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word">
                                            {discountPrice
                                                ? <span>${discountPrice.toFixed(2)}</span>
                                                : "0$"
                                            }
                                        </span>
                                    </div>
                                    <div className="h-px my-1 bg-linear-to-r from-transparent via-[#cfead1] to-transparent" />
                                    <div className="flex items-center justify-between pt-3.5 pb-1.5">
                                        <span className="text-[15px] font-bold text-[#0f1f2e]">
                                            Total
                                        </span>
                                        <span className="text-[22px] font-extrabold text-primary">
                                            ${finalPrice || selectPromotedPaln?.price || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-6 pb-5">
                                    <p className="text-[13px] font-bold text-[#0f1f2e] mb-1">
                                        Coupon / Voucher Code
                                    </p>
                                    <p className="text-xs text-[#7da67f] mb-2.5 leading-normal m-0">
                                        Enter your coupon or voucher code to get a discount on this plan.
                                    </p>

                                    <div className="flex items-center gap-2 bg-[#f7fff8] border-[1.5px] border-[#cfead1] rounded-xl pl-4 pr-1.5 py-1.5 transition-all duration-200 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(76,175,80,0.16)]">
                                        <input
                                            {...register("voucherCode")}
                                            placeholder="ABCD456"
                                            className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm font-medium text-[#0f1f2e] tracking-[0.5px] placeholder-[#9fc5a1]"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            disabled={couponCodeLaoding}
                                            className={`shrink-0 flex items-center gap-1.5 text-white border-none rounded-lg px-4.5 py-2 text-[13px] font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap
                                                disabled:opacity-50 disabled:cursor-not-allowed
                                                ${isSuccess
                                                    ? 'bg-linear-to-br from-[#4CAF50] to-[#79be7b]'
                                                    : 'bg-primary hover:bg-secondary active:scale-[0.97]'
                                                }`}
                                        >
                                            {couponCodeLaoding
                                                ? <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                : isSuccess ? "✓ Applied" : "Apply"
                                            }
                                        </button>
                                    </div>

                                    {error?.data?.message === 'INVALID_VOUCHER' && (
                                        <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                                            Invalid voucher code. Please try again.
                                        </p>
                                    )}
                                </div>

                                {/* Checkout */}
                                <div className="px-6 pt-4 pb-6">
                                    <button
                                        type="submit"
                                        disabled={paymentLoading}
                                        className="w-full flex items-center justify-center gap-2 text-white border-none rounded-[14px] py-4 text-base font-bold cursor-pointer tracking-[0.3px] bg-linear-to-br from-[#4CAF50] to-[#79be7b] shadow-[0_8px_24px_rgba(76,175,80,0.35)] transition-all duration-200 hover:opacity-[0.93] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(76,175,80,0.4)] active:scale-[0.98] disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {paymentLoading
                                            ? <span className="inline-block h-5 w-5 animate-spin rounded-full border-[2.5px] border-white/40 border-t-white" />
                                            : <>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.02" />
                                                </svg>
                                                Check Out
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateDealPlan;

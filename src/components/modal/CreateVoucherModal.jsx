import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateVoucherMutation } from "../../features/coupon/couponApi";
import { useNavigate } from "react-router-dom";

const CreateVoucherModal = ({ isOpen, toggleModal }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {}
    });
    const [createVoucher, { isLoading, error, isSuccess }] = useCreateVoucherMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Voucher created successfully!");
        }

        if (error) {
            const message = error?.data?.message || "Voucher creation failed!";
            toast.error(message);
        }

    }, [isSuccess, error, toggleModal, navigate]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        const voucherData = {
            voucher_code: data?.voucher_code,
            voucher_discount: Number(data?.voucher_discount),
            voucher_limit: Number(data?.voucher_limit),
            voucher_validity: data?.voucher_validity,
        };
        const res = await createVoucher(voucherData);
        if (res?.data?.success) {
            toggleModal();
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs overflow-y-auto pt-36"
            onClick={toggleModal}>
            <div
                className="relative w-full max-w-125 p-6 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={toggleModal}
                    className="absolute top-6 right-4 text-gray-400 hover:text-gray-600">
                    <X />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 pb-5">Create Voucher</h2>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <label className="text-left text-gray-800">Voucher code</label>
                            <input
                                type="text"
                                placeholder="Voucher Code"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('voucher_code', {
                                    required: 'Voucher code required',
                                })}
                            />
                        </div>
                        {errors.voucher_code && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.voucher_code.message}
                            </p>
                        )}
                        <div className="relative">
                            <label className="text-left text-gray-800">Voucher discount</label>
                            <input
                                type="number"
                                placeholder="Discount Value"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('voucher_discount', {
                                    required: 'Discount value required',
                                })}
                            />
                        </div>
                        {errors.voucher_discount && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.voucher_discount.message}
                            </p>
                        )}
                        <div className="relative">
                            <label className="text-left text-gray-800">Voucher limitation</label>
                            <input
                                type="number"
                                placeholder="Limit Per User"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('voucher_limit', {
                                    required: 'Limit required',
                                })}
                            />
                        </div>
                        {errors.voucher_limit && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.voucher_limit.message}
                            </p>
                        )}
                        <div className="relative">
                            <label className="text-left text-gray-800">Voucher validity date</label>
                            <input
                                type="date"
                                placeholder="Valid Until"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('voucher_validity', {
                                    required: 'Valid until required',
                                })}
                            />
                        </div>
                        {errors.voucher_validity && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.voucher_validity.message}
                            </p>
                        )}
                        <div className="text-center pt-10">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl w-full flex items-center justify-center">
                                {isLoading ? (
                                    <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg text-[#FFFFFF]">Create Voucher</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateVoucherModal;
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateNewPlanMutation } from "../../features/plan/planApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AddPlansModal = ({ isOpen, toggleModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createNewPlan, { isLoading, error, isSuccess }] = useCreateNewPlanMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Plan created successfully!");
        }
        if (error) {
            const message = error?.data?.message || "Plan created failed!";
            toast.error(message);
        }

    }, [isSuccess, error]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        const planCreate = {
            title: data?.plan_name,
            short_desc: data?.plan_description,
            durationDays: Number(data?.plan_duration),
            price: Number(data?.paln_price),
            currency: "USD",
        };
        const formData = new FormData();
        formData.append("data", JSON.stringify(planCreate));
        formData.append("file", data?.photo?.[0]);
        const res = await createNewPlan(formData);
        if (res?.data?.success) {
            toggleModal();
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs overflow-y-auto pt-36"
            onClick={toggleModal}>
            <div
                className="relative w-full max-w-2xl p-6 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 "
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={toggleModal}
                    className="absolute top-6 right-4 text-gray-400 hover:text-gray-600">
                    <X />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 pb-5">Add Plan</h2>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan name</label>
                            <input
                                type="text"
                                placeholder="Plam Name"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-800"
                                {...register('plan_name', {
                                    required: 'Paln name required',
                                })}
                            />
                        </div>
                        {errors.plan_name && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.plan_name.message}
                            </p>
                        )}
                        {/* ---plan price---- */}
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan price</label>
                            <input
                                type="number"
                                placeholder="Plan price"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-800"
                                {...register('paln_price', {
                                    required: 'Plan Price required',
                                })}
                            />
                        </div>
                        {errors.paln_price && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.paln_price.message}
                            </p>
                        )}
                        {/* ---- plan duration ----- */}
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan duration day</label>
                            <input
                                type="number"
                                placeholder="Plan duration day"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-800"
                                {...register('plan_duration', {
                                    required: 'Plan duration required',
                                })}
                            />
                        </div>
                        {errors.plan_duration && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.plan_duration.message}
                            </p>
                        )}
                        {/* ---- plan descriptoin --- */}
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan description</label>
                            <textarea
                                type="text"
                                placeholder="Plan short description"
                                rows={3}
                                className="mt-2 w-full px-6 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-800"
                                {...register('plan_description', {
                                    required: 'Plan description required',
                                })}
                            />
                        </div>
                        {errors.plan_description && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.plan_description.message}
                            </p>
                        )}
                        {/* ----plan image---- */}
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan Image</label>
                            <input
                                type="file"
                                placeholder="User Name"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('photo', {
                                    required: 'Plan image required',
                                })}
                            />
                        </div>
                        {errors.plan_description && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.photo.message}
                            </p>
                        )}
                        <div className="text-center pt-5">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl w-full flex items-center justify-center">
                                {isLoading ? (
                                    <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg text-[#FFFFFF]">Add Plan</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPlansModal;
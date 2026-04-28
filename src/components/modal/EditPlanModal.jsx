import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEditPlanMutation, useGetAllPlanQuery } from "../../features/plan/planApi";
import PlanTableSkeleton from "../skeleton/dashboard/PlanTableSkeleton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditPlanModal = ({ isOpen, toggleModal, editId }) => {
    const [image, setImage] = useState("");
    const { data: allPlans, isLoading } = useGetAllPlanQuery();
    const [editPlan, { isLoading: editLoading, error, isSuccess }] = useEditPlanMutation();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            plan_name: "",
            plan_description: "",
            plan_duration: "",
            paln_price: "",
            photo: null
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Plan updated successfully!");
        }
        if (error) {
            const message = error?.data?.message || "Plan upaded failed!";
            toast.error(message);
        }

    }, [isSuccess, error, reset]);

    useEffect(() => {
        if (allPlans?.data) {
            const plan = allPlans?.data?.find(cat => cat?._id === editId);
            if (plan) {
                const { durationDays, icon, price, short_desc, title } = plan || {};
                reset({
                    plan_name: title || "",
                    plan_description: short_desc || "",
                    plan_duration: durationDays || "",
                    paln_price: price || "",
                    photo: null
                });
                setImage(icon || "");
            }
        }
    }, [allPlans?.data, editId, reset]);

    const imageCategoryFile = watch("photo");
    useEffect(() => {
        if (imageCategoryFile && imageCategoryFile[0]) {
            setImage(URL.createObjectURL(imageCategoryFile[0]));
        }
    }, [imageCategoryFile]);

    if (isLoading) {
        return <PlanTableSkeleton />
    }

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        const plan = allPlans?.data?.find(cat => cat?._id === editId);

        const updatePlan = {
            title: data?.plan_name,
            short_desc: data?.plan_description,
            durationDays: Number(data?.plan_duration),
            price: Number(data?.paln_price),
            currency: "USD",
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(updatePlan));
        if (data?.photo?.[0]) {
            formData.append("file", data.photo[0]);
        } else {
            formData.append("file", plan?.icon);
        }

        const res = await editPlan({
            id: editId,
            data: formData
        });
        if (res?.data?.statusCode) {
            toggleModal();
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs overflow-y-auto pt-36">
            <div
                className="relative w-full max-w-full sm:max-w-2xl p-6 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={toggleModal}
                    className="absolute top-6 right-4 text-gray-400 hover:text-gray-600">
                    <X />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 pb-5">Edit Plan</h2>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Plan Name */}
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan name</label>
                            <input
                                type="text"
                                placeholder="Plan Name"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-800"
                                {...register('plan_name', {
                                    required: 'Plan name required',
                                })}
                            />
                        </div>
                        {errors.plan_name && (
                            <p className="text-sm text-red-500 ml-4">
                                {errors.plan_name.message}
                            </p>
                        )}

                        {/* Plan Price */}
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

                        {/* Plan Duration */}
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

                        {/* Plan Description */}
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

                        {/* Plan Image */}
                        <div className="relative">
                            <label className="text-left text-gray-800">Plan Image</label>
                            <input
                                type="file"
                                placeholder="User Name"
                                className="mt-2 w-full px-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('photo')}
                            />
                        </div>

                        {/* Show Image */}
                        <div className="flex gap-3 mt-5">
                            <div>
                                <label className="block text-sm text-[#6b6767] font-medium mb-2 text-left">
                                    Category Image
                                </label>
                                {image && (
                                    <img
                                        src={image}
                                        alt="Category Preview"
                                        className="mb-2 w-28 h-fit object-contain border border-gray-300 rounded-md"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-5">
                            <button
                                type="submit"
                                disabled={editLoading}
                                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-20 rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all transform active:scale-95 text-xl w-full flex items-center justify-center">
                                {editLoading ? (
                                    <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                                ) : (
                                    <span className="font-medium text-lg text-[#FFFFFF]">Update Plan</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPlanModal;
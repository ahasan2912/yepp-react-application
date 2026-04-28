import { useState } from "react";
import { useDeletePlanMutation, useGetAllPlanQuery } from "../../../../features/plan/planApi";
import PlanTableSkeleton from "../../../../components/skeleton/dashboard/PlanTableSkeleton";
import toast from "react-hot-toast";
import EditPlanModal from "../../../../components/modal/EditPlanModal";

const PlansTable = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editselectedId, setEditSelectedId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const { data: allPlans, isLoading } = useGetAllPlanQuery();
    const [deletePlan, { isLoading: planDeleteLoading }] = useDeletePlanMutation();

    if (isLoading) {
        return <PlanTableSkeleton />
    }

    const openConfirm = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleplanDelete = async (id) => {
        try {
            const res = await deletePlan(id).unwrap();

            if (res?.success) {
                toast.success(res?.message || "Plan deleted successfully");
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
    }

    const handlePlanEdit = async (id) => {
        toggleModal();
        setEditSelectedId(id);
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Image</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Name</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Price</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Duration</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {allPlans?.data?.length > 0 ? (
                        allPlans?.data?.map((plan) => (
                            <tr key={plan?._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-3 px-6">
                                    <div className="w-20 h-16 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden bg-gray-50 shadow-sm">
                                        <img
                                            src={plan?.icon}
                                            alt={plan?.title || "planImage"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                </td>

                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {plan?.title}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {plan?.price}$
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {plan?.durationDays} Day
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handlePlanEdit(plan?._id)} className="bg-primary hover:bg-secondary text-white py-1.5 px-4 rounded-sm text-sm font-medium transition-colors border border-[#4BBDCF] cursor-pointer">
                                            Edit
                                        </button>
                                        <button onClick={() => openConfirm(plan?._id)} className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-1.5 px-4 rounded-sm text-sm font-medium transition-colors border border-red-200 cursor-pointer">
                                            {planDeleteLoading ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-gray-400">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="mt-2 text-sm">No categories found</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-87.5 shadow-lg">
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
                                onClick={() => handleplanDelete(selectedId)}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative flex flex-col items-center justify-center">
                <EditPlanModal
                    editId={editselectedId}
                    isOpen={isOpen}
                    toggleModal={toggleModal} />
            </div>
        </div>
    );
};

export default PlansTable;
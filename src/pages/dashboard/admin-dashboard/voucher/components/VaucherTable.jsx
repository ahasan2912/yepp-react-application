import { useState } from "react";
import VaucherTableSkeleton from "../../../../../components/skeleton/dashboard/VaucherTableSkeleton";
import { useDeleteVoucherCodeMutation, useGetAllVoucherCodeQuery } from "../../../../../features/coupon/couponApi";
import toast from "react-hot-toast";
import EditVoucherModal from "../../../../../components/modal/EditVoucherModal";

const VaucherTable = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editselectedId, setEditSelectedId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const { data: allVoucher, isLoading } = useGetAllVoucherCodeQuery();
    const [deleteVoucherCode, { isLoading: voucherDeleteLoading }] = useDeleteVoucherCodeMutation();
    if (isLoading) {
        return <VaucherTableSkeleton />
    }

    const openConfirm = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleVoucherDelete = async (id) => {
        try {
            const res = await deleteVoucherCode(id).unwrap();

            if (res?.success) {
                toast.success(res?.message || "Voucher deleted successfully");
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

    const handleEdidtVoucher = (id) => {
        toggleModal();
        setEditSelectedId(id);
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Voucher Code</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Discount</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Limit</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Validity Date</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700">Status</th>
                        <th className="py-4 px-6 text-base font-semibold text-gray-700 text-right">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {allVoucher?.data.length > 0 ? (
                        allVoucher?.data.map((voucher) => (
                            <tr key={voucher._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {voucher?.voucher_code}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {voucher?.voucher_discount}%
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {voucher?.voucher_limit || 0}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        {voucher?.voucher_validity ? new Date(voucher?.voucher_validity).toLocaleDateString() : "Invalid"}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="font-semibold text-gray-800 text-base">
                                        Yes
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleEdidtVoucher(voucher?._id)} className="bg-primary hover:bg-secondary text-white py-1.5 px-4 rounded-sm text-sm font-medium transition-colors border border-[#4BBDCF] cursor-pointer">
                                            Edit
                                        </button>
                                        <button onClick={() => openConfirm(voucher?._id)} className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-1.5 px-4 rounded-sm text-sm font-medium transition-colors border border-red-200 cursor-pointer">
                                            {voucherDeleteLoading ? "Deleting..." : "Delete"}
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
                                onClick={() => handleVoucherDelete(selectedId)}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative flex flex-col items-center justify-center">
                <EditVoucherModal
                    editId={editselectedId}
                    isOpen={isOpen}
                    toggleModal={toggleModal} />
            </div>
        </div>
    );
};

export default VaucherTable;
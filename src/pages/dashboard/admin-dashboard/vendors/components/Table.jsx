import { MoreHorizontal, Store } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Table = ({ vendorData, handleStatusChange, isStatusUpdating }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-y border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-base font-semibold text-primary">Shop</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">User</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Deals</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Status</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Revenue</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary text-right">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {vendorData?.length > 0 ? (
                        vendorData.map((item) => (
                            <tr key={item?._id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-md bg-cyan-50 flex items-center justify-center border border-cyan-100 text-primary">
                                            <Store size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#525252] text-base">
                                                {item?.business_name}
                                            </div>
                                            <div className="text-sm font-medium text-[#737373]">
                                                {item?.business_email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.vendor?.user_name}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.totalDeals}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${item?.shop_approval === "APPROVED"
                                            ? "bg-[#DCFCE7] text-[#22C55E]"
                                            : item?.shop_approval === "PENDING"
                                                ? "bg-[#FEF9C3] text-[#CA8A04]"
                                                : item?.shop_approval === "REJECTED"
                                                    ? "bg-[#FEE2E2] text-[#DC2626]"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {item?.shop_approval}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-sm font-semibold text-[#525252]">
                                    ${item?.totalRevenue || 0}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="relative inline-block" ref={openDropdownId === item?._id ? dropdownRef : null}>
                                        <button
                                            onClick={() =>
                                                setOpenDropdownId(openDropdownId === item?._id ? null : item?._id)
                                            }
                                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>

                                        {openDropdownId === item?._id && (
                                            <div className="absolute right-0 -top-22 mt-2 w-40 pb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                                                <button
                                                    onClick={() => {
                                                        setOpenDropdownId(null);
                                                        handleStatusChange(item?._id, "APPROVED");
                                                    }}
                                                    disabled={isStatusUpdating}
                                                    className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 font-medium"
                                                >
                                                    Approved
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenDropdownId(null);
                                                        handleStatusChange(item?._id, "REJECTED");
                                                    }}
                                                    disabled={isStatusUpdating}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                No vendors found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

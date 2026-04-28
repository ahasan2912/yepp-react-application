import { BadgeRussianRuble } from "lucide-react";

const Table = ({ paymentData }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-y border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-base font-semibold text-primary">Transaction ID</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Deals</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Plan</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Status</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Amount</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Provider</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Date</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {paymentData?.length > 0 ? (
                        paymentData.map((item) => (
                            <tr key={item?._id} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-cyan-50 flex items-center justify-center border border-cyan-100 text-primary">
                                            <BadgeRussianRuble size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#525252] text-sm">
                                                {item?.transaction_id}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-base text-gray-600">
                                    {item?.deal?.title}
                                </td>

                                <td className="px-6 py-4 text-base text-gray-600">
                                    {item?.plan?.title}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${item?.payment_status === "PAID"
                                            ? "bg-[#DCFCE7] text-[#22C55E]"
                                            : item?.payment_status === "PENDING"
                                                ? "bg-[#FEF9C3] text-[#CA8A04]"
                                                : item?.payment_status === "CANCELED"
                                                    ? "bg-[#FEE2E2] text-[#DC2626]"
                                                    : item?.payment_status === "FAILED"
                                                        ? "bg-[#FECACA] text-[#B91C1C]"
                                                        : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {item?.payment_status
                                            ? item?.payment_status.charAt(0).toUpperCase() +
                                            item?.payment_status.slice(1).toLowerCase()
                                            : ""}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-[#525252]">
                                    ${item?.amount}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-[#525252]">
                                    {item?.provider
                                        ? item.provider.charAt(0).toUpperCase() + item.provider.slice(1).toLowerCase()
                                        : ""}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-[#525252]">
                                    {new Date(item?.createdAt).toLocaleDateString('en-GB')}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                No payment found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
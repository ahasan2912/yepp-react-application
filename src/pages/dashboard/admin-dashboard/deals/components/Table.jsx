import { Store } from 'lucide-react'
import { Link } from 'react-router-dom';
const Table = ({ dealsData }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-y border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-base font-semibold text-primary">Shop</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Deals</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Impression</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">View</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary">Status</th>
                        <th className="px-6 py-4 text-base font-semibold text-primary text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {dealsData?.length > 0 ? (
                        dealsData.map((item) => (
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
                                                {item?.category_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.title}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.impressions}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {item?.views}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-sm font-semibold ${item?.status === "Active"
                                            ? "bg-[#DCFCE7] text-[#22C55E]"
                                            : item?.status === "New"
                                                ? "bg-[#FEF9C3] text-[#CA8A04]"
                                                : item?.status === "Expired"
                                                    ? "bg-[#FEE2E2] text-[#DC2626]"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {item?.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        to={`/deal-details/${item?._id}`}
                                        className="relative inline-block overflow-hidden px-4 py-1.5 rounded-md font-semibold text-gray-600 border border-gray-300 group cursor-pointer transition-all duration-400">
                                        <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                            Details
                                        </span>
                                    </Link>
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
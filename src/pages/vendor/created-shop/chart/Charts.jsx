import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGetShopChatsQuery } from '../../../../features/shop/shopApi';
import PersonalOverviewSkeleton from '../../../../components/skeleton/PersonalOverviewSkeleton';

const Charts = () => {
    const [year, setYear] = useState("2026");
    const [type, setType] = useState("views");
    const { data: chatData, isLoading } = useGetShopChatsQuery(year);
    if (isLoading) {
        return <PersonalOverviewSkeleton />;
    }
    const formattedData =
        chatData?.data?.[year]?.map((item) => ({
            name: new Date(year, item.month - 1).toLocaleString("en-US", {
                month: "short",
            }),
            views: item.views,
            impressions: item.impressions,
        })) || [];
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary">
                        Personal Overview
                    </h2>
                    <span className="inline-flex rounded-full bg-[#E8F8FB] px-3 py-1 text-sm font-semibold text-primary">
                        Last 1 year
                    </span>
                </div>
                <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="min-w-0 rounded-lg border border-[#D4EEF3] bg-[#F8FCFD] px-3 py-2.5 text-sm font-semibold text-[#262626] shadow-sm outline-none transition-all duration-200 hover:border-[#4BBDCF] focus:border-primary focus:ring-2 focus:ring-primary/25 cursor-pointer sm:w-36"
                    >
                        <option value="views">Views</option>
                        <option value="impressions">Impressions</option>
                    </select>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="min-w-0 rounded-lg border border-[#D4EEF3] bg-[#F8FCFD] px-3 py-2.5 text-sm font-semibold text-[#262626] shadow-sm outline-none transition-all duration-200 hover:border-[#4BBDCF] focus:border-primary focus:ring-2 focus:ring-primary/25 cursor-pointer sm:w-32"
                    >
                        {Object.keys(chatData?.data || {}).map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-full h-75 sm:h-80 md:h-87.5 lg:h-100">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4BBDCF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4BBDCF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey={type}
                            stroke="#4BBDCF"
                            strokeWidth={3}
                            fill="url(#colorViews)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 gap-2 items-center text-sm text-gray-500">
                <span className="w-3 h-3 rounded-full border-2 border-[#4BBDCF]"></span>
                {year}
            </div>
        </div>
    );
};

export default Charts;

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from "../../../../../lib/utils";
import { useGetDealCategoriesPieChartQuery } from "../../../../../features/dashboard/dashboardHome";
import PieChartSectionSkeleton from "../../../../../components/skeleton/dashboard/PieChartSectionSkeleton";
import { FALLBACK_COLORS } from "../../../../../lib/data";

const PieChartSection = () => {
    const { data: categoriesDatas, isLoading, isError } = useGetDealCategoriesPieChartQuery();
    if (isLoading) return <PieChartSectionSkeleton />;
    if (isError) return <p className="py-5 text-lg text-right">Failed to load Deals by category.</p>;

    const chartData =
        categoriesDatas?.data?.dealsByCategory?.map((item, index) => ({
            name: item.category_name,
            value: item.count,
            color: item.color || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
        })) || [];
    const total = categoriesDatas?.data?.totalPromotedDeals || 0;

    return (
        <div className="w-full rounded-lg bg-white p-6 shadow-sm lg:w-1/2">
            <div>
                <h4 className="text-xl font-bold text-[#262626]">Deals by category</h4>
                <p className="mt-1 mb-4 text-base font-medium text-[#737373]">
                    Overview of deal distribution across different categories
                </p>
            </div>

            <div className="w-full">
                <div className="relative h-110 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 40, right: 80, bottom: 40, left: 80 }}>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={145}
                                dataKey="value"
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* center total */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-4xl font-bold text-gray-800">{total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PieChartSection;



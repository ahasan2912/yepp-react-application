import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useGetRevenueTrendChartQuery } from "../../../../../features/dashboard/dashboardHome";
import RevenueTrendChartSkeleton from "../../../../../components/skeleton/dashboard/RevenueTrendChartSkeleton ";

const RevenueTrendChart = () => {
  const { data: revenueDatas, isLoading, isError } =
    useGetRevenueTrendChartQuery();

  const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const revenueData = Array.isArray(revenueDatas?.data) ? revenueDatas.data : [];
  const sortedRevenueData = [...revenueData].sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  const maxValue =
    sortedRevenueData.length > 0
      ? Math.max(...sortedRevenueData.map((item) => Number(item.revenue) || 0))
      : 0;

  const maxDomain = Math.max(300, Math.ceil(maxValue / 300) * 300);

  if (isLoading) {
    return <RevenueTrendChartSkeleton />;
  }

  if (isError) {
    return <p className="py-5 text-lg">Failed to load revenue trend.</p>;
  }

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-sm lg:w-1/2">
      <h4 className="text-xl font-bold text-[#262626]">Last year revenue trend</h4>
      <p className="mt-1 mb-4 text-base font-medium text-[#737373]">
        Track your monthly revenue growth and trends for the past year
      </p>

      <div className="h-110 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedRevenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              domain={[0, maxDomain]}
              ticks={Array.from(
                { length: maxDomain / 300 + 1 },
                (_, i) => i * 300
              )}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
            />
            <Legend iconType="circle" />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#4BBDCF"
              radius={[4, 4, 0, 0]}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
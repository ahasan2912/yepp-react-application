import { DollarSign, Download, Store, Tag, TrendingUp, Users } from "lucide-react";
export const StatCardOne = ({ total_revenue }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-sm flex justify-between items-center`}>
            <div>
                <p className="text-xl font-medium text-gray-700">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-2">
                    {String(total_revenue || 0).padStart(2, "0")}
                </h3>
                {/* <p className="text-base mt-1 font-medium"> <span className="text-[#34C759]">+12%</span> last month</p> */}
            </div>
            <div className="bg-[#F9F0FF] p-4 rounded-md">
                <TrendingUp className="text-primary" size={28} />
            </div>
        </div>
    );
};

export const StatCardTwo = ({ lastMonthRevenue }) => {
    return (
        <div className={`bg-linear-to-r from-[#31ccba] to-[#2bd6c2] p-6 rounded-lg text-white shadow-sm flex justify-between items-center`}>
            <div>
                <p className="text-xl font-medium">Last month revenue</p>
                <h3 className="text-[32px] font-bold mt-1">
                    {String(lastMonthRevenue || 0).padStart(2, "0")}
                </h3>
            </div>
            <div className="bg-[#0bebd1] p-4 rounded-md">
                <DollarSign size={28} />
            </div>
        </div>
    );
};

export const StatCardThree = ({ active_vendors }) => {
    return (
        <div className={`bg-linear-to-r from-[#ecc346] to-[#F7C121] p-6 rounded-lg text-white shadow-sm flex justify-between items-center`}>
            <div className="space-y-2">
                <p className="text-xl font-medium">Active Vendors</p>
                <h3 className="text-3xl font-bold mt-1">
                    {String(active_vendors || 0).padStart(2, "0")}
                </h3>
                {/* <p className="text-base mt-1 font-medium"> +12% last month</p> */}
            </div>
            <div className="bg-[#ffca44] p-4 rounded-md">
                <Store className="text-[#FFFFFF]" size={28} />
            </div>
        </div>
    );
};

export const StatCardFour = ({ active_deals }) => {
    return (
        <div className={`bg-linear-to-r from-[#21C55D] to-[#35E374] p-6 rounded-lg text-white shadow-sm flex justify-between items-center`}>
            <div className="space-y-2">
                <p className="text-xl font-medium">Active Deals</p>
                <h3 className="text-3xl font-bold mt-1">
                    {String(active_deals || 0).padStart(2, "0")}
                </h3>
                {/* <p className="text-base mt-1 font-medium"> +12% last month</p> */}
            </div>
            <div className="bg-[#06f06f] p-4 rounded-md">
                <Tag className="text-[#FFFFFF]" size={28} />
            </div>
        </div>
    );
};

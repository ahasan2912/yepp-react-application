import { ChevronDown, Filter, Search } from "lucide-react";

const Header = ({
    setSearchTerm,
    filterRef,
    setIsFilterOpen,
    isFilterOpen,
    revenueFilter,
    setRevenueFilter,
}) => {
    return (
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-lg font-bold text-[#262626]">Deals</h1>
                <p className="text-sm text-[#737373] font-medium">
                   Manage all the deals of this platform
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by Deals"
                        className="pl-10 pr-4 py-2.5 border border-[#A3A3A3] rounded-lg outline-none w-64 text-sm"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                </div>

                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 px-4 py-2 border border-[#A3A3A3] rounded-lg text-sm font-medium transition-all"
                    >
                        <Filter className="w-4 h-4 text-gray-400" />
                        {revenueFilter === "-createdAt" ? "Filters" : `${revenueFilter}`}
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-20 py-1 overflow-hidden">
                            <button
                                onClick={() => {
                                    setRevenueFilter("New to Old");
                                    setIsFilterOpen(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                            >
                                New to Old
                            </button>

                            <button
                                onClick={() => {
                                    setRevenueFilter("Old to New");
                                    setIsFilterOpen(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex justify-between"
                            >
                                Old to New
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
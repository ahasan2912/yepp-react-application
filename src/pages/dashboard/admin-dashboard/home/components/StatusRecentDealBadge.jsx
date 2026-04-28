const StatusRecentDealBadge = ({ status }) => {
    const isPromoted = status === true;
    return (
        <div className="px-2">
            <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                    isPromoted
                        ? "bg-[#DCFCE7] text-[#22C55E]"
                        : "bg-[#FEE2E2] text-[#DC2626]"
                }`}
            >
                {isPromoted ? "PROMOTED" : "NOT PROMOTED"}
            </span>
        </div>
    );
};

export default StatusRecentDealBadge;
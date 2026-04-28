
const StatusBadge = ({ status }) => {
    return (
        <div className="px-2">
            <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${status === "APPROVED"
                        ? "bg-[#DCFCE7] text-[#22C55E]"
                        : status === "PENDING"
                            ? "bg-[#FEF9C3] text-[#CA8A04]"
                            : status === "REJECTED"
                                ? "bg-[#FEE2E2] text-[#DC2626]"
                                : "bg-gray-100 text-gray-500"
                    }`}
            >
                {status}
            </span>
        </div>
    );
};

export default StatusBadge;
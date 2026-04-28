
const StatCard = ({ icon, label, value }) => {
    return (
        <div className="bg-[#F6F7FD] p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="sm:-mt-2">
                <img className="w-9 sm:w-12.5" src={icon} alt="statIcon" />
            </div>
            <div className="text-center space-y-2 sm:space-y-4">
                <p className="text-[#262626] text-base sm:text-2xl font-bold">{label || 0}</p>
                <p className="text-base sm:text-2xl font-bold text-gray-800">{value || 0}</p>
            </div>
        </div>
    );
};

export default StatCard;

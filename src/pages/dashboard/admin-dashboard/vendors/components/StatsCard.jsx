const StatsCard = ({ bgColor, color, titleText, value, iconBg, iconColor, Icon }) => {
    return (
        <div className={`${bgColor} rounded-lg`}>
            <div className="p-6 flex justify-between items-center">
                <div className="space-y-2">
                    <h4 className={`${color} text-xl font-medium`}>{titleText}</h4>
                    <div className="flex gap-4">
                        <div className="flex text-white gap-1">
                            <h1 className={`text-[32px] font-bold ${color}`}> {String(value || 0).padStart(2, "0")}</h1>
                        </div>
                    </div>
                </div>
                <div className={`${iconBg} p-2.5 rounded-sm`}>
                    {Icon && <Icon size={28} className={iconColor} />}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;

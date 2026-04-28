
const TabSection = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex items-center gap-2 sm:gap-4 max-w-305 mx-auto overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
                onClick={() => setActiveTab('All')}
                className={`rounded-full px-8 py-1.5 text-lg font-semibold cursor-pointer ${activeTab === 'All' ? 'bg-primary text-white ' : 'bg-white text-[#A3A3A3]'}`}>All</button>
            <button
                onClick={() => setActiveTab('Available')}
                className={`rounded-full px-8 py-1.5 text-lg font-semibold cursor-pointer ${activeTab === 'Available' ? 'bg-primary text-white ' : 'bg-white text-[#A3A3A3]'}`}>Available</button>
            <button
                onClick={() => setActiveTab('Expired')}
                className={`rounded-full px-8 py-1.5 text-lg font-semibold cursor-pointer ${activeTab === 'Expired' ? 'bg-primary text-white ' : 'bg-white text-[#A3A3A3]'}`}>Expired</button>
        </div>
    );
};

export default TabSection;

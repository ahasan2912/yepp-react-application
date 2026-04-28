const PriviewPage = () => {
    return (
        <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-[#262626]">Preview</h2>
            <p className="text-sm text-[#737373] font-medium mb-6">See how your notification will appear</p>
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-50">
                <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Push Notification Preview</p>
                <div className="flex gap-3">
                    <div className="w-12 h-12 bg-[#4FBCC8] rounded-xl flex items-center justify-center text-white text-xs font-bold">Logo</div>
                    <div>
                        <h4 className="font-bold text-sm">App Name</h4>
                        <p className="text-xs text-gray-500 truncate w-48">Your notification message will appear</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <p className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">Email Preview</p>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#4FBCC8] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">Logo</div>
                    <span className="font-bold text-sm">App Name</span>
                </div>
                <hr className="mb-4 border-gray-100" />
                <h4 className="font-bold mb-1 text-gray-800">Notification Title</h4>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">Your notification message will appear</p>
                <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium">
                    View Deals
                </button>
            </div>
        </div>
    );
};

export default PriviewPage;

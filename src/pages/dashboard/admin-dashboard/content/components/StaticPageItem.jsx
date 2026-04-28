import { Eye, FileText, SquarePen } from "lucide-react";

const StaticPageItem = ({title, modifiedDate}) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl mb-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-md">
                    <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-[#262626] font-semibold text-base">{title}</h3>
            </div>
            <div className="flex items-center gap-8">
                <span className="text-[#737373] text-sm">Modified {modifiedDate}</span>
                <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-secondary transition-colors">
                        <Eye className="w-5.5 h-5.5" />
                    </button>
                    <button className="text-gray-600 hover:text-secondary transition-colors">
                        <SquarePen className="w-5.5 h-5.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaticPageItem;
import { Mail, Smartphone } from "lucide-react";

const History = ({ notification }) => {
    return (
        <div className="flex items-center justify-between p-5 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg border border-gray-100">
                    {notification.type === 'push' ? (
                        <Smartphone className="w-6 h-6 text-gray-400" />
                    ) : (
                        <Mail className="w-6 h-6 text-gray-400" />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                        {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <span>{notification.target}</span>
                        <span className="text-gray-300">•</span>
                        <span>{notification.time}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{notification.target}</span>
                    <span className="text-gray-300">•</span>
                    <span>{notification.time}</span>
                </div>

                <div className="text-right min-w-20">
                    <div className="text-lg font-bold text-gray-800">{notification.opens}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Opens</div>
                </div>

                <div className="px-4 py-1.5 bg-green-50 text-green-500 rounded-full text-sm font-semibold border border-green-100">
                    {notification.status}
                </div>
            </div>
        </div>
    );
};

export default History;
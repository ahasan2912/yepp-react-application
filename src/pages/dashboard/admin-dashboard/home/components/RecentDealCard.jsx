import { Link } from 'react-router-dom';
import StatusRecentDealBadge from './StatusRecentDealBadge';
import { ArrowRight } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const RecentDealCard = ({ title, subtitle, icon: Icon, items }) => {
    return (
        <div className="bg-white rounded-lg px-6 py-5 shadow-sm border border-gray-100 w-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-gray-800 text-lg font-bold">{title}</h2>
                    <p className="text-gray-400 text-sm">{subtitle}</p>
                </div>
                <Link to='/dashboard/admin-deals' className="flex items-center text-primary font-semibold group cursor-pointer">
                    View all <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            <div className="space-y-3">
                {items?.map((item) => (
                    <div key={item?._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <Icon size={20} className="text-indigo-500" />
                            </div>
                            <div>
                                <h3 className="text-slate-800 font-bold text-[15px] leading-tight">{item?.title}</h3>
                                <p className="text-gray-500 text-[13px]">{item?.category?.category_name}</p>
                            </div>
                        </div>
                        <StatusRecentDealBadge status={item?.isPromoted} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentDealCard;
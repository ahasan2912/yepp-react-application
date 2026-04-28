import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListCardContent = ({ title, subtitle }) => {
    return (
        <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-gray-800 text-lg font-bold">{title}</h2>
                <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>
            <Link to='/dashboard/admin-vendor' className="flex items-center text-primary font-semibold group cursor-pointer">
                View all <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
};

export default ListCardContent;
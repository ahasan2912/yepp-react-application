import HeadingTitle from '../components/HeadingTitle';
import { LayoutDashboard, Ticket } from 'lucide-react';
import CreateVoucher from './components/CreateVoucher';

const Vouchers = () => {
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Vouchers'
                description='Manage coupon codes for the vendors.'
            />
            <div className='mt-5'>
                <CreateVoucher />
            </div>
        </div>
    );
};

export default Vouchers;
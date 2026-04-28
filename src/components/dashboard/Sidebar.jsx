import { BellRing, BookText, ChartLine, CreditCard, Eraser, FolderKanban, House, LayoutDashboard, LogOut, Settings, SquareChartGantt, Store, Tag, TicketX, WalletCards, X } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import { images } from '../../assets/image';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { persistor } from '../../app/store';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = async () => {
        dispatch(userLoggedOut());
        Cookies.remove("accessToken", {
            secure: false,
            sameSite: "Strict",
            path: "/",
        });
        Cookies.remove("refreshToken", {
            secure: false,
            sameSite: "Strict",
            path: "/",
        });
        toast.success("Logout successfully");
        await persistor.flush();
        await persistor.purge();
        navigate('/login');
    }
    return (
        <>
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />
            <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#002A33] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full py-3 pl-2">
                    <div className="flex items-center justify-between pl-3">
                        <div className='max-w-35 mb-2'>
                            <Link to="/" className="relative flex items-center justify-center mt-6">
                                <img src={images.logoIocn} className='h-12 w-full' alt="logo" />
                            </Link>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="flex-1">
                        <ul className='space-y-2 pr-5 mt-4 pl-3.5'>
                            <p className='text-primary font-semibold text-lg'>Main</p>
                            <NavLink to='/dashboard/admin-dashboard' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <LayoutDashboard size={17} />
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to='/dashboard/admin-vendor' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color' : 'pl-3 text-white'}`}>
                                <Store size={17} />
                                <span>Shop</span>
                            </NavLink>
                            <NavLink to='/dashboard/admin-deals' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <Tag size={18} />
                                <span>Deals</span>
                            </NavLink>
                        </ul>
                        <ul className='space-y-2 pr-5 mt-4 pl-3.5'>
                            <p className='text-primary font-semibold text-lg'>Management</p>
                            <NavLink to='/dashboard/admin-payments' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <CreditCard size={18} />
                                <span>Payments</span>
                            </NavLink>
                            <NavLink to='/dashboard/admin-content' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <TicketX size={19} />
                                <span>Categories</span>
                            </NavLink>
                            <NavLink to='/dashboard/admin-voucher' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <BookText size={19} />
                                <span>Vouchers</span>
                            </NavLink>
                            <NavLink to='/dashboard/admin-plan' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <FolderKanban size={19} />
                                <span>Plans</span>
                            </NavLink>
                            <NavLink to='/dashboard/admin-notification' className={({ isActive }) => `flex items-center gap-1 w-full py-3 ease-in-out text-base font-semibold hover:bg-[#F9F0FF] hover:text-secondary hover:border-(--primary-color) hover:border-l-8 hover:rounded-sm  ${isActive ? 'bg-[#F9F0FF] py-2 pl-3 rounded-sm text-primary border-l-8 border-(--primary-color)' : 'pl-3 text-white'}`}>
                                <BellRing size={18} />
                                <span>Notification</span>
                            </NavLink>
                        </ul>
                    </nav>

                    <button onClick={logOut} className=" mt-auto py-4 pl-3 flex items-center gap-1 cursor-pointer">
                        <LogOut size={18} className="text-white hover:text-red-400 cursor-pointer transition-colors" />
                        <span className='text-white hover:text-red-400 cursor-pointer transition-colors'>LogOut</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

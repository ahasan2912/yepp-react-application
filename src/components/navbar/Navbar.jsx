import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import { Bell, Heart, Menu, X } from 'lucide-react';
import Notification from './Notification';
import { images } from '../../assets/image';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import Cookies from "js-cookie";
import { persistor } from '../../app/store';
import toast from 'react-hot-toast';
import { useGetAllNotificaitonQuery, useOpenNotificationPanelMutation } from '../../features/notification/notificaitonApi';

const getSavedDealsCount = () => {
    try {
        if (typeof localStorage === "undefined") return 0;

        const savedIds = JSON.parse(localStorage.getItem("saveForLater"));
        return Array.isArray(savedIds) ? savedIds.length : 0;
    } catch {
        return 0;
    }
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const [savedDealsCount, setSavedDealsCount] = useState(getSavedDealsCount);
    const menuRef = useRef(null);
    const openingNotificationPanelRef = useRef(false);
    const isAuthenticated = useAuth();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.auth);
    const location = useLocation();
    const shouldShowCategoryHeader = location.pathname !== "/categories";
    const notificationQueryArgs = { id: user?._id };
    const { data: notificationData, refetch: refetchNotifications } = useGetAllNotificaitonQuery(
        notificationQueryArgs,
        { skip: !user?._id || user?.role === 'ADMIN' }
    );
    const [openNotificationPanel] = useOpenNotificationPanelMutation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const updateSavedDealsCount = () => {
            setSavedDealsCount(getSavedDealsCount());
        };

        window.addEventListener("storage", updateSavedDealsCount);
        window.addEventListener("savedDealsUpdated", updateSavedDealsCount);

        return () => {
            window.removeEventListener("storage", updateSavedDealsCount);
            window.removeEventListener("savedDealsUpdated", updateSavedDealsCount);
        };
    }, []);

    const unreadCount = Number(notificationData?.data?.unreadCount ?? notificationData?.unreadCount) || 0;

    const notificationLabel = openNotificationModal
        ? "Close notifications"
        : unreadCount > 0
            ? `Open notifications, ${unreadCount} unread`
            : "Open notifications";
    const savedDealsLabel = savedDealsCount > 0
        ? `View saved deals, ${savedDealsCount} saved`
        : "View saved deals";

    const hanldeLogOut = async () => {
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
    }

    const handleNotificationToggle = async () => {
        if (openNotificationModal) {
            setOpenNotificationModal(false);
            return;
        }

        setOpenNotificationModal(true);

        if (!user?._id || openingNotificationPanelRef.current) return;

        openingNotificationPanelRef.current = true;

        try {
            await openNotificationPanel({ listArgs: notificationQueryArgs }).unwrap();
        } catch {
            refetchNotifications();
        } finally {
            openingNotificationPanelRef.current = false;
        }
    };

    return (
        <div>
            <nav className="fixed w-full px-4 z-50 bg-[#E0F2FE] py-5">
                <div className="max-w-305 mx-auto flex items-center justify-between relative">
                    <div className="max-w-52.5 sm:max-w-62.5 flex items-center gap-2 cursor-pointer">
                        <Link to="/" className="relative flex items-center justify-center" aria-label="Yepp Ads home">
                            {/* <button className='bg-primary py-2 px-5 rounded-md text-white'>Logo</button> */}
                            <img src={images.logoIocn} className='h-12 w-full' alt="Yepp Ads" />
                        </Link>
                    </div>

                    <div className='flex justify-between items-center gap-20'>
                        <div className={`hidden md:flex items-center ${user?.role === 'ADMIN' || user?.role === 'VENDOR' ? 'space-x-0' : 'space-x-3'} rounded-full`}>
                            {
                                isAuthenticated ? '' : <p className='text-lg text-primary font-semibold tracking-wider transition-all duration-300'>Interested in becoming a vendor?</p>
                            }
                            {
                                isAuthenticated ?
                                    <button
                                        onClick={hanldeLogOut}
                                        className={`bg-primary hover:bg-secondary text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2.5 cursor-pointer 
                                        ${(user?.role === 'ADMIN' || user?.role === 'VENDOR') ? 'rounded-l-full' : 'rounded-full'}`}
                                    >
                                        LogOut
                                    </button>
                                    :
                                    <NavLink
                                        to='/register'
                                        className='bg-primary hover:bg-secondary text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2 rounded-full cursor-pointer'
                                    >
                                        Business Sign-in
                                    </NavLink>
                            }
                            {
                                user?.role === 'ADMIN' && <NavLink to='/dashboard/admin-dashboard' className='bg-primary hover:bg-secondary text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2.5 rounded-r-full cursor-pointer'>Dashboard</NavLink>
                            }
                            {
                                user?.role === 'VENDOR' && <NavLink to='/shop-overview' className='bg-primary hover:bg-secondary text-base text-[#FFFFFF] font-semibold tracking-wider transition-all duration-300 px-6 py-2.5 rounded-r-full cursor-pointer'>Dashboard</NavLink>
                            }
                        </div>
                        <div className='flex justify-center items-center gap-5 cursor-pointer mr-16 md:mr-0'>
                            <NavLink to='/saved_deals' aria-label={savedDealsLabel} className={({ isActive }) => `relative ${isActive ? 'text-primary font-bold' : ''}`}>
                                <Heart size={22} aria-hidden="true" />
                                {savedDealsCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white">
                                        {savedDealsCount > 99 ? "99+" : savedDealsCount}
                                    </span>
                                )}
                            </NavLink>
                            {user?.role !== 'ADMIN' && (
                                <button
                                    type="button"
                                    aria-label={notificationLabel}
                                    aria-expanded={openNotificationModal}
                                    onClick={handleNotificationToggle}
                                    className={`relative cursor-pointer ${openNotificationModal ? 'text-primary font-bold' : ''}`}
                                >
                                    <Bell size={22} aria-hidden="true" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white">
                                            {unreadCount > 99 ? "99+" : unreadCount}
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                    {
                        openNotificationModal && <Notification
                            isOpen={openNotificationModal}
                            setIsOpen={setOpenNotificationModal} />
                    }

                    {/* Mobile Menu Button */}
                    <div className="md:hidden absolute z-50 right-3">
                        <button
                            type="button"
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                            aria-controls="main-mobile-menu"
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none border bg-white font-extrabold text-primary rounded-full p-1 cursor-pointer">
                            {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    id="main-mobile-menu"
                    className={`md:hidden absolute left-4 right-4 top-full z-20 overflow-hidden rounded-lg border border-slate-100 bg-white/95 text-black shadow-xl backdrop-blur transition-all duration-300 ease-out
                   ${isOpen ? "mt-3 max-h-96 opacity-100 translate-y-0" : "mt-0 max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}
                    ref={menuRef}>
                    <div className="flex flex-col gap-2 p-3">
                        <NavLink
                            to="/saved_deals"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-primary" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-secondary"}`
                            }
                        >
                            Saved Deals
                        </NavLink>
                        {
                            user?.role === 'ADMIN' && <NavLink
                                to="/dashboard/admin-dashboard"
                                className={({ isActive }) =>
                                    `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-primary" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-secondary"}`
                                }
                            >
                                Dashboard
                            </NavLink>
                        }
                        {
                            user?.role === 'VENDOR' && <NavLink
                                to="/shop-overview"
                                className={({ isActive }) =>
                                    `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-primary" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-secondary"}`
                                }
                            >
                                Dashboard
                            </NavLink>
                        }
                        {
                            isAuthenticated ?
                                <button
                                    type="button"
                                    onClick={hanldeLogOut}
                                    className="rounded-lg px-4 py-3 text-left text-base font-semibold tracking-wider text-[#262626] transition-colors hover:bg-[#F0F9FF] hover:text-secondary cursor-pointer"
                                >
                                    LogOut
                                </button>
                                :
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-primary" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-secondary"}`
                                    }
                                >
                                    Business Sign in
                                </NavLink>
                        }
                    </div>
                </div>
            </nav>

            {/* CATEGORY SUB-HEADER  */}
            {shouldShowCategoryHeader && <CategoryHeader />}
        </div>
    );
};

export default Navbar;

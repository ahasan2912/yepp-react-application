import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Notification from './Notification';
import { images } from '../../assets/image';;

const VendorNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const menuRef = useRef(null);
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

    return (
        <div>
            <nav className="fixed w-full px-4 z-50 bg-[#E0F2FE] py-6">
                <div className="max-w-305 mx-auto flex items-center justify-between relative">
                    <div className="max-w-52.5 sm:max-w-62.5 flex items-center gap-2 cursor-pointer">
                        <Link to="/" className="relative flex items-center justify-center" aria-label="Yepp Ads home">
                            {/* <button className='bg-primary py-2 px-5 rounded-md text-white'>Logo</button> */}
                            <img src={images.logoIocn} className='h-12 w-full' alt="Yepp Ads" />
                        </Link>
                    </div>

                    <div className='flex justify-between items-center gap-20'>
                        <div className="hidden md:flex items-center space-x-2 rounded-full">
                            <NavLink to='/contact-us' className='flex items-center gap-2'>
                                <img src={images.needHelp} alt="" aria-hidden="true" />
                                <span className='text-base font-semibold text-[#737373]'>Need Help?</span>
                            </NavLink>
                            <NavLink to='/contact-us' className='text-base text-primary font-semibold tracking-wider transition-all duration-300'>Contact us</NavLink>
                        </div>
                    </div>
                    {
                        openNotificationModal && <Notification
                            isOpen={openNotificationModal}
                            setIsOpen={setOpenNotificationModal}
                        />
                    }

                    {/* Mobile Menu Button */}
                    <div className="md:hidden absolute z-50 right-3">
                        <button
                            type="button"
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                            aria-controls="shop-mobile-menu"
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none border bg-white font-extrabold text-primary rounded-full p-1 cursor-pointer">
                            {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu Overlay */}
                <div
                    id="shop-mobile-menu"
                    className={`md:hidden absolute left-4 right-4 top-full z-20 overflow-hidden rounded-lg border border-slate-100 bg-white/95 text-black shadow-xl backdrop-blur transition-all duration-300 ease-out
                   ${isOpen ? "mt-3 max-h-96 opacity-100 translate-y-0" : "mt-0 max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}
                    ref={menuRef}>
                    <div className="flex flex-col gap-2 p-3">
                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-primary" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-secondary"}`
                            }
                        >
                            Need Help?
                        </NavLink>
                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 text-base font-semibold tracking-wider transition-colors ${isActive ? "bg-[#E0F2FE] text-primary" : "text-[#262626] hover:bg-[#F0F9FF] hover:text-secondary"}`
                            }
                        >
                            Contact us
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default VendorNavbar;

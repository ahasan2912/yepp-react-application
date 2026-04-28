import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import VendorNavbar from '../components/navbar/VendorNavbar';
import BothNavbar from '../components/navbar/BothNavbar';
import { useEffect } from 'react';
import { useGsapAnimations } from '../hooks/useGsapAnimations';

const MainLayout = () => {
    const location = useLocation();
    const animationScopeRef = useGsapAnimations(location.pathname);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                localStorage.setItem("userLocation", JSON.stringify(location));
            });
        }
    }, []);

    const hideNavbarRoutes = [
        "/login",
        "/register",
        "/forgetpassword",
        "/forget-password",
        "/verificationcode",
        "/verification-code",
        "/verify-otp-code",
        "/forget-password-verify",
        "/reset-password",
        "/otp-code-sending",
        "/otp-sending"
    ];

    const vendorNavbarRoutes = [
        "/vendor/create-shop",
        "/verdor-created-shop",
        "/approval"
    ];

    const bothNavbarRoutes = [
        "/shop-overview",
        "/vendor-dashboard",
        "/vendor-profile-setup",
        "/payment",
        "/my-deals",
        "/menu",
        "/create-deal",
        "/create-deal-plan",
        "/all-top-views",
        "/my-profile",
        "/vendor-edit-deal",
        "/verdor-edit-shop",
        "/outlet-edit",
        "/show-outlet",
        "/show-outlets",
    ];

    const shouldHideNavbar = hideNavbarRoutes.some(route =>
        location.pathname.startsWith(route)
    );

    const shouldShowVendorNavbar = vendorNavbarRoutes.some(route =>
        location.pathname.startsWith(route)
    );

    const shouldShowBothNavbar = bothNavbarRoutes.some(route =>
        location.pathname.startsWith(route)
    );

    return (
        <div>
            {/* Normal Navbar */}
            {!shouldHideNavbar &&
                !shouldShowVendorNavbar &&
                !shouldShowBothNavbar && <Navbar />
            }
            {/* Vendor Navbar */}
            {!shouldHideNavbar &&
                shouldShowVendorNavbar &&
                !shouldShowBothNavbar && <VendorNavbar />
            }
            {/* Both Navbar */}
            {!shouldHideNavbar &&
                !shouldShowVendorNavbar &&
                shouldShowBothNavbar && <BothNavbar />
            }
            <div ref={animationScopeRef}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;

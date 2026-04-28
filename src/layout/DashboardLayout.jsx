import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useGsapAnimations } from "../hooks/useGsapAnimations";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    return (
        <div className="flex min-h-screen bg-[#002A33] overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-50px)] overflow-hidden mt-12.5 bg-[#F0F9FF]">
                <Header setSidebarOpen={setSidebarOpen} />
                <main ref={animationScopeRef} className="flex-1 bg-[#F0F9FF] overflow-y-auto px-4">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

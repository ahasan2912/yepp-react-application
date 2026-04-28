import { useState } from "react";
import { useHandleCurrentLoggedInUserQuery } from "../../../features/auth/authApi";
import VendorProfileSkeleton from "../../../components/skeleton/VendorProfileSkeleton";
import ProfileDetails from "./ProfileDetails";
import PasswordChange from "./PasswordChange";
import { Link } from "react-router-dom";
import { Eye, SquarePen } from "lucide-react";

const VendorProfile = () => {
    const [activeTab, setActiveTab] = useState('profile-details');
    const { data: currentVendor, isLoading } = useHandleCurrentLoggedInUserQuery();
    if (isLoading) {
        return <VendorProfileSkeleton />
    }
    const { email, isActive, isShopCreated, isVerified, role, user_name, _id } = currentVendor?.data || {};
    const shortName = user_name
        .split(" ")
        .map(word => word[0])
        .join("");


    console.log(currentVendor?.data);
    return (
        <div className="bg-white min-h-[70vh] px-4 pt-32 pb-12">
            <div className="max-w-305 mx-auto space-y-6">
                <div className="bg-white px-8 py-10 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-center md:justify-between gap-2">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden ring-4 ring-[#28B8D7]/20">
                                    <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                                        {shortName}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-center md:text-left space-y-3">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <h1 className="text-3xl font-extrabold text-slate-900">{user_name}</h1>
                                        <span className={`flex items-center gap-1 text-sm font-bold  px-4 py-1 rounded-full border border-[#28B8D7]/20 ${isVerified ? 'text-primary bg-[#28B8D7]/10' : 'text-[#d7c528] bg-amber-100'}`}>
                                            {isVerified ? 'VERIFIED' : 'NOT VERIFIED'}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-medium">{email}</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                                        <span className="px-4 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-600 border border-slate-200">{role}</span>
                                        <span className={`px-4 py-1 rounded-full text-sm font-bold bg-green-50 text-green-600 border border-green-100`}>{isActive ? 'ACTIVE' : 'NOT ACTIVE'}</span>
                                        <span className="px-4 py-1 rounded-full text-sm font-bold bg-orange-50 text-orange-600 border border-orange-100">{isShopCreated ? 'SHOP ACTIVE' : 'NOT SHOP ACTIVE'}</span>
                                    </div>
                                </div>
                                <div className="w-full md:hidden mt-5 flex flex-col items-center">
                                    <Link to={`/show-outlet/${_id}`} className="w-full ">
                                        <button className="mt-1 flex gap-1 items-center justify-center bg-primary text-white w-full px-10 py-2.5 rounded-full text-base font-medium hover:bg-secondary transition cursor-pointer">
                                            <Eye size={20} /> Show Location
                                        </button>
                                    </Link>
                                    <Link to={`/verdor-edit-shop/${_id}`} className="w-full flex">
                                        <button className="mt-2 flex items-center justify-center gap-1 bg-primary text-white w-full px-10 py-2.5 rounded-full text-base font-medium hover:bg-secondary transition cursor-pointer">
                                            <SquarePen size={20} /> Update Shop
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Link to={`/show-outlet/${_id}`}>
                                <button className="mt-1 flex items-center bg-primary text-white w-full px-10 py-2.5 rounded-full text-base gap-1 font-medium hover:bg-secondary transition cursor-pointer">
                                    <Eye size={20} /> Show Location
                                </button>
                            </Link>
                            <Link to={`/verdor-edit-shop/${_id}`}>
                                <button className="mt-2 flex items-center gap-1 bg-primary text-white w-full px-10 py-2.5 rounded-full text-base font-medium hover:bg-secondary transition cursor-pointer">
                                    <SquarePen size={20} /> Update Shop
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex p-1 rounded-xl border border-slate-200 shadow-sm overflow-hidden gap-2">
                    <button className={`flex-1 py-3.5 sm:px-6 rounded-lg text-sm sm:text-base font-bold transition-all cursor-pointer ${activeTab == 'profile-details' ? 'bg-primary text-white hover:bg-secondary' : 'bg-slate-50 text-slate-500'}`} onClick={() => setActiveTab('profile-details')}>
                        Edit Profile Details
                    </button>
                    <button className={`flex-1 py-3.5 sm:px-6 rounded-lg text-sm sm:text-base font-bold transition-all cursor-pointer ${activeTab == 'password-change' ? 'bg-primary text-white hover:bg-secondary' : 'bg-slate-50 text-slate-500'}`} onClick={() => setActiveTab('password-change')}>
                        Change Password
                    </button>
                </div>
                {
                    activeTab === 'profile-details' && <ProfileDetails currentVendor={currentVendor} />
                }
                {
                    activeTab === 'password-change' && <PasswordChange setActiveTab={setActiveTab} />
                }
            </div>
        </div>
    );
};

export default VendorProfile;
import React from 'react';

const EmailVerifySkeleton = () => {
    return (
        <div className="min-h-screen w-full px-4 py-10 flex items-center justify-center">
            <div className="w-full max-w-lg flex flex-col items-center justify-center bg-gray-100 rounded-xl px-8 py-10 md:px-12 md:py-12 text-center shadow-2xl animate-pulse">
                <div className="w-14 h-14 rounded-full bg-[#e8f9fb] flex items-center justify-center mx-auto mb-5">
                    <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                </div>
                <h2 className="w-1/3 h-6 bg-gray-300 rounded-md mx-auto mb-1"></h2>
                <p className="w-1/2 h-4 bg-gray-300 rounded-md mx-auto mb-8"></p>
                <div className="relative mb-2 w-full">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    </span>
                    <div className="w-full h-12 bg-gray-300 rounded-full mx-auto"></div>
                </div>
                <div className="h-4 w-1/2 bg-gray-300 rounded-md mx-auto mb-3"></div>
                <button className="w-full h-12 bg-gray-300 rounded-full flex items-center justify-center gap-2 mt-3 cursor-not-allowed opacity-60">
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                </button>
                <div className="flex items-center my-6 w-full">
                    <div className="grow h-px bg-gray-300"></div>
                    <span className="px-3 text-sm text-[#262626]">Or continue with</span>
                    <div className="grow h-px bg-gray-300"></div>
                </div>
                <div className="w-full h-12 bg-gray-300 rounded-full mx-auto"></div>
            </div>
        </div>
    );
};

export default EmailVerifySkeleton;

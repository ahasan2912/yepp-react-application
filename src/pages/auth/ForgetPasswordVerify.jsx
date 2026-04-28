import { useForm } from 'react-hook-form'
import bgImage from '../../assets/images/forget.jpg'
import { useEffect, useRef, useState } from 'react';
import { useHandleForgetPasswordOTPMutation } from '../../features/auth/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const OTP_LENGTH = 6;

const ForgetPasswordVerify = () => {
    const [otp, setOtp] = useState("");
    const { handleSubmit } = useForm();
    const inputRef = useRef(null);
    const navigatge = useNavigate();
    const [handleForgetPasswordOTP, { isLoading, isSuccess, error }] = useHandleForgetPasswordOTPMutation();
    const email = localStorage.getItem("email");

    useEffect(() => {
        if (isSuccess) {
            toast.success("OTP Sending...");
            navigatge('/reset-password');
        }
        if (error) {
            const message = error?.data?.message || "OTP Sending failed!";
            toast.error(message);
        }
    }, [isSuccess, error, navigatge]);

    const handleChange = (e) => {
        const value = e.target.value.slice(0, OTP_LENGTH);
        setOtp(value);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .slice(0, OTP_LENGTH);
        setOtp(pasted);
    };

    const onSubmit = async () => {
        if (otp.length === 6) {
            try {
                const res = await handleForgetPasswordOTP({
                    email,
                    otp
                }).unwrap();
                if (res?.data) {
                    localStorage.setItem("resetToken", res?.data);
                }

            } catch (error) {
                toast.error(error?.data?.message || "Failed!");
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            <div
                className="hidden lg:block lg:w-1/2 forget-bg-image"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="w-full h-full bg-black/10"></div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-[#F6F7FD]">
                <div className="w-full max-w-117.5 bg-white rounded-xl shadow-sm p-10 border-slate-100">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#262626]">
                            Verify Your Email Address
                        </h1>
                        <p className="text-[#737373] text-base mt-1">
                            Please enter your registered email address and the verification code (OTP) sent to your email to continue.
                        </p>
                    </div>
                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className=""
                            onClick={() => inputRef.current.focus()}>
                            {/* input field */}
                            <div className="flex justify-center gap-2 cursor-text py-5">
                                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-13 h-13 bg-[#FFFFFF] flex items-center justify-center text-xl font-semibold border rounded-md
                                ${index === otp.length ? "border-[#4BBDCF]" : "border-gray-300"}`}>
                                        {otp[index] || ""}
                                    </div>
                                ))}
                            </div>

                            <input
                                ref={inputRef}
                                type="text"
                                required
                                value={otp}
                                onChange={handleChange}
                                onPaste={handlePaste}
                                className="absolute text-lg opacity-0 pointer-events-none]" />
                        </div>
                        <button
                            type="submit"
                            // disabled={isLoading}
                            className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer outline-0">
                            {isLoading ? (
                                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg text-[#FFFFFF]">Submit OTP</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordVerify;
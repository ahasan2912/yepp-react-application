import { useEffect, useRef, useState } from "react";
import { useHandleSendOTPVerificationMutation } from "../../../features/verify/verifyApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHandleCurrentLoggedInUserQuery } from "../../../features/auth/authApi";
import bgImage from '../../../assets/images/verificationImage.jpg';
import { ArrowLeft } from "lucide-react";

const OTP_LENGTH = 6;
const OTP_TIME = 300;

const OTPSending = () => {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(OTP_TIME);
    const inputRef = useRef(null);
    const location = useLocation();
    const { user } = useSelector((state) => state?.auth);
    const navigate = useNavigate();
    const targetEmail = location.state?.email || user?.email;
    const [handleSendOTPVerification, { data, isLoading, error, isSuccess }] =
        useHandleSendOTPVerificationMutation();
    useHandleCurrentLoggedInUserQuery();
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message);
            navigate('/login');
        }

        if (error) {
            toast.error(error?.data?.message || "Verification failed");
        }
    }, [isSuccess, error, data, navigate]);
    const handleChange = (e) => {
        const value = e.target.value.slice(0, OTP_LENGTH);
        setOtp(value);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
        setOtp(pasted);
    };

    const handleSubmitOTP = async () => {
        if (timeLeft <= 0) {
            return toast.error("OTP expired. Please request a new one.");
        }

        if (!targetEmail) {
            return toast.error("Email not found. Please send the verification code again.");
        }

        if (otp.length === 6) {
            const res = await handleSendOTPVerification({
                otp: Number(otp),
                email: targetEmail
            });
            console.log(res);
        } else {
            toast.error('Please fill up verification code');
        }
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, "0")}:${sec
            .toString()
            .padStart(2, "0")}`;
    };

    console.log(user);
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div
                className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center px-12">
                    <h1 className="text-white text-4xl font-bold mb-3">Welcome back</h1>
                    <p className="text-white/70 text-lg text-center">
                        Verify your email to continue securely
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-screen px-4 lg:w-1/2 bg-linear-to-r bg-[#ffffff]">
                <div
                    className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-2xl px-8 py-10 text-center relative"
                    onClick={() => inputRef.current.focus()}>
                    <div className='mt-12 sm:mt-2'>
                        <Link
                            to="/"
                            aria-label="Back to home"
                            className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-[#1E5F37] transition-colors hover:bg-[#E4EFE7] absolute left-2 top-4"
                        >
                            <ArrowLeft size={18} aria-hidden="true" />
                            Home
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold text-[#262626]">
                        Enter Verification Code
                    </h2>
                    <p className="text-[#737373] text-base mt-1 pb-2">Enter the verification code sent to you.</p>

                    <p className="text-base text-gray-500 mb-4 font-medium">
                        Code expires in:{" "}
                        <span className="font-semibold text-red-600">
                            {formatTime(timeLeft)}
                        </span>
                    </p>
                    <div className="flex justify-center gap-3 py-6">
                        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-14 h-14 flex items-center justify-center text-2xl font-semibold border-2 rounded-md transition-colors 
                                ${index === otp.length ? "border-(--primary-color) bg-[color-mix(in_srgb,var(--primary-color)_10%,white)]" : "border-gray-300"}`}
                            >
                                {otp[index] || ""}
                            </div>
                        ))}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={otp}
                        onChange={handleChange}
                        onPaste={handlePaste}
                        className="absolute opacity-0 pointer-events-none"
                    />
                    {timeLeft === 0 && (
                        <p className="text-red-600 text-sm mt-4 mb-4">
                            OTP expired. Please request a new one.
                        </p>
                    )}
                    <button
                        onClick={handleSubmitOTP}
                        disabled={isLoading || timeLeft === 0}
                        className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-full mt-4 transition-colors flex items-center justify-center cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                        ) : (
                            <span className="font-medium text-lg">Verify OTP</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPSending;

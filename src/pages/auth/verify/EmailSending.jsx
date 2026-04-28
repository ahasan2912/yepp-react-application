import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHandleSendEmailMutation } from "../../../features/verify/verifyApi";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHandleCurrentLoggedInUserQuery } from "../../../features/auth/authApi";
import { userLoggedIn } from "../../../features/auth/authSlice";
import EmailVerifySkeleton from "../../../components/skeleton/EmailVerifySkeleton";

const EmailSending = () => {
    const [handleSendOTPVerification, { isLoading, isSuccess, error }] = useHandleSendEmailMutation();
    const { data: currentUser, isLoading: userLoading } = useHandleCurrentLoggedInUserQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [submittedEmail, setSubmittedEmail] = useState("");
    const { user } = useSelector((state) => state?.auth);
    const prefilledEmail = location.state?.email || user?.email || currentUser?.data?.email || "";
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: prefilledEmail,
        }
    });

    useEffect(() => {
        if (prefilledEmail) {
            reset({ email: prefilledEmail });
        }
    }, [prefilledEmail, reset]);

    useEffect(() => {
        if (currentUser) {
            dispatch(userLoggedIn(currentUser?.data));
            if (currentUser?.data?.isVerified === true) {
                navigate('/verdor-created-shop');
            }
        }

    }, [currentUser, dispatch, navigate])

    useEffect(() => {
        if (isSuccess) {
            toast.success("OTP sent! Check your inbox.");
            navigate('/otp-code-sending', {
                state: { email: submittedEmail || prefilledEmail },
            });
        }
        if (error) {
            const message = error?.data?.message || "OTP sending failed!";
            toast.error(message);
        }
    }, [error, isSuccess, navigate, prefilledEmail, submittedEmail]);

    if (userLoading) {
        return <EmailVerifySkeleton />
    }

    const onSubmit = (data) => {
        const email = data.email.trim();
        setSubmittedEmail(email);
        handleSendOTPVerification({ email });
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-xl px-8 py-10 md:px-12 md:py-12 text-center shadow-2xl relative">
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
            <div className="w-14 h-14 rounded-full bg-[#e8f9fb] flex items-center justify-center mx-auto mb-5">
                <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Verify your email
            </h2>
            <p className="text-[#737373] text-base mt-1 mb-8">
                We'll send a verification code to your address
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative mb-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="w-5 h-5" />
                    </span>
                    <input
                        type="email"
                        placeholder="Enter your email....."
                        {...register("email", {
                            required: "Email is required!",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email format!",
                            }
                        })}
                        className={`w-full pl-10 pr-5 py-3 rounded-full border-2 outline-none text-gray-700 text-base transition-colors ${errors.email
                            ? "border-gray-300"
                            : "focus:border-primary border-gray-300"
                            }`}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-xs mb-3 text-left">
                        {errors.email.message}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-secondary disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 mt-3 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer font-medium text-base"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                        <div className="flex items-center justify-center gap-1">
                            <Send className="w-4 h-4" />
                            <p className="font-medium text-lg text-[#FFFFFF]"></p>
                            Send verification code
                        </div>
                    )}
                </button>
            </form>
            <div className="flex items-center my-6">
                <div className="grow border-t border-[#837d7d]"></div>
                <span className="px-3 text-sm text-[#262626]">Or continue with</span>
                <div className="grow border-t border-[#837d7d]"></div>
            </div>
            <button
                onClick={() => reset({ email: "" })}
                className="w-full py-3 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-base font-medium cursor-pointer"
            >
                Change email address
            </button>
        </div>
    );
};

export default EmailSending;
